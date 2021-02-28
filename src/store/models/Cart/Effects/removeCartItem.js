import saveCartToAsyncStorage from './saveCartToAsyncStorage'
import deleteCartFromASyncStorage from './deleteCartFromASyncStorage'


export default (args,state,dispatch)=>{
    try {
        //if guestItems are equal or less than 0 then removez the guest
        //we need guest ID and items Id
        const {itemId} = args
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
}