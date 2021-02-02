import {clientModel} from './Schemas/ClientModel'
import {sectorModel} from './Schemas/SectorModel'
import {sectorsList} from './Schemas/SectorsList'

import firestore from '@react-native-firebase/firestore'


const FETCH_LIMIT=10
const model ={
    state:{
        clients       :[],
        sectors       :[],
        todaysSectors :[], 
        firstClientsFetch:false,
        first_fetch:false,
        clientsAdded  : 0 , 
        sectorsCount  : 0 ,//to display in admin's dashboard
        clientsCount  : 0 ,//to display in admin's dashboard
        todaysSectorsCount :0, //to display in distrubutor's dashboard
        last_visible_client : null
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
        fetchedClients : (state,{clients,last_visible_client})=>({
            ...state,
            clients :[...clients],
            first_fetch:true,
            last_visible_client
        }),
        fetcheClientsFailed : (state,clients)=>({
            ...state,
    
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
        async fetchClientsCount(arg,state){
           try {
                const clientsResponse= await firestore().collection('clients').get()
                const count = clientsResponse.docs.length
                dispatch.client.fetchedClientsCount(count) 
           } catch (error) {
               console.log(error)
           }
        },
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
                const first_fetch = state.client.first_fetch
                if(first_fetch) return
    
                const clientsResponse= await firestore()
                                        .collection('clients')
                                        .orderBy('ref',"asc")
                                        .limit(FETCH_LIMIT)
                                        
                clientsResponse.onSnapshot(res=>{
                    if(res.docs){
                        const docs =res.docs
                        const clients = docs.map(doc=>({...doc.data(),id:doc.id}))
                        dispatch.client.fetchedClients({
                            clients,
                            last_visible_client : clients[clients.length-1].ref
                        })
                    }
                })
                

            } catch (error) {
                dispatch.client.fetcheClientsFailed()
                console.log(error)
            }
           
        },
        async addClientsList(args,state){
             try {
                const clientsList = [
                  clientModel('النجمي',1,'AB1','0654785421','زاوية الشيخ سيدي عتمان','Ouarzazate','prix1',3000.00),
                  clientModel('Moaud1',1,'AB2','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('smail',1,'AB3','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('mohamed',1,'AB4','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('souad',2,'AB5','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('mounir',2,'AB6','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('etmani',2,'AB7','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('mouad',3,'AB8','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('faycal',3,'AB9','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('ghafour',3,'AC1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('felix',3,'AC2','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('stephan',3,'AC3','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                  clientModel('malik',3,'AC4','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                ]
 
                
                var batch = firestore().batch()
                clientsList.forEach((doc) => {
                var docRef = firestore().collection("clients").doc(); //automatically generate unique id
                batch.set(docRef, doc);
                console.log('added clients list ')
            });
            batch.commit()
             } catch (error) {
                 console.log(error)
             }
        },
        async addClient({name,sectorId,ref,phone,address,city,price,objectif},state){
            try {
                const newClient = clientModel(name,sectorId,ref,phone,address,city,price,objectif)

               //firestore
               const addResponse= firestore().collection('clients').add(newClient)
              
               //redux
               const currentClients = [...state.client.clients]
               currentClients.unshift(newClient)
               dispatch.toast.show({
                   type:'success',
                   title:'Ajoute ',
                   message:`le client ${name} est ajouter avec success `
               })
               dispatch.client.addedClient(currentClients)
            } catch (error) {
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
            }
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