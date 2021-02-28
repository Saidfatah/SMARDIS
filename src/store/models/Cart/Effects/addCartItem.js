import saveCartToAsyncStorage from './saveCartToAsyncStorage'

export default(args,state,dispatch)=>{
    try {
        const {product,sector,scheduelId,guest} = args
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
}