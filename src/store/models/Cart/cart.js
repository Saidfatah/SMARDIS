const cartGuests = [
    {
        name:'said',
        guestId: 99,
        distrubutor:null,
        id:1,
        items:[
            {id:1,name:'sugar',price:150.9,quantity:2},
            {id:2,name:'oil',price:99,quantity:4},
        ]
    },
    {
        name:'ali',
        id:2,
        guestId:90,
        distrubutor:null,
        items:[
            {id:1,name:'choclate',price:45.9,quantity:4},
            {id:2,name:'pasta',price:25.9,quantity:3},
        ]
    }
]
const cartModel=(id,name,guestId,items,distrubutor)=>({
    name ,
    guestId ,
    distrubutor:distrubutor || {name:'abdellah',id},
    id ,
    items 
})

const model ={
    state:{
        cartGuests  :[],
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
        addCartItem({guest,product},state){
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
                cartGuests.push(cartModel(cartGuests.length,guest.name,guest.id,[product],1))
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
        validateGuestOrder({guestId},state){
             //guest id 
             //update order status
             //if guestItems are equal or less than 0 then removez the guest
             console.log('validate guest'+ guestId + 'order')
        }

    })
}
export default model