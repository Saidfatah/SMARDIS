import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCartToAsyncStorage=async ({cartItems ,guest ,sector,scheduelId})=>{
     try {
         //create cart obj then stringify it 
         const cart ={
             cartItems ,
             guest ,
             sector,
             scheduelId,
             created_at:new Date()
         }
        await AsyncStorage.setItem('CART', JSON.stringify(cart))
     } catch (error) {
         console.log("------saveCartToAsyncStorage-----")
         console.log(error)
     }
}
const deleteCartFromASyncStorage=async ()=>{
     try {
        await AsyncStorage.removeItem('CART')
     } catch (error) {
         console.log("------deleteCartFromASyncStorage-----")
         console.log(error)
     }
}

const model ={
    state:{
        cartItems  :[],
        guest :null,
        sector:null,
        status : "PENDING",
        scheduelId:null,
        done_validating_product:false
    },
    reducers:{
        updatedQuantity : (state,cartItems)=>({
            ...state,
            cartItems :cartItems
        }),
        updatedProductQuantity : (state,cartItems)=>({
            ...state,
            cartItems :cartItems
        }),
        addedItem : (state,{cartItems,guest,sector,scheduelId})=>({
            ...state,
            cartItems ,
            guest,
            sector,
            scheduelId
        }),
        removedItem : (state,cartItems)=>({
            ...state,
            cartItems :cartItems
        }),
        validatedGuestOrder : (state,cartItems)=>({
            ...state,
            cartItems   , 
            done_validating_product:true,
            guest:null,
            status:"VALIDATED"
        }),
        validatingGuestOrderFailed : (state,args)=>({
            ...state,
            done_validating_product:true
        }),
        fetchedValidatedOrders : (state,validatedOrders)=>({
            ...state,
            validatedOrders : [...validatedOrders]   , 
            validatedOrdersCount : validatedOrders.length ,
        }),
        fetchedCartFromAsyncStorage : (state,{cartItems,guest,sector,scheduelId})=>({
            ...state,
            cartItems ,
            guest,
            sector,
            scheduelId
        }),
        fetchingCartFromAsyncStorageFailed : (state,args)=>({
            ...state,
            cartItems  :[],
            guest :null,
            sector:null,
            status : "PENDING",
            scheduelId:null,
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
        
    },
    effects: (dispatch)=>({
        updateQuantity({itemId,quantity},state){
            try {
                 const cartItems= [...state.cart.cartItems]
                 const targetCartItem = cartItems.filter(item=>item.id == itemId)[0]
                 
                 if(targetCartItem)
                 {
                     const targettemIndex =  cartItems.indexOf(targetCartItem)
                     cartItems[targettemIndex].quantity = quantity
                     dispatch.cart.updatedQuantity(cartItems)

                     //set async storage cart 
                     saveCartToAsyncStorage({
                        cartItems,
                        guest     : state.cart.guest,
                        sector    : state.cart.sector,
                        scheduelId: state.cart.scheduelId,
                    })
                 }
            } catch (error) {
                console.log("-------updateQuantity-----------")
            }
        },
        addCartItem({product,sector,scheduelId,guest},state){
            try {
                const cartItems= [...state.cart.cartItems]
                const targetCartItem = cartItems.filter(item=>item.id == product.id)[0]
                if(targetCartItem){
                    const targetItemIndex =  cartItems.indexOf(targetCartItem)
                    const targetProductQuantity = targetCartItem.quantity
                    cartItems[targetItemIndex].quantity = targetProductQuantity + product.quantity
                    dispatch.cart.updatedProductQuantity(cartItems)

                    //set async storage
                    saveCartToAsyncStorage({
                        cartItems,
                        guest     : state.cart.guest,
                        sector    : state.cart.sector,
                        scheduelId: state.cart.scheduelId,
                    })
                }else{
                    cartItems.push({
                        client :guest ,
                        ...product
                    })
                      console.log({cartItems})
                    saveCartToAsyncStorage({
                        cartItems,
                        guest,
                        sector,
                        scheduelId
                    })
                    dispatch.cart.addedItem({cartItems,guest,sector,scheduelId})
                } 
            } catch (error) {
                 console.log("---------addCartItem---------")
                 console.log(error)
            }
        },
        removeCartItem({itemId},state){
             try {
                 //if guestItems are equal or less than 0 then removez the guest
                 //we need guest ID and items Id
                 const cartItems= [...state.cart.cartItems]
                 const targetItem = cartItems.filter(item=>item.id == itemId)[0]
                
                 if( targetItem ){
                     const targetItemIndex =  cartItems.indexOf(targetItem)
                     cartItems.splice(targetItemIndex,1)
                     dispatch.cart.removedItem(cartItems)
                     if(cartItems.length>0){
                        //set async storage cart 
                        saveCartToAsyncStorage({
                           cartItems,
                           guest     : state.cart.guest,
                           sector    : state.cart.sector,
                           scheduelId: state.cart.scheduelId,
                        })
                     }else{
                        //set async storage
                        deleteCartFromASyncStorage()
                     }
                 }  
            } catch (error) {
                console.log("---------removeCartItem----------")
                console.log(error)
            }
        },
        async validateOrder({navigation},state){
           try {
                const cartItems= [...state.cart.cartItems]
                const guest= state.cart.guest
                const sector= state.cart.sector
                if( cartItems.length>0 ){
                    const orderId = guest.orderId 
                    const client  = guest
                    const total   = cartItems.reduce((a,c)=>a+( c.priceForClient * c.quantity ),0) ;
                 
               
                 // modfy cartGuest status to VALIDATED 
                 // cartItems[tergetGuestIndex].status="VALIDATED"

                 //set next client turn 
                 dispatch.scheduel.setNextTurn()
                 

  
                 //update order doc ["VALIDATED"]
                 const  billRef = "BC"+new Date().getTime()
                 const validateOrderReponse = await firestore()
                  .collection('orders')
                  .doc(orderId)
                  .update({
                        products:[...cartItems.map(item=>{
                            delete item.orderId
                            return item 
                        })],
                        billRef,
                        total,
                        status: "VALIDATED",
                        sale_date : firestore.Timestamp.fromDate(new Date()), 
                        sale_hour : firestore.Timestamp.fromDate(new Date()),
                  })
               
                 //update distrubutor commits 
                 const currentDistrubutorId = state.auth.distrubutorId
                 const updateCommitsReponse = await firestore()
                 .collection('users')
                 .doc(currentDistrubutorId)
                 .update({
                    commits:firestore.FieldValue.arrayUnion({
                        date : firestore.Timestamp.fromDate(new Date()),
                        billRef,
                        number_of_products: cartItems.length,
                        validated:"VALIDATED",
                        client:client.name,
                        sector:sector.name
                    })
                 })
                             
                

                 dispatch.toast.show({
                    type:'success',
                    title:'Validation ',
                    message:`La command  est valider avec success `
                })
                dispatch.cart.validatedGuestOrder()
                
                //set async storage
                deleteCartFromASyncStorage()

                //navigate to valoidated orders screen
                navigation.navigate('DISTRIBUTORvalidtedCommands')
                }
            } catch (error) {
                console.log("validate order cart")
                console.log(error)
                dispatch.cart.validatingGuestOrderFailed()
            }
        },
        async fetchCartFromAsyncStorage(args,state){
           try {
                const cart= await AsyncStorage.getItem('CART')
                console.log({cart})
                if(cart != null && cart != undefined){
                    const cartParsed=JSON.parse(cart)
                    const {cartItems,guest,sector,scheduelId,created_at}=cartParsed
 
                    //check if we have fetched yesterdays cart if so delete the async storage 
                    //and reset the cart model's state 
                    const midnight = new Date()
                    const createdAt = new Date(created_at)
                    midnight.setHours(23,59,59,999)
                    console.log(cartItems)
                    console.log(createdAt.getTime() < midnight.getTime() )

                    if(createdAt.getTime() < midnight.getTime()){
                        dispatch.cart.fetchedCartFromAsyncStorage({cartItems,guest,sector,scheduelId})
                    }else{
                        //reset state and delete cart from async storage
                        deleteCartFromASyncStorage()
                        dispatch.cart.fetchingCartFromAsyncStorageFailed()
                    }
                    
                    
                }
             
 
            } catch (error) {
                console.log("-------------fetchCartFromAsyncStorage-------------")
                console.log(error)
                dispatch.cart.fetchingCartFromAsyncStorageFailed()
            }
        },
        resetIsDone(field,state){
            dispatch.cart.reseted(field)
        }
    })
}
export default model