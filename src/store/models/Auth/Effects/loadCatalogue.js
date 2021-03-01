import firestore from '@react-native-firebase/firestore'


export default async (args,state,dispatch)=>{
    try {
      
        const getCatalogueResponse = await firestore()
                           .collection('users')
                           .doc('v6xM6xIb9lOBPczPiyvK')
                           .get()
        if(getCatalogueResponse.data()){
        const catalogue_url= getCatalogueResponse.data().catalogue
        dispatch.auth.loadedCatalogue(catalogue_url)
        }
    } catch (error) {
        let ERROR_MESSAGE = error.message.toString()
        console.log('-----loadCatalogue------')
        console.log(error)

    }
}