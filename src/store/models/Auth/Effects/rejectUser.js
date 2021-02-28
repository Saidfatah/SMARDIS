import firestore from '@react-native-firebase/firestore'


export default  async (id,state,dispatch)=>{
    try {

        const userRejectionResponse =firestore()
                                   .collection('users')
                                   .doc(id)
                                   .update({
                                       confirmed : "REJECTED"
                                   })

        dispatch.auth.rejectedUser()    

    } catch (error) {
        console.log('----fetchWaitingList-----')
        console.log(error)
        dispatch.auth.userRejectFailed() 
    }
}