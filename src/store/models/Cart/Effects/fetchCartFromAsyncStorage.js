import AsyncStorage from '@react-native-async-storage/async-storage';


export default async (args,state,dispatch)=>{
    try {
         const cart= await AsyncStorage.getItem('CART')
         if(cart != null && cart != undefined){
             const cartParsed=JSON.parse(cart)
             const {cartItems,guest,sector,scheduelId,created_at}=cartParsed

             //check if we have fetched yesterdays cart if so delete the async storage 
             //and reset the cart model's state 
             const midnight = new Date()
             const createdAt = new Date(created_at)
             midnight.setHours(23,59,59,999)
       
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
 }