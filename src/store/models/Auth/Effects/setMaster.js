import firestore from '@react-native-firebase/firestore'


export default async (args,state,dispatch)=>{
    try {
      const {id,isMaster}= args 
        const setMasterResponse =firestore()
                                   .collection('users')
                                   .doc(id)
                                   .update({
                                       isMaster 
                                   })

        dispatch.auth.setedAdminToMaster()    
        
    } catch (error) {
        console.log('----setMaster-----')
        dispatch.auth.settingAdminMasterFailed()    
        console.log(error)
    }
}