import firestore from '@react-native-firebase/firestore'


const CONFIG_DOC="0000CONFIG0000"
export default async (arg,state,dispatch)=>{
    try {
        const clients_first_fetch = state.client.clients_first_fetch
        if(clients_first_fetch) return

    
        const clientsResponse= await firestore().collection('clients')
                             
 
                                
        clientsResponse.onSnapshot(res=>{
            if(res.docs.length){
                console.log({CLIIENTS:res.docs.length})
                const docs =res.docs
                const maped_data = docs.map(doc=>({...doc.data(),id:doc.id}))
                const clients = maped_data
                .sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
                .filter(client=>client.id != CONFIG_DOC)
                return dispatch.client.fetchedClients({
                    clients,
                    last_visible_client : clients[clients.length-1].ref
                })
            }
            dispatch.client.fetcheClientsFailed()
        })
        

    } catch (error) {
        dispatch.client.fetcheClientsFailed()
        console.log(error)
    }
   
}