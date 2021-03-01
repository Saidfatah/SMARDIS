import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async (args,state,dispatch)=>{
    try {
        const {navigation}= args 
        const ON_AUTH_STATE_CHANGED_UNSUBSCRIBE = auth().onAuthStateChanged(async user=>{

            let savePassword  = await AsyncStorage.getItem('SAVE_PASSWORD')
            savePassword = JSON.stringify(savePassword)
            const savedPassword  = await AsyncStorage.getItem('PASSWORD')
            const savedEmail  = await AsyncStorage.getItem('EMAIL')
          
            if(user){      
                //get user doc from async storage
             
                 let userDoc
                 let userType
                //  const userjsonValue = await AsyncStorage.getItem('USER')
                //  userDoc   = userjsonValue != null ? JSON.parse(userjsonValue) : null
                //  userType  = userjsonValue != null ? await AsyncStorage.getItem('USER_TYPE') : null
               

                //if somehow user wasn't fetched from async storage let's refetch from firestore
           
                    const userDocResponse =await firestore().collection('users').where('user_id','==',user.uid)

                    userDocResponse.onSnapshot(res=>{
                        const docs=res.docs
                        userDoc={...docs[0].data(),id:docs[0].id}
                        userType=docs[0].data().type

                        console.log('try getting user doc ' )
                        dispatch.auth.checkedAuthentication({
                            authenticated:true,
                            user:userDoc,
                            userType ,
                            savePassword  ,
                            savedPassword  ,
                            savedEmail
                        })

                       if(userType != null){
                           //check if user in approved by admin if not then we redirect them to waitingRoom 
                           if(userDoc != undefined && userDoc.confirmed =="PENDING") 
                              return navigation.navigate("WAIT_ROOM") 
  
                           //redirect logged users that are approved to their appropriate Dashboard
                           if(userDoc != undefined){ 
                               console.log('shoudl redirect ')
                               console.log({userType})
                              return  navigation.navigate(userType+'DashBoard')
                           }
                       }
                    })
      
               
                console.log('not user')
                 
            }else{        
                 dispatch.auth.checkedAuthentication({
                     authenticated : false,
                     user          : null,
                     userType      : null,
                     savePassword  ,
                     savedPassword  ,
                     savedEmail
                  })
                 navigation.navigate('LOGIN')
            }
       })
       dispatch.auth.setedSnapshotListnerRef({field:"on_state_change_snapshot",ref:ON_AUTH_STATE_CHANGED_UNSUBSCRIBE})
        
    } catch (error) {
        console.log("\n-------HECKOUT AUTH ERROR ----------")
        console.log(error)
    }
}