import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'


export default async (args,state,dispatch)=>{
    try {
        const {id,name,navigation}=args
    
         
         //firestore
        const removeResponse= await firestore()
                                 .collection('sectors')
                                 .doc(id)
                                 .delete()

          const sectors_first_fetch = state.sector.sectors_first_fetch
          if(!sectors_first_fetch){
              let sectors= [...state.sector.sectors]
              
              sectors = sectors.filter(s => s.id != id) 
              
              dispatch.sector.removedSector({sectors})
              
              //delete from cache
              const cache={
                 month_of_creation: new Date().getMonth(),
                 sectors
              }
              await  asyncStorage.setItem("SECTORS",JSON.stringify(cache))
              
              //set state
          }


        //update related clients 
        // const clients = [...state.client.clients].filter(c=>c.sectorId == id)                        
        // if(clients.length >0){
        //     clients.forEach(async client => {
        //         await firestore()
        //         .collection('sectors')
        //         .doc(client.id)
        //         .update({
        //             sector:"NOT_DEFINED"
        //         })
        //     });
        // }
        
       

         dispatch.toast.show({
             type    : 'success',
             title   : 'Suppression ',
             message : `le sector ${name} est supprimer avec success `
         })
       
         navigation.goBack()
    } catch (error) {
       console.log("--------removeSector-----------") 
       console.log(error) 
      
    }
}