import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'

const CONFIG_DOC="0000CONFIG0000"

export default async (arg,state,dispatch)=>{
    try {

        const SECTORS = await asyncStorage.getItem('SECTORS')
        if(SECTORS != undefined && SECTORS!=null){
             const {sectors,day_of_creation}= JSON.parse(SECTORS) 
             const current_day= new Date().getDate()
             
             if(current_day == day_of_creation ){
                return dispatch.sector.fetchedSectors({
                    sectors,
                    sectors_first_fetch:false
                })
             }
        } 

       const sectors_first_fetch = state.sector.sectors_first_fetch
       if(sectors_first_fetch) return

       const clientsResponse= await firestore().collection('sectors')
       clientsResponse.onSnapshot(async res=>{
           const docs =res.docs
           if(docs.length){
               const maped_data = docs.map(doc=>({...doc.data(),id:doc.id}))
               const sectors = maped_data
               .sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
               })
               .filter(doc=>doc.id != CONFIG_DOC)

                //write to cache
                const day_of_creation =new Date().getDate()
                const cache={
                 day_of_creation,
                 sectors
                }
                await  asyncStorage.setItem("SECTORS",JSON.stringify(cache))
 
             
               return dispatch.sector.fetchedSectors({
                   sectors,
                   sectors_first_fetch:true
                })
           }
           dispatch.sector.sectorsFetchFailed()
       })
   } catch (error) {
        console.log(error)
        dispatch.sector.sectorsFetchFailed()
    }

}