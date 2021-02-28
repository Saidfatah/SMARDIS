import AsyncStorage from '@react-native-async-storage/async-storage';

export default async ()=>{
    try {
       await AsyncStorage.removeItem('CART')
    } catch (error) {
        console.log("------deleteCartFromASyncStorage-----")
        console.log(error)
    }
}