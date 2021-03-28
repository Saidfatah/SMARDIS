import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'


const CONFIG_DOC="0000CONFIG0000"
export default async (arg,state,dispatch)=>{
    try {
        
        const CLIENTS = await asyncStorage.getItem('CLIENTS')

        if(CLIENTS != undefined && CLIENTS!=null){
             const {clients,mounth_of_creation}= JSON.parse(CLIENTS) 
             const current_mounth= new Date().getMonth()
             
   
             if(current_mounth == mounth_of_creation ){
                return dispatch.client.fetchedClients({
                    clients,
                    clients_first_fetch:false
                })
             }
        } 

        const clients_first_fetch = state.client.clients_first_fetch
        if(clients_first_fetch) return

    
        const clientsResponse= await firestore().collection('clients')
                             
 
                                
        clientsResponse.onSnapshot(async res=>{
            if(res.docs.length){
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
              
               const cache={
                mounth_of_creation: new Date().getMonth(),
                clients:clients.map(c=>({...c,fromCache:true}))
               }
               await  asyncStorage.setItem("CLIENTS",JSON.stringify(cache))

            

                return dispatch.client.fetchedClients({
                    clients:clients.map(c=>({...c,fromCache:false})),
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