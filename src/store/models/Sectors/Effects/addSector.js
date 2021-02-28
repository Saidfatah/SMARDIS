import {sectorModel} from '../Schemas/SectorModel'
import firestore from '@react-native-firebase/firestore'


export default async (args,state,dispatch)=>{
    try {
        const {name,city,navigation}=args
         const sector = sectorModel(name,city)
         let sectors =[...state.sector.sectors]
         
         //check if name is already used 
         const checkNameResponse= await firestore()
         .collection('sectors')
         .where('name','==',name)
         .get()
         if(checkNameResponse.docs.length) throw Error('NAME_USED')   

         const newSector = sectorModel(name,city)
         //firestore
         const addResponse= await firestore()
                                  .collection('sectors')
                                  .add(newSector)
         
         //asign doc id then add to redux state
         sector.id = addResponse.id
         sectors.unshift(sector)

         dispatch.toast.show({
             type    : 'success',
             title   : 'Ajoute ',
             message : `le sector ${name} est ajouter avec success `
         })
         dispatch.sector.addedSector(sectors)
         navigation.goBack()
    } catch (error) {
       console.log(error) 
       if(error.message=="NAME_USED")
         return dispatch.sector.sectorAddFailed({id:'NAME_USED',message:"le nom du secteur est deja utuliser"})
       dispatch.sector.sectorAddFailed({id:'ADD_FAILED',message:"ne peut pas ajouter ce secteur d'abord"})
    }
}