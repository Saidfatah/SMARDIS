import firestore from '@react-native-firebase/firestore'

export default async (arg,state,dispatch)=>{
    try {
       const sectors_first_fetch = state.sector.sectors_first_fetch
       if(sectors_first_fetch) return

       const clientsResponse= await firestore().collection('sectors')
       clientsResponse.onSnapshot(res=>{
           const docs =res.docs
           if(docs.length){
               const sectors = docs.map(doc=>({...doc.data(),id:doc.id}))
               return dispatch.sector.fetchedSectors(sectors)
           }
           dispatch.sector.sectorsFetchFailed()
       })
   } catch (error) {
        console.log(error)
        dispatch.sector.sectorsFetchFailed()
    }

}