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
const cartGuestModel=(id,name,guestId,items,distrubutor,sector)=>({
    name ,
    guestId ,
    distrubutor:distrubutor || {name:'abdellah',id},
    id ,
    sector ,
    items ,
    status : "PENDING"
})
const billModel=(id,distrubutor,client,products,sector,city,status)=>({
    id          : id,
    ref         :("C"+client.name +( new Date().getTime()).toString()).toUpperCase() , 
    distrubutor :  distrubutor || {id: 1,name :'ali fatah'} , 
    client      :  client || {id: 1,name :'ali fatah'} , 
    products    :  products || [{id:1,code : "a11",price:50.00,name:'3afya 5L', quantity:5}] , 
    sector      :  sector || {id:1,name:'tkhisa'}, 
    total       :  products.reduce((a,c)=> a+(c.quantity * c.prce) ,0) || 100, 
    city        :  city ||sector.city ,
    date        :  new Date(), //use frebase date 
    hour        :  new Date().getHours(), //use frebase date 
    status      :  status , //||"PENDING" || "PAID" 
})

const model ={
    state:{
        cartGuests  :[],
        todaysBills : [] , 
        selectedBill : null 
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
        addCartItem({guest,product,sector},state){
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
                 cartGuests.push(cartGuestModel(cartGuests.length,guest.name,guest.id,[product],1,sector))
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
        validateGuestOrder({guestId,sector,status},state){
             // update order status
             // update status of cart guest to VALIDATED
             // create order bill 
             // is it paid or not 
             // maybe the client paid just a portion of what he owes  
             const cartGuests= [...state.cart.cartGuests]
             const targetGuest = cartGuests.filter(g=>g.guestId == guestId)[0]
             if( targetGuest ){
                 const tergetGuestIndex =  cartGuests.indexOf(targetGuest)
            
                 //modfy cartGuest status to VALIDATED 
                 cartGuests[tergetGuestIndex].status="VALIDATED"

                 //create bill and add it to todaysBills list 
                 const todaysBills = [...state.cart.todaysBills]
                 const {name,guestId,distrubutor,items} = cartGuests[tergetGuestIndex]
                 const orderBill = billModel(todaysBills.length,distrubutor,{id:guestId,name:name} ,items,sector.name,sector.city,status)
                 console.log(orderBill)
                 todaysBills.push(orderBill)
                 dispatch.cart.validatedGuestOrder({cartGuests , todaysBills })

                 //[TODO]push bill to firestore collection
                
            }
        },
        selectBill(id,state){
            const todaysBills = [...state.cart.todaysBills]
            const targetBill = todaysBills.filter(b=>b.id == id)[0]
            if(targetBill)
               dispatch.cart.selectedABill(targetBill)
        }
    })
}
export default model