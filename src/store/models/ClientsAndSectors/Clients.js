import {clientModel} from './Schemas/ClientModel'
import {sectorModel} from './Schemas/SectorModel'
import {clientsList} from './Schemas/ClientsList'
import {sectorsList} from './Schemas/SectorsList'




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
        addedSector  : (state,sectors)=>({
            ...state,
            sectors :[...sectors],
            sectorsCount: state.sectorsCount+1
        }),
        updatedSector  : (state,sectors)=>({
            ...state,
            sectors :[...sectors]
            // sectors :[state.sectors].map(s=>s.id == sector.id ? sector:s)
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
        removedClient : (state,clients)=>({
            ...state,
            clients :[...clients],
            clientsCount: state.clientsCount -1
        }),
        updatedClient : (state,clients)=>({
            ...state,
            clients :[...clients] 
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
            dispatch.toast.show({
                type:'success',
                title:'Ajoute ',
                message:`le client ${name} est ajouter avec success `
            })
            dispatch.client.addedClient(currentClients)
        },
        updateClient({navigation,id,updatedFields,name,sectorId,ref,phone,address,city,price,objectif},state){
            console.log({updatedFields})
            const updtaedFiels= {name,sectorId,ref,phone,address,city,price,objectif}
            let   clients =[...state.client.clients]
            const targetClient = clients.filter(client =>client.id == id)[0]
            let   targetClientId =clients.indexOf(targetClient)
            clients[targetClientId]= {...targetClient,...updtaedFiels} 

            dispatch.toast.show({
                type:'success',
                title:'Ajoute ',
                message:`le client ${name} est Modifier avec success `
            })
            dispatch.client.updatedClient(clients)
            navigation.navigate('ADMINclients')
        },
        removeClient({client,admin},state){
            let clients = state.client.clients
            const newclients= clients.filter(cl => cl.id != client.id) 
            dispatch.toast.show({
                type:'success',
                title:'Supprission success',
                message:`client ${client.name} est supprimer avec success`
            })
            dispatch.client.removedClient(newclients)
        },

   

        fetchSectors(arg,state){
            dispatch.client.fetchedSectors(sectorsList)
        },
        addSector({name,city},state){
            const sector = sectorModel(sectorsList.length +1 ,name,city)
            let sectors =[...state.client.sectors]
            sectors.unshift(sector)
            dispatch.toast.show({
                type    : 'success',
                title   : 'Ajoute ',
                message : `le sector ${name} est ajouter avec success `
            })
            dispatch.client.addedSector(sectors)
            //add sector to sectors collection 
        },
        updateSector({name,id,city,navigation},state){
            let sectors =[...state.client.sectors]
            const tragetSector = sectors.filter(sector =>sector.id == id)[0]
            let targetSectorId =sectors.indexOf(tragetSector)
            sectors[targetSectorId]= {...tragetSector,name,city} 
            dispatch.toast.show({
                type:'success',
                title:'Modification ',
                message:`le sector ${name} est modifier avec success `
            })
            dispatch.client.updatedSector(sectors)
        }
    })
}
export default model