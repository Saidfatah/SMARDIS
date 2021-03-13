import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'


const CONFIG_DOC="0000CONFIG0000"
export default async (arg,state,dispatch)=>{
    try {
        
        const CLIENTS = await asyncStorage.getItem('CLIENTS')

        if(CLIENTS != undefined && CLIENTS!=null){
             const {clients,day_of_creation}= JSON.parse(CLIENTS) 
             const current_day= new Date().getDate()
             
     
             if(current_day == day_of_creation ){
                return dispatch.client.fetchedClients({
                    clients,
                    last_visible_client : clients[clients.length-1].ref,
                    clients_first_fetch:false
                })
             }
        } 

        const clients_first_fetch = state.client.clients_first_fetch
        if(clients_first_fetch) return

    
        const clientsResponse= await firestore().collection('clients')
                             
 
                                
        clientsResponse.onSnapshot(async res=>{
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


                //write to cache
               const day_of_creation =new Date().getDate()
               const cache={
                day_of_creation,
                clients
               }
               await  asyncStorage.setItem("CLIENTS",JSON.stringify(cache))

            

                return dispatch.client.fetchedClients({
                    clients,
                    last_visible_client : clients[clients.length-1].ref,
                    clients_first_fetch:true
                })
            }
            dispatch.client.fetcheClientsFailed()
        })
        

    } catch (error) {
        dispatch.client.fetcheClientsFailed()
        console.log(error)
    }
   
}