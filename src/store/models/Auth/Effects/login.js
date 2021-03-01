import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

let   ON_AUTH_STATE_CHANGED_UNSUBSCRIBE = null

export default async (args,state,dispatch)=>{
    try {
           //unsubscribe to onAuthStateChanged because otherwise it'll try to take controll as soon as we log in hence
           //preventing us from retrieving user doc from firestore  
           const {password,username,savePassword,navigation} =args
           const on_state_change_snapshot = state.auth.on_state_change_snapshot
           on_state_change_snapshot && on_state_change_snapshot()

           const loginResponse = await auth().signInWithEmailAndPassword(username,password)
           
           if(loginResponse.user){
               const userDocResponse= await firestore()
                                     .collection('users')
                                     .where('user_id','==',loginResponse.user.uid)
                                    
                const snapshotRef= userDocResponse.onSnapshot(async res=>{
                   if(res.docs.length){
                        const userDoc= res.docs[0]
                        let user
                        if(userDoc == undefined){
                            console.log("no  user doc")
                            user =  null 
                        }else{
                            console.log("got user doc")
                            user =  {...userDoc.data(),id:userDoc.id}
                        }
                     
                        //pressist state to local storage  
                        //so that when we open app next time we don't have to refetch from firestore
                        if(user){
                             await AsyncStorage.setItem('USER', JSON.stringify(user))
                             await AsyncStorage.setItem('USER_TYPE', user.type)
                        }
                        await AsyncStorage.setItem('SAVE_PASSWORD', JSON.stringify(savePassword))
                        await AsyncStorage.setItem('PASSWORD', password)
                        await AsyncStorage.setItem('EMAIL',username.toString().trim())
                       
                        dispatch.auth.loginSuccess({
                           user,
                           userType:(user &&user.type) || null,
                           userPassword:password
                        })

                       //redirect user to their approprate dashboard 
                       return navigation.navigate(user.type+'DashBoard')   
                   }
                })
                dispatch.auth.setedSnapshotListnerRef({field:"login_snapshot",ref:snapshotRef})                   
               
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