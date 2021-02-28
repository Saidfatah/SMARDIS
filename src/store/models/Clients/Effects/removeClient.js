import firestore from '@react-native-firebase/firestore'

export default async (args,state,dispatch)=>{
    try {
        const {client,admin}=args
        let clients = state.client.clients
         const newclients= clients.filter(cl => cl.id != client.id) 

         const ClientRef=await firestore()
                                    .collection('clients')
                                    .doc(client.id)
                                    .delete()

         dispatch.toast.show({
             type:'success',
             title:'Supprission success',
             message:`client ${client.name} est supprimer avec success`
         })
         dispatch.client.removedClient(newclients)
        } catch (error) {
            console.log(error)
            dispatch.client.removingClientFailed()
    }
}