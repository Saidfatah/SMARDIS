import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


export default async (userInfoObj,state,dispatch)=>{
    try {
        const {password,name,city,phone,type}=userInfoObj
        const user = state.auth.user

        if(!user) return 

        const   updatedFields={password,name,city,phone}
        if(type == "ADMIN"){
            updatedFields.ACCESS_CODE = userInfoObj.ACCESS_CODE
        } 

    
        const id = user.id
        const updateResponse = await firestore()
                                    .collection('users')
                                    .doc(id)
                                    .update(updatedFields)
    
        //check if password was modified then update firestroe auth password
        const oldPassword = state.auth.userPassword
        if(password != oldPassword){
            const emailCred  = auth.EmailAuthProvider.credential(
                auth().currentUser.email, 
                oldPassword 
             );

            auth().currentUser.reauthenticateWithCredential(emailCred)
            .then(() => {
                console.log('updated password')
               return  auth().currentUser.updatePassword(password);
            })
            .catch(error => {
                  console.log('-----passwordupdate------')
                  console.log(error)
                  let ERROR_MESSAGE = error.message.toString()
                  if(ERROR_MESSAGE.indexOf('auth/wrong-password')>-1)
                  return  dispatch.auth.updateAccountFailed({id:"WRONG_PASSWORD",message:'failed to update account'})

                  dispatch.auth.updateAccountFailed({id:"UPDATE_PASSWORD_FAILED",message:'failed to update account'})
            });
        }
        dispatch.auth.updatedAccount()
     
    } catch (error) {
        console.log('-----updateAccount------')
        console.log(error)
        
        dispatch.auth.updateAccountFailed({id:"FAILED",message:'failed to update account'})
    }
}