import firestore from '@react-native-firebase/firestore'


const CONFIG_DOC="0000CONFIG0000"
export default async (arg,state,dispatch)=>{
    try {
        const {id}=arg
      

        const clients_first_fetch = state.client.clients_first_fetch
        
        const last_visited_client= state.client.last_visited_client

        if(last_visited_client !==null && id === last_visited_client) return 
        
        if(clients_first_fetch) {
            const client = state.client.clients.filter(c=>c.id === id )[0]
            return dispatch.client.fetchedClient({selectedClient:client})
        }



        const clientResponse= await firestore().collection('clients').doc(id).get()

        const client=clientResponse.data()
        if(client){
            return dispatch.client.fetchedClient({selectedClient:client})
        }
        dispatch.client.fetchedClientFailed()

    } catch (error) {
        dispatch.client.fetchedClientFailed()
        console.log(error)
    }
   
}