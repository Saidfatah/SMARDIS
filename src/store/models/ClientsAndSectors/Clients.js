//get clients List for each District (Secteur)
//get clients localization 
//set clients localization 
import {clientModel,sectorModel} from './DocumentModels'
import {clientsList, sectorsList} from './DcoumentLists'





const model ={
    state:{
        clients       :[],
        sectors       :[],
        todaysSectors :[], 
        firstClientsFetch:false,
        clientsLimit  : 6 , 
        clientsAdded  : 0 , 
        sectorsCount  : 0 ,//to display in admin's dashboard
        clientsCount  : 0 ,//to display in admin's dashboard
        todaysSectorsCount :0, //to display in distrubutor's dashboard
    },
    reducers:{
        fetchedSectors : (state,sectors)=>({
            ...state,
            sectors :sectors ,
            sectorsCount : sectors.length
        }),
        addedSector  : (state,sector)=>({
            ...state,
            sectors :[...state.sectors, sector],
            sectorsCount: state.sectorsCount+1
        }),
        updatedSector  : (state,sector)=>({
            ...state,
            sectors :[state.sectors].map(s=>s.id == sector.id ? sector:s)
        }),
        removedSector  : (state,sector)=>({
            ...state,
            sectors :[...state.sectors].filter(s=>!s.id==sector.id),
            sectorsCount: state.sectorsCount-1
        }),

        fetchedClientsCount : (state,clientsCount)=>({
            ...state,
            clientsCount 
        }),
        fetchedClients : (state,clients)=>({
            ...state,
            clients :[...clients],
            firstClientsFetch:true,
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
        }),
        removedClient : (state,client)=>({
            ...state,
            clients :[...state.clients].filter(c=>!c.id == client.id),
            clientsCount: state.clientsCount -1
        }),
        updatedClient : (state,client)=>({
            ...state,
            clients :[...state.clients].map(c=>c.id == client.id ?client : c)
        }),
    },
    effects: (dispatch)=>({
        fetchClientsCount(arg,state){
               const clientsCount= clientsList.length
               dispatch.client.fetchedClientsCount(clientsCount)
        },
        fetchMore(arg,state){
               const limit = state.client.clientsLimit 
               const clientsAdded = state.client.clientsAdded  
               const clients  = [ ...state.client.clients ]
               dispatch.client.incrementedClientsLimit({clients,newLimit:limit +8})
        },
        fetchClients(arg,state){
               const firstClientsFetch = state.client.firstClientsFetch
               if(!firstClientsFetch){
               const limit= state.client.clientsLimit
               const clients= [...clientsList]
               dispatch.client.fetchedClients(clients)
            }
        },
        addClient({name,sectorId,ref,phone,address,city,price,objectif},state){
            const newClient = clientModel( 
                 clientsList.length +1,
                 name,
                 sectorId,
                 ref,
                 phone,
                 address,
                 city,
                 price,
                 objectif
             )
            const currentClients = [...state.client.clients]
             currentClients.unshift(newClient)
            dispatch.client.addedClient(currentClients)
        },
        removeClient({client,admin},state){
            dispatch.client.removedClient(client)
        },
        updateClient(arg,state){

        },
        fetchClient(arg,state){

        },
        fetchSectors(arg,state){
            dispatch.client.fetchedSectors(sectorsList)
        },
        addSector({name,city,province},state){
            const sector = sectorModel(sectorsList.length +1 ,name,city,province)

        },
        updateSector(arg,state){

        },
        fetchSector(arg,state){

        },


 
    })
}
export default model