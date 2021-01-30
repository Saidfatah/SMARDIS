//here will be checking for auth 
//or maybe use the authenticated variable in other places 
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const userTypes= ['ADMIN','DISTRIBUTOR']
const model ={
    state:{
        authenticated  :false,
        userType       :userTypes[1],
        authError      : null , 
        savePass       : false,
        adminId        : 1,
        distrubutorId  : 1,
        user           : null ,
    },
    reducers:{
        checkedAuthentication : (state,{authenticated})=>({
            ...state,
            authenticated ,
        }),
        loginFailed:  (state,authError)=>({
            ...state,
            authError :authError
        }),
        loginSuccess:  (state,{user,userType})=>({
            ...state,
            user,
            userType,
            authenticated:true,
            distrubutorId:user.id,
            adminId:user.id,
        }),
    },
    effects: (dispatch)=>({
        checkAuthetication(somthing,state){
             auth().onAuthStateChanged(user=>{
                 if(user) return 
             })
        },
        async login({password,username,savePassword,navigation},state){
             try {
                if(username && password && navigation){
                  
                    // get user doc from users collection 
                     // check for user type if logged in 
             
                    const loginResponse = await auth().signInWithEmailAndPassword(username,password)
                    if(loginResponse.user){
                        const userDocs = await firestore()
                                              .collection('users')
                                              .where('id','==',loginResponse.user.uid)
                                              .get()
                                              
                        if(!userDocs.empty){
                           const user =  userDocs.docs[0].data()
                            return dispatch.auth.loginSuccess({user,userType:user.type})
                        }
                    }
                    throw new Error('no data found')
                     //set async storage authenticated item and user item and savePasswordItem
                    //  navigation.navigate('ADMINDashBoard')   
                 }
             } catch (error) {
                 //handle errors
                return  console.log(error) 
                 if(error.message.contains('invalid-email'))
                   return dispatch.auth.loginFailed({message:'email est pas valide'})
             }
        },
        logout(somthing,state){
             
        },

    })
}
export default model