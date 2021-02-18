import {cartGuestModel} from './Schemas/CartGuestModel'
import firestore from '@react-native-firebase/firestore'

const model ={
    state:{
        cartGuests  :[],
        done_validating_product:false
    },
    reducers:{
        updatedQuantity : (state,cartGuests)=>({
            ...state,
            cartGuests :cartGuests
        }),
        updatedProductQuantity : (state,cartGuests)=>({
            ...state,
            cartGuests :cartGuests
        }),
        addedProductQuantity : (state,cartGuests)=>({
            ...state,
            cartGuests :cartGuests
        }),
        addedGuest : (state,cartGuests)=>({
            ...state,
            cartGuests :cartGuests
        }),
        removedItem : (state,cartGuests)=>({
            ...state,
            cartGuests :cartGuests
        }),
        validatedGuestOrder : (state,cartGuests)=>({
            ...state,
            cartGuests   , 
            done_validating_product:true
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
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
        
    },
    effects: (dispatch)=>({
        updateQuantity({guestId,itemId,quantity},state){
             const cartGuests= [...state.cart.cartGuests]
             const targetGuest = cartGuests.filter(g=>g.guestId == guestId)[0]
            
             if( targetGuest ){
                  const targetProduct = targetGuest.items.filter(i=> i.id == itemId)[0]
                  const tergetGuestIndex =  cartGuests.indexOf(targetGuest)
                  if(targetProduct) 
                  {
                      const targetProductIndex =  targetGuest.items.indexOf(targetProduct)
                     
                      if(cartGuests[tergetGuestIndex].items[targetProductIndex])
                      {
                          cartGuests[tergetGuestIndex].items[targetProductIndex].quantity = quantity
                          dispatch.cart.updatedQuantity(cartGuests)
                      }
                  }
             }
     
        },
        addCartItem({guest,product,sector,scheduelId},state){
             const cartGuests= [...state.cart.cartGuests]
             const targetGuest = cartGuests.filter(g=>g.guestId == guest.id)[0]
             if( targetGuest ){
                 const targetProduct = targetGuest.items.filter(i=> i.id == product.id)[0]
                 const tergetGuestIndex =  cartGuests.indexOf(targetGuest)
                 if(targetProduct) 
                 {
                     const tergetProductIndex =  targetGuest.items.indexOf(targetProduct)
                     const tergetProductQuantity=  targetProduct.quantity
                    
                     if(cartGuests[tergetGuestIndex].items[tergetProductIndex])
                     {
                         cartGuests[tergetGuestIndex].items[tergetProductIndex].quantity = tergetProductQuantity + product.quantity
                         dispatch.cart.updatedProductQuantity(cartGuests)
                     }
                 }else{
                     cartGuests[tergetGuestIndex].items.push({...product})
                     dispatch.cart.addedProductQuantity(cartGuests)
                    }
             }else{
                 cartGuests.push({...cartGuestModel(
                     cartGuests.length,
                     guest.name,
                     guest.id,
                     [product],
                     1,
                     sector,
                     guest,
                     guest.orderId,
                     scheduelId
                     )})
                 dispatch.cart.addedGuest(cartGuests)
             } 
        },
        removeGuestItem({guestId,itemId},state){
             //if guestItems are equal or less than 0 then removez the guest
             //we need guest ID and items Id
             const cartGuests= [...state.cart.cartGuests]
             const targetGuest = cartGuests.filter(g=>g.guestId == guestId)[0]
            
             if( targetGuest ){
                  const targetProduct = targetGuest.items.filter(i=> i.id == itemId)[0]
                  const tergetGuestIndex =  cartGuests.indexOf(targetGuest)
                  if(targetProduct) 
                  {
                      const targetProductIndex =  targetGuest.items.indexOf(targetProduct)
                     
                      if(cartGuests[tergetGuestIndex].items[targetProductIndex])
                      {
                          cartGuests[tergetGuestIndex].items.splice(targetProductIndex,1)
                          if(cartGuests[tergetGuestIndex].items[0] == undefined)
                          {
                            // cart guest item has noe items left then remove it too from the cart
                            cartGuests.splice(tergetGuestIndex,1)
                          }
                          dispatch.cart.removedItem(cartGuests)
                      }
                  }
             }
             
        },
        async validateGuestOrder({guestId},state){
           try {
             const cartGuests= [...state.cart.cartGuests]
         
             const targetGuest = cartGuests.filter(g=>g.guestId == guestId)[0]
             if( targetGuest ){
                 const orderId =targetGuest.orderId 
                 const tergetGuestIndex =  cartGuests.indexOf(targetGuest)

                 const client   = targetGuest
                 const  total   =  targetGuest.items.reduce((a,c)=>a+( c.priceForClient * c.quantity ),0) ;
               

                 //modfy cartGuest status to VALIDATED 
                 cartGuests[tergetGuestIndex].status="VALIDATED"

                 //set next client turn 
                 dispatch.scheduel.setNextTurn()
                 

  
                 //update order doc ["VALIDATED"]
                 

                 const  billRef = client.name.substring(0,4).toUpperCase()+targetGuest.scheduelId.substr(0,5).toUpperCase() 
                 const validateOrderReponse = await firestore()
                  .collection('orders')
                  .doc(orderId)
                  .update({
                        products:[...targetGuest.items],
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
                        number_of_products: targetGuest.items.length,
                        validated:"VALIDATED",
                        client:client.name,
                        sector:targetGuest.sector.name
                    })
                 })
                             
                

                 dispatch.toast.show({
                    type:'success',
                    title:'Validation ',
                    message:`La command  est valider avec success `
                })
                dispatch.cart.validatedGuestOrder(cartGuests)
  
             }
            } catch (error) {
                console.log("validate order cart")
                console.log(error)
                dispatch.cart.validatingGuestOrderFailed()
            }
        },
        resetIsDone(field,state){
            dispatch.cart.reseted(field)
        }
    })
}
export default model