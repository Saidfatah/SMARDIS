import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async (args,state,dispatch)=>{
    try {
        const {navigation} =args 
        const logoutResponse= await auth().signOut()
        
        //distrubutor
        const todays_orders_ref= state.scheduel.todays_orders_ref
        const validated_commands_ref= state.scheduel.validated_commands_ref
        const canceled_commands_ref= state.scheduel.canceled_commands_ref
        const login_snapshot= state.scheduel.login_snapshot
        const fetch_scheduels_ref= state.scheduel.fetch_scheduels_ref



        if(todays_orders_ref != null){
         console.log('from logout unsubscribe from todays_orders_ref')
         todays_orders_ref()
        }
        if(login_snapshot != null){
         console.log('from logout unsubscribe from login_snapshot')
         login_snapshot()
        }
        if(validated_commands_ref != null){
         console.log('from logout unsubscribe from validated_commands_ref')
         validated_commands_ref()
        }
        if(canceled_commands_ref != null){
         console.log('from logout unsubscribe from canceled_commands_ref')
         canceled_commands_ref()
        }
        if(fetch_scheduels_ref != null){
         console.log('from logout unsubscribe from fetch_scheduels_ref')
         fetch_scheduels_ref()
        }


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