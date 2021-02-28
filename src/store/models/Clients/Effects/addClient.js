import {clientModel} from '../Schemas/ClientModel'
import firestore from '@react-native-firebase/firestore'


export default async (args,state,dispatch)=>{
    try {
        const {name,sectorId,ref,phone,address,city,price,objectif,navigation} = args 
        const USER_TYPE = state.auth.userType;
        let newClient
        if(USER_TYPE == "ADMIN"){
            newClient = clientModel(name,sectorId,ref,phone,address,city,price,objectif,"VALIDATED")
        }else{
            newClient = clientModel(name,sectorId,ref,phone,address,city,price,objectif,"PENDING")
        }
          
       //check if name is already used 
       const checkNameResponse= await firestore()
       .collection('clients')
       .where('name','==',name)
       .get()
       if(checkNameResponse.docs.length) throw Error('NAME_USED')   

       //firestore
       const addResponse= await firestore().collection('clients').add(newClient)
      
       
       //asign id of newly created doc then add to redux side clients list 
       const currentClients = [...state.client.clients]
       newClient.id = addResponse.id
       currentClients.unshift(newClient)

       dispatch.toast.show({
           type:'success',
           title:'Ajoute ',
           message:`le client ${name} est ajouter avec success `
       })
       dispatch.client.addedClient(currentClients)
       navigation.goBack()
    } catch (error) {
        console.log(error)
        if(error.message=="NAME_USED")
           return dispatch.client.addingClientFailed({id:'NAME_USED',message:"le nom du client est deja utuliser"})
        dispatch.client.addingClientFailed({id:'ADD_FAILED',message:"ne peut pas ajouter un client d'abord"})
    }
}