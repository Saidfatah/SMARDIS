import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'

export default async (args,state,dispatch)=>{
    try {
        const {client,admin}=args

         const ClientRef=await firestore()
                                    .collection('clients')
                                    .doc(client.id)
                                    .delete()

         //delete from cache
         const clients_first_fetch = state.client.clients_first_fetch
         if(!clients_first_fetch){
             let clients = [...state.client.clients].filter(c => c.id != client.id) 
     
             dispatch.client.removedClient({clients})

      
             const cache={
                mounth_of_creation: new Date().getMonth(),
               clients
             }
             await  asyncStorage.setItem("CLIENTS",JSON.stringify(cache))
         }


         dispatch.toast.show({
             type:'success',
             title:'Supprission success',
             message:`client ${client.name} est supprimer avec success`
         })
        } catch (error) {
            console.log(error)
            dispatch.client.removingClientFailed()
    }
}