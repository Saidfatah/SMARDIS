import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async (args,state,dispatch)=>{
    try {
        const {navigation} =args 
        const logoutResponse= await auth().signOut()
        
        
        //remove user and set authentucated to false and
        await AsyncStorage.removeItem('USER')
        await AsyncStorage.setItem('AUTHENTICATED', JSON.stringify(false))
        await AsyncStorage.removeItem('USER_TYPE')

        dispatch.auth.logedOut()  
        navigation.navigate('LOGIN')
       
    } catch (error) {
        console.log("\n----------LOGOUT ERROR--------")
        console.log(error)
    }
}