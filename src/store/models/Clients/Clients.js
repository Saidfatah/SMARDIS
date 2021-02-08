import {clientModel} from './Schemas/ClientModel'
import firestore from '@react-native-firebase/firestore'


const FETCH_LIMIT=10
const model ={
    state:{
        clients       :[],
        clients_first_fetch:false,
        done_fetching_clients:false,
        done_adding_client:false,
        done_removing_client:false,
        clientsAdded  : 0 , 
        clientsCount  : 0 ,//to display in admin's dashboard
        last_visible_client : null,
    },
    reducers:{
        fetchedClientsCount : (state,clientsCount)=>({
            ...state,
            clientsCount 
        }),
        fetchedClients : (state,{clients,last_visible_client})=>({
            ...state,
            clients :[...clients],
            clients_first_fetch:true,
            done_fetching_clients:true,
            clientsCount:clients.length,
            last_visible_client
        }),
        fetcheClientsFailed : (state,clients)=>({
            ...state,
            clients_first_fetch:false,
            done_fetching_clients:true,
        }),
        incrementedClientsLimit : (state,{clients,newLimit})=>({
            ...state,
            clients :clients,
            clientsLimit: newLimit
        }),
        addedClient   : (state,clients)=>({
            ...state,
            clients  ,
            clientsCount: state.clientsCount +1,
            clientsAdded: state.clientsAdded +1,
            done_adding_client:true,
        }),
        addingClientFailed   : (state,clients)=>({
            ...state,
            done_adding_client:true,
        }),
        removedClient : (state,clients)=>({
            ...state,
            clients :[...clients],
            clientsCount: state.clientsCount -1,
            done_removing_client:true
        }),
        removingClientFailed : (state,clients)=>({
            ...state,
            done_removing_client:false
        }),
        updatedClient : (state,clients)=>({
            ...state,
            clients :[...clients] 
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
    },
    effects: (dispatch)=>({
        async fetchMoreClients(arg,state){
            try {
                const last_visible_client = state.client.last_visible_client

                const moreClientsResponse= await firestore()
                                        .collection('clients')
                                        .orderBy('ref',"asc")
                                        .startAt(last_visible_client)
                                        .limit(FETCH_LIMIT)
                                         
                                        
                moreClientsResponse.onSnapshot(res=>{
                    if(res.docs){
                        const docs =res.docs
                        const PrevClients =  [...state.client.clients]
                        PrevClients.pop()
                        const newClients  =  docs.map(doc=>({...doc.data(),id:doc.id}))
                       
                        dispatch.client.fetchedClients({
                            clients : [...PrevClients,...newClients],
                            last_visible_client : newClients[newClients.length -1].ref
                        }) 
                    }
                })
                             
               
            } catch (error) {
                dispatch.client.fetcheClientsFailed()
                console.log(error)
            }
            
        },
        async fetchClients(arg,state){
            try {
                const clients_first_fetch = state.client.clients_first_fetch
                if(clients_first_fetch) return
    
                // const clientsResponse= await firestore()
                //                         .collection('clients')
                //                         .orderBy('ref',"asc")
                //                         .limit(FETCH_LIMIT)
                const clientsResponse= await firestore()
                                        .collection('clients')
                                        .orderBy('ref',"asc")
         
                                        
                clientsResponse.onSnapshot(res=>{
                    if(res.docs){
                        const docs =res.docs
                        const clients = docs.map(doc=>({...doc.data(),id:doc.id}))
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
           
        },
        async addClient({name,sectorId,ref,phone,address,city,price,objectif},state){
            try {
                const newClient = clientModel(name,sectorId,ref,phone,address,city,price,objectif)

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
            } catch (error) {
                dispatch.client.addingClientFailed(currentClients)
                console.log(error)
            }
        },
        async updateClient({navigation,id,name,sectorId,phone,address,city,price,objectif},state){
           try {
                 const updatedFields= {name,sectorId,phone,address,city,price,objectif}
                 let   clients =[...state.client.clients]
                 const targetClient = clients.filter(client =>client.id == id)[0]
                 let   targetClientIndex =clients.indexOf(targetClient)
                 clients[targetClientIndex]= {...targetClient,...updatedFields} 

                 const updateResponse= await firestore()
                                             .collection("clients")
                                             .doc(id)
                                             .update({...updatedFields});
                                             
                 dispatch.toast.show({
                     type:'success',
                     title:'Ajoute ',
                     message:`le client ${name} est Modifier avec success `
                 })
                 dispatch.client.updatedClient(clients)
                 navigation.navigate('ADMINclients')

           } catch (error) {
               console.log(error)
           }
        },
        async removeClient({client,admin},state){
            try {
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
        },
        resetIsDone(field,state){
            dispatch.auth.reseted(field)
        }
    })
}
export default model