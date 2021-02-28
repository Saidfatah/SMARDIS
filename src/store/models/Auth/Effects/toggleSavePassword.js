import AsyncStorage from '@react-native-async-storage/async-storage';



export default async (args,state,dispatch)=>{
    try {
        const {savePassword} = args
        await AsyncStorage.setItem('SAVE_PASSWORD', (savePassword).toString())
     
        if(savePassword == false){
        await AsyncStorage.removeItem('PASSWORD')
        await AsyncStorage.removeItem('EMAIL')
       }
 
    } catch (error) {
        console.log(error)
    }
}