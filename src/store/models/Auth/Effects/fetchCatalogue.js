import firestore from '@react-native-firebase/firestore'

const CONFIG_DOC="1 - - CONFIG - -"
export default async (args,state,dispatch)=>{
    try {

         const catalogueResponse= firestore().collection('orders').doc(CONFIG_DOC)
         const doc= await catalogueResponse.get()
         
         if(!doc.data()) return dispatch.auth.fetchingCatalogueFailed()

         const data=doc.data()
         console.log({data})
         if(data && data.pdf_uri){
              return dispatch.auth.fetchedCatalogue({ catalogue:data.pdf_uri })
         }

         dispatch.auth.fetchingCatalogueFailed()

    } catch (error) {
        console.log('----fetchCatalogue-----')
        console.log(error)
        dispatch.auth.fetchingCatalogueFailed()
    }
}