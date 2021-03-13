import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'

export default async (args,state,dispatch)=>{
    try {
         const {name,id,city,navigation} = args
       
         const updateResponse= await firestore()
                                     .collection("sectors")
                                     .doc(id)
                                     .update({name,city});
       
         //write to cache
         const sectors_first_fetch = state.sector.sectors_first_fetch
         if(!sectors_first_fetch){
             let sectors =[...state.sector.sectors]
             const tragetSector = sectors.filter(sector =>sector.id == id)[0]
             let targetSectorId =sectors.indexOf(tragetSector)
             sectors[targetSectorId]= {...tragetSector,name,city}
             
             sectors = sectors.sort(function(a, b){
               if(a.name < b.name) { return -1; }
               if(a.name > b.name) { return 1; }
               return 0;
             })
             const cache={
              day_of_creation: new Date().getDate(),
              sectors
             }
             await  asyncStorage.setItem("SECTORS",JSON.stringify(cache))
             dispatch.sector.updatedSector({sectors})
         
         }

         dispatch.toast.show({
             type:'success',
             title:'Modification ',
             message:`le sector ${name} est modifier avec success `
         })
         
         navigation.navigate("ADMINsectors")
    } catch (error) {
        console.log(error)
        dispatch.sector.sectorUpdateFailed()

    }
}