import fetchWaitingClients from  './Effects/fetchWaitingClients'
import fetchMoreClients  from  './Effects/fetchMoreClients'
import fetchClients  from  './Effects/fetchClients'
import addClient     from   './Effects/addClient'
import updateClient  from  './Effects/updateClient'
import removeClient  from  './Effects/removeClient'
import updateClientsOrderInSector  from  './Effects/updateClientsOrderInSector'

const model ={
    state:{
        clients       :[],
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
            last_visible_client,
            waiting_clients :[...clients].filter(c=>c.confirmed != "VALIDATED"),
            waiting_clients_first_fetch:true,
            done_fetching_waiting_clients:true,
            waiting_clients_count:[...clients].filter(c=>c.confirmed != "VALIDATED").length
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
        addedClient   : (state,clients)=>({
            ...state,
            clients  ,
            clientsCount: state.clientsCount +1,
            done_adding_client:true,
            client_adding_error:null
        }),
        addingClientFailed   : (state,client_adding_error)=>({
            ...state,
            done_adding_client:true,
            client_adding_error
        }),
        removedClient : (state,clients)=>({
            ...state,
            clients :[...clients],
            clientsCount:state.clientsCount >= 1? state.clientsCount -1:0,
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
        fetchWaitingClients     : (args,state)=>fetchWaitingClients(args,state,dispatch),
        fetchMoreClients : (args,state)=>fetchMoreClients(args,state,dispatch),
        fetchClients     : (args,state)=>fetchClients(args,state,dispatch),
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