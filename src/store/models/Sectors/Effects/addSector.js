import {sectorModel} from '../Schemas/SectorModel'
import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'


export default async (args,state,dispatch)=>{
    try {
        const {name,city,navigation}=args
         const sector = sectorModel(name,city)
        
         
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
        
         //write to cache
         const sectors_first_fetch = state.sector.sectors_first_fetch
        
         if(!sectors_first_fetch){
           let sectors= [...state.sector.sectors]
           console.log("sectors1:"+sectors.length)
           if(newSector != null){
            sectors.push(sector)
             
            
            sectors = sectors.sort(function(a, b){
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
            })
            dispatch.sector.addedSector({sectors})
            const cache={
             day_of_creation: new Date().getDate(),
             sectors
            }
             await  asyncStorage.setItem("SECTORS",JSON.stringify(cache))
          }

         }

        

         dispatch.toast.show({
             type    : 'success',
             title   : 'Ajoute ',
             message : `le sector ${name} est ajouter avec success `
         })
         navigation.goBack()
    } catch (error) {
       console.log(error) 
       if(error.message=="NAME_USED")
         return dispatch.sector.sectorAddFailed({id:'NAME_USED',message:"le nom du secteur est deja utuliser"})
       dispatch.sector.sectorAddFailed({id:'ADD_FAILED',message:"ne peut pas ajouter ce secteur d'abord"})
    }
}