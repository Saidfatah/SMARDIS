import AsyncStorage from '@react-native-async-storage/async-storage';

export default async ({cartItems ,guest ,sector,scheduelId})=>{
     try {
         //create cart obj then stringify it 
         const cart ={
             cartItems ,
             guest ,
             sector,
             scheduelId,
             created_at:new Date()
         }
        await AsyncStorage.setItem('CART', JSON.stringify(cart))
     } catch (error) {
         console.log("------saveCartToAsyncStorage-----")
         console.log(error)
     }
}