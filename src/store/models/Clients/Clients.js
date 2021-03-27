import fetchWaitingClients from  './Effects/fetchWaitingClients'
import fetchClients  from  './Effects/fetchClients'
import addClient     from   './Effects/addClient'
import updateClient  from  './Effects/updateClient'
import removeClient  from  './Effects/removeClient'
import selectClient  from  './Effects/selectClient'
import updateClientsOrderInSector  from  './Effects/updateClientsOrderInSector'

const model ={
    state:{
        clients         :[],
        waiting_clients :[],
        clients_first_fetch:false,
        waiting_clients_first_fetch:false,
        done_fetching_clients:false,
        done_fetching_waiting_clients:false,
        done_adding_client:false,
        done_removing_client:false,
        clientsAdded  : 0 , 
        clientsCount  : 0 ,//to display in admin's dashboard
        waiting_clients_count  : 0 ,//to display in admin's dashboard
        last_visible_client : null,
        client_adding_error : null,
        last_visited_client : null,
        selectedClient  :null,

    },
    reducers:{
        fetchedClientsCount : (state,clientsCount)=>({
            ...state,
            clientsCount 
        }),
        fetchedClients : (state,{clients,clients_first_fetch})=>({
            ...state,
            clients :[...clients],
            clients_first_fetch,
            done_fetching_clients:true,
            clientsCount:clients.length,
            waiting_clients :[...clients].filter(c=>c.confirmed != "VALIDATED"),
            waiting_clients_first_fetch:true,
            done_fetching_waiting_clients:true,
            waiting_clients_count:[...clients].filter(c=>c.confirmed != "VALIDATED").length
        }),
        fetchedClient : (state,{selectedClient})=>({
            ...state,
            selectedClient,
            last_visited_client : selectedClient.id
        }),
        fetchedClientFailed : (state,{clients,clients_first_fetch})=>({
            ...state,
            selectedClient:null,
            last_visited_client : null
        }),
        fetcheClientsFailed : (state,clients)=>({
            ...state,
            clients_first_fetch:false,
            done_fetching_clients:true,
        }),
        fetchedWaitingClients : (state,clients)=>({
            ...state,
            // waiting_clients :[...clients],
            
        }),
        fetcheWaitingClientsFailed : (state,clients)=>({
            ...state,
            waiting_clients:[],
            waiting_clients_first_fetch:false,
            waiting_clients_count:0,
            done_fetching_waiting_clients:true,
        }),
        incrementedClientsLimit : (state,{clients,newLimit})=>({
            ...state,
            clients :clients,
            clientsLimit: newLimit
        }),
        addedClient   : (state,{clients})=>({
            ...state,
            clients  ,
            clientsCount: clients.length,
            done_adding_client:true,
            client_adding_error:null
        }),
        addingClientFailed   : (state,client_adding_error)=>({
            ...state,
            done_adding_client:true,
            client_adding_error
        }),
        removedClient : (state,{clients})=>({
            ...state,
            clients :[...clients],
            clientsCount:clients.length,
            done_removing_client:true
        }),
        removingClientFailed : (state,clients)=>({
            ...state,
            done_removing_client:false
        }),
        updatedClient : (state,{clients})=>({
            ...state,
            clients :[...clients] 
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
    },
    effects: (dispatch)=>({
        fetchWaitingClients     : (args,state)=>fetchWaitingClients(args,state,dispatch),
        fetchClients     : (args,state)=>fetchClients(args,state,dispatch),
        selectClient     : (args,state)=>selectClient(args,state,dispatch),
        addClient        : (args,state)=>addClient(args,state,dispatch),
        updateClient     : (args,state)=>updateClient(args,state,dispatch),
        removeClient     : (args,state)=>removeClient(args,state,dispatch),
        updateClientsOrderInSector     : (args,state)=>updateClientsOrderInSector(args,state,dispatch),

        resetIsDone(field,state){
            dispatch.auth.reseted(field)
        }
    })
}
export default model