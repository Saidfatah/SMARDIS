import firestore from '@react-native-firebase/firestore'

const CONFIG_DOC="0000CONFIG0000"

export default async (arg,state,dispatch)=>{
    try {
       const sectors_first_fetch = state.sector.sectors_first_fetch
       if(sectors_first_fetch) return

       const clientsResponse= await firestore().collection('sectors')
       clientsResponse.onSnapshot(res=>{
           const docs =res.docs
           if(docs.length){
               const maped_data = docs.map(doc=>({...doc.data(),id:doc.id}))
               const sectors = maped_data.filter(doc=>doc.id != CONFIG_DOC)
               
               return dispatch.sector.fetchedSectors(sectors)
           }
           dispatch.sector.sectorsFetchFailed()
       })
   } catch (error) {
        console.log(error)
        dispatch.sector.sectorsFetchFailed()
    }

}