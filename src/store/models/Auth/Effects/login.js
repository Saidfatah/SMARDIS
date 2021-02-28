import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

let   ON_AUTH_STATE_CHANGED_UNSUBSCRIBE = null

export default async (args,state,dispatch)=>{
    try {
           //unsubscribe to onAuthStateChanged because otherwise it'll try to take controll as soon as we log in hence
           //preventing us from retrieving user doc from firestore  
           const {password,username,savePassword,navigation} =args
           ON_AUTH_STATE_CHANGED_UNSUBSCRIBE && ON_AUTH_STATE_CHANGED_UNSUBSCRIBE()

           const loginResponse = await auth().signInWithEmailAndPassword(username,password)
           
           if(loginResponse.user){
               console.log('login id :'+loginResponse.user.uid)
               const userDocResponse= await firestore()
                                     .collection('users')
                                     .where('user_id','==',loginResponse.user.uid)
                                    
                userDocResponse.onSnapshot(async res=>{
                   if(res.docs.length){
                       const userDoc= res.docs[0]
                       const user =  {...userDoc.data(),id:userDoc.id}
                     
                       //pressist state to local storage  
                       //so that when we open app next time we don't have to refetch from firestore
                       await AsyncStorage.setItem('USER', JSON.stringify(user))
                       await AsyncStorage.setItem('USER_TYPE', user.type)
                       await AsyncStorage.setItem('SAVE_PASSWORD', JSON.stringify(savePassword))
                       await AsyncStorage.setItem('PASSWORD', password)
                       console.log({username})
                       await AsyncStorage.setItem('EMAIL', username)

                       
                       dispatch.auth.loginSuccess({user,userType:user.type,userPassword:password})

                       //redirect user to their approprate dashboard 
                       return navigation.navigate(user.type+'DashBoard')   
                   }
                })                    
               
           }
        
    } catch (error) {
        let ERROR_MESSAGE = error.message.toString()
        console.log('------Login------')
        console.log(error)
        if(ERROR_MESSAGE.indexOf('auth/wrong-password'))
        {
           console.log(error) 
           return dispatch.auth.loginFailed({message:'mote de passe est incorrect'})
        }
        if(ERROR_MESSAGE.indexOf('invalid-email'))
        { 
            console.log("\nemail") 
             return dispatch.auth.loginFailed({message:'email est pas valide'})
        }
    }
} 