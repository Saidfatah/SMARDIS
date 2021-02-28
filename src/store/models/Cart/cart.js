import updateQuantity from './Effects/updateQuantity'
import addCartItem from './Effects/addCartItem'
import removeCartItem from './Effects/removeCartItem'
import validateOrder from './Effects/validateOrder'
import fetchCartFromAsyncStorage from './Effects/fetchCartFromAsyncStorage'
 


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
            cartItems  :[] , 
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
        updateQuantity    : (args,state)=>updateQuantity(args,state,dispatch),
        addCartItem       : (args,state)=>addCartItem(args,state,dispatch),
        removeCartItem    : (args,state)=>removeCartItem(args,state,dispatch),
        validateOrder     : (args,state)=>validateOrder(args,state,dispatch),
        fetchCartFromAsyncStorage     : (args,state)=>fetchCartFromAsyncStorage(args,state,dispatch),
 
        
        resetIsDone(field,state){
            dispatch.cart.reseted(field)
        }
    })
}
export default model