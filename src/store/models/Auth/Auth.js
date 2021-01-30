//here will be checking for auth 
//or maybe use the authenticated variable in other places 
import auth from '@react-native-firebase/auth'

const userTypes= ['ADMIN','DISTRIBUTOR']
const model ={
    state:{
        authenticated  :false,
        userType       :userTypes[1],
        distrubutorId  : 1,
        authError      : null , 
        adminId        : 1,
        savePass       : false,
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
                    //  if( password != '123456'  )
                    //     return dispatch.auth.loginFailed({message:'Password incorrect'})
                    //  if( username != '06123456789'  )
                    //     return dispatch.auth.loginFailed({message:'Unsername incorrect'})
                    
                    // get user doc from users collection 
                     // check for user type if logged in 
                     const type= userTypes[Math.round(Math.random(0,1))]
                     // navigation.navigate(type+'DashBoard')  
                    //  auth().signInWithPhoneNumber('')
                    const loginResponse = await auth().signInWithEmailAndPassword(username,password)
                    if(loginResponse){
                      return    
                    }
                     
                     //set async storage authenticated item and user item and savePasswordItem
                    //  navigation.navigate('ADMINDashBoard')   
                 }
             } catch (error) {
                 //handle errors
                 console.Console(error) 
             }
        },
        logout(somthing,state){
             
        },

    })
}
export default model