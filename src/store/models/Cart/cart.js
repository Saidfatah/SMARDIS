import {billModel} from './Schemas/BillModel'
import {cartGuestModel} from './Schemas/CartGuestModel'


const model ={
    state:{
        cartGuests  :[],
        todaysBills : [] , 
        validatedOrders : [] , 
        selectedBill : null ,
        validatedOrdersCount : 0 ,
        salesCount : 0 ,
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
        validatedGuestOrder : (state,{cartGuests,todaysBills})=>({
            ...state,
            cartGuests   , 
            todaysBills, 
            selectedBill : todaysBills[todaysBills.length -1]
        }),
        fetchedValidatedOrders : (state,validatedOrders)=>({
            ...state,
            validatedOrders : [...validatedOrders]   , 
            validatedOrdersCount : validatedOrders.length ,
            salesCount : validatedOrders.length ,
        }),
        selectedABill : (state,selectedBill)=>({
            ...state,
            selectedBill 
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
        addCartItem({guest,product,sector,orderId},state){
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
                     orderId,
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
        validateGuestOrder({guestId,sector,status,client},state){
             // update order status
             // update status of cart guest to VALIDATED
             // create order bill 
             // is it paid or not 
             const cartGuests= [...state.cart.cartGuests]
             const targetGuest = cartGuests.filter(g=>g.guestId == guestId)[0]
             if( targetGuest ){
                 const tergetGuestIndex =  cartGuests.indexOf(targetGuest)
            
                 //modfy cartGuest status to VALIDATED 
                 cartGuests[tergetGuestIndex].status="VALIDATED"

                 //set next client turn and set current client to done with
                 //this is better be dispatched from the react side 
                 dispatch.order.setNextTurn({id:targetGuest.orderId,clientId:targetGuest.guestId})
                 //create bill and add it to todaysBills list 
                 const todaysBills = [...state.cart.todaysBills]
                 const {name,guestId,distrubutor,items} = cartGuests[tergetGuestIndex]
                 const orderBill = billModel(todaysBills.length,distrubutor,{id:guestId,name:name} ,items,sector.name,sector.city,status)
                 todaysBills.push(orderBill)

                 dispatch.toast.show({
                    type:'success',
                    title:'Validation ',
                    message:`La command  est valider avec success `
                })
                 dispatch.cart.validatedGuestOrder({cartGuests , todaysBills })
               
                 //[TODO]push bill to firestore collection
                
            }
        },
        selectBill(id,state){
            const todaysBills = [...state.cart.todaysBills]
            const targetBill = todaysBills.filter(b=>b.id == id)[0]
            if(targetBill)
               dispatch.cart.selectedABill(targetBill)
        },
        fetchValidatedOrders(id,state){
            //fetch from backEnd 
            //sales are probably the products sold 
            dispatch.cart.fetchedValidatedOrders([])
        }
    })
}
export default model