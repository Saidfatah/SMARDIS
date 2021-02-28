import saveCartToAsyncStorage from './saveCartToAsyncStorage'

export default (args,state,dispatch)=>{
    try {
        const {itemId,quantity} = args
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
}