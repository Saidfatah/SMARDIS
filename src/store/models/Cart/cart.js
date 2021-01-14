const cartGuests = [
    {
        name:'said',
        id:1,
        items:[
            {id:1,name:'sugar',price:150.9,quantity:2},
            {id:2,name:'oil',price:99,quantity:4},
        ]
    },
    {
        name:'ali',
        id:2,
        items:[
            {id:1,name:'choclate',price:45.9,quantity:4},
            {id:2,name:'pasta',price:25.9,quantity:3},
        ]
    }
]

const model ={
    state:{
        cartGuests  :[...cartGuests],
    },
    reducers:{
        updatedQuantity : (state,cartGuests)=>({
            ...state,
            cartGuests :cartGuests
        }),
    },
    effects: (dispatch)=>({
        updateQuantity({guestId,itemId,increment},state){
            let currCartGuests= [...state.cart.cartGuests]
            currCartGuests = currCartGuests.map(guest=>{
                if(guest.id == guestId){
                    //get targeted item
                    const updatedItems = [...guest.items].map(item=>item.id == itemId ?{...item,quantity:item.quantity + increment} :item) 
                    const newGuest    = {...guest,items:updatedItems}
                    return newGuest 
                }
                return guest
            } )

            dispatch.cart.updatedQuantity(currCartGuests)
            console.log(guestId,itemId)
        },
        removeGuestItem({guestId,itemId},state){
             //if guestItems are equal or less than 0 then removez the guest
             //we need guest ID and items Id
             
        },
        validateGuestOrder({guestId},state){
             //guest id 
             //update order status
             //if guestItems are equal or less than 0 then removez the guest
             
        }

    })
}
export default model