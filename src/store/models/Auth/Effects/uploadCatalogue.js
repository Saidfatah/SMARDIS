import firestore from '@react-native-firebase/firestore'
import Storage from '@react-native-firebase/storage'


export default async (uri,state,dispatch)=>{
    try {
        if(!uri) return 

        let CATALOGUE_URI = "NOT_UPLOADED"
        const task =  Storage().ref('catalogue/catalogue').putFile(uri);
        task.on('state_changed', 
            sn =>{},
            err=>console.log(err),
            () => {
               console.log(' uploaded! catalogue')
               Storage()
               .ref("catalogue").child("catalogue").getDownloadURL()
               .then(url => {
                 console.log('uploaded catalogue url', url);
                 CATALOGUE_URI=url
               }).catch(err=>console.log(err))
           }
        )
        await task 
        if(CATALOGUE_URI){
            const setMasterAdminCatalogue = await firestore()
                               .collection('users')
                               .doc('v6xM6xIb9lOBPczPiyvK')
                               .update({
                                catalogue:CATALOGUE_URI
                               })
        
           dispatch.uploadedCatalogue(CATALOGUE_URI)
        }


        navigation.navigate("WAIT_ROOM") 
    } catch (error) {
        let ERROR_MESSAGE = error.message.toString()
        console.log('-----uploadCatalogue------')
        console.log(error)

    }
}