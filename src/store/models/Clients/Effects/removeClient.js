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
        let clients = [...state.client.clients].filter(c => c.id != client.id) 

        const day_of_creation =new Date().getDate()
        const cache={
         day_of_creation,
         clients
        }
        await  asyncStorage.setItem("CLIENTS",JSON.stringify(cache))


         dispatch.toast.show({
             type:'success',
             title:'Supprission success',
             message:`client ${client.name} est supprimer avec success`
         })
         dispatch.client.removedClient(clients)
        } catch (error) {
            console.log(error)
            dispatch.client.removingClientFailed()
    }
}