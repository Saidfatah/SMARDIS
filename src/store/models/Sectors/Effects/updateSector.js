import firestore from '@react-native-firebase/firestore'

export default async (args,state,dispatch)=>{
    try {
         const {name,id,city,navigation} = args
         let sectors =[...state.sector.sectors]
         const tragetSector = sectors.filter(sector =>sector.id == id)[0]
         let targetSectorId =sectors.indexOf(tragetSector)
         sectors[targetSectorId]= {...tragetSector,name,city}
          
         const updateResponse= await firestore()
                                     .collection("sectors")
                                     .doc(id)
                                     .update({name,city});

         dispatch.toast.show({
             type:'success',
             title:'Modification ',
             message:`le sector ${name} est modifier avec success `
         })
         dispatch.sector.updatedSector(sectors)
         navigation.navigate("ADMINsectors")
    } catch (error) {
        console.log(error)
        dispatch.sector.sectorUpdateFailed()

    }
}