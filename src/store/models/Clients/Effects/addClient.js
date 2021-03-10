import {clientModel} from '../Schemas/ClientModel'
import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'


export default async (args,state,dispatch)=>{
    try {
        const {name,sectorId,ref,phone,address,city,price,objectif,navigation} = args 
        const USER_TYPE = state.auth.userType;
        let newClient = null
        let created_client_id = null

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
       let clients = [...state.client.clients]
       newClient.id = addResponse.id
      

       //write to cache
       if(newClient != null){

        clients.push(newClient)

        clients = [...clients.sort(function(a, b){
           if(a.name < b.name) { return -1; }
           if(a.name > b.name) { return 1; }
           return 0;
         })]

        const cache={
         day_of_creation: new Date().getDate(),
         clients
        }
        await  asyncStorage.setItem("CLIENTS",JSON.stringify(cache))
      }



       dispatch.toast.show({
           type:'success',
           title:'Ajoute ',
           message:`le client ${name} est ajouter avec success `
       })
       dispatch.client.addedClient(clients)
       navigation.goBack()
    } catch (error) {
        console.log(error)
        if(error.message=="NAME_USED")
           return dispatch.client.addingClientFailed({id:'NAME_USED',message:"le nom du client est deja utuliser"})
        dispatch.client.addingClientFailed({id:'ADD_FAILED',message:"ne peut pas ajouter un client d'abord"})
    }
}