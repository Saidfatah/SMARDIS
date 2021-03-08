import firestore from '@react-native-firebase/firestore'


export default async (args,state,dispatch)=>{
    try {
        const {id,name,navigation}=args
        //  const sector = sectorModel(name,city)
        //  let sectors =[...state.sector.sectors]
         
         //firestore
         const addResponse= await firestore()
                                  .collection('sectors')
                                  .doc(id)
                                  .delete()
         
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
        
        //  //asign doc id then add to redux state
        //  sector.id = addResponse.id
        //  sectors.unshift(sector)

         dispatch.toast.show({
             type    : 'success',
             title   : 'Suppression ',
             message : `le sector ${name} est supprimer avec success `
         })
         dispatch.sector.removedSector()
         navigation.goBack()
    } catch (error) {
       console.log("--------removeSector-----------") 
       console.log(error) 
      
    }
}