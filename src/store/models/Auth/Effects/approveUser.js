import firestore from '@react-native-firebase/firestore'


export default async (id,state,dispatch)=>{
    try {

        const userApproveResponse =firestore()
                                   .collection('users')
                                   .doc(id)
                                   .update({
                                       confirmed : "VALIDATED"
                                   })

        dispatch.auth.approvedUser()    

    } catch (error) {
        console.log('----fetchWaitingList-----')
        console.log(error)
        dispatch.auth.userApproveFailed()   
    }
}