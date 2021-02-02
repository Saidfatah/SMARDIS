import {clientModel} from './Schemas/ClientModel'
import {sectorModel} from './Schemas/SectorModel'


import firestore from '@react-native-firebase/firestore'


const FETCH_LIMIT=10
const model ={
    state:{
        clients       :[],
        sectors       :[],
        todaysSectors :[], 
        selected_sector_Clients :[], 
        first_fetch:false,
        sectors_first_fetch:false,
        firstClientsFetch:false,
        clientsAdded  : 0 , 
        sectorsCount  : 0 ,//to display in admin's dashboard
        clientsCount  : 0 ,//to display in admin's dashboard
        todaysSectorsCount :0, //to display in distrubutor's dashboard
        last_visible_client : null,
        last_visited_sector : null,
        visited_Sector_has_clients:false,
    },
    reducers:{
        fetchedSectors : (state,sectors)=>({
            ...state,
            sectors :sectors ,
            sectors_first_fetch:true,
        }),
        fetchedSectorClients : (state,{selected_sector_Clients,last_visited_sector,visited_Sector_has_clients})=>({
            ...state,
            selected_sector_Clients ,
            last_visited_sector,
            visited_Sector_has_clients
        }),
        sectorsFetchFailed : (state,sectors)=>({
            ...state,
            //something
        }),
        fetchedSectorsCount : (state,sectorsCount)=>({
            ...state,
            sectorsCount 
        }),
        addedSector  : (state,sectors)=>({
            ...state,
            sectors :[...sectors],
            sectorsCount: state.sectorsCount+1
        }),
        sectorAddFailed  : (state,sectors)=>({
            ...state,
            //set something 
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

   
        async fetchSectorsCount(arg,state){
            try {
                const sectorsResponse= await firestore().collection('sectors').get()
                const count = sectorsResponse.docs.length
                dispatch.client.fetchedSectorsCount(count) 
            } catch (error) {
                console.log(error)
            }
        },
        async fetchSectors(arg,state){
             try {
                const sectors_first_fetch = state.client.sectors_first_fetch
                if(sectors_first_fetch) return

                const clientsResponse= await firestore().collection('sectors')
                clientsResponse.onSnapshot(res=>{
                    const docs =res.docs
                    const sectors = docs.map(doc=>({...doc.data(),id:doc.id}))
                    dispatch.client.fetchedSectors(sectors)
                     
                })
                } catch (error) {
                 console.log(error)
                 dispatch.client.sectorsFetchFailed()
             }

        },
        async fetchSectorClients(id,state){
             try {
                 //if we revist sector we don't need to refetch the clients 
                 //cause they are stiil in memory
                 //we could make an array with keys being sectors ids and clients field where westore clients
                 //and we can check if array has an item with key id if so don't fetch 
                 //if not fetch and add item with key id and values clients 

                const last_visited_sector = state.client.last_visited_sector
                
                if(last_visited_sector == id) return

                const SectorClientsResponse= await firestore().collection('clients').where('sectorId','==',id).get()
                const docs =SectorClientsResponse.docs
                const clients = docs.map(doc=>({...doc.data(),id:doc.id}))
                if(clients.length>0){
                   dispatch.client.fetchedSectorClients({
                       selected_sector_Clients:clients,
                       last_visited_sector : id,
                       visited_Sector_has_clients:true
                   })
                }else{
                    dispatch.client.fetchedSectorClients({
                        selected_sector_Clients:[],
                        last_visited_sector : id,
                        visited_Sector_has_clients:false
                    })
                }
                 
                } catch (error) {
                 console.log(error)
                 dispatch.client.sectorsFetchFailed()
             }

        },
        async addSector({name,city,navigation},state){
            try {
                 const sector = sectorModel(name,city)
                 let sectors =[...state.client.sectors]

                 const newSector = sectorModel(name,city)
                 //firestore
                 const addResponse= await firestore().collection('sectors').add(newSector)
                 
                 //asign doc id then add to redux state
                 sector.id = addResponse.id
                 sectors.unshift(sector)

                 dispatch.toast.show({
                     type    : 'success',
                     title   : 'Ajoute ',
                     message : `le sector ${name} est ajouter avec success `
                 })
                 dispatch.client.addedSector(sectors)
                 navigation.goBack()
            } catch (error) {
                dispatch.client.sectorAddFailed()
               console.log(error) 
            }
        },
        async updateSector({name,id,city,navigation},state){
            try {
                 let sectors =[...state.client.sectors]
                 const tragetSector = sectors.filter(sector =>sector.id == id)[0]
                 let targetSectorId =sectors.indexOf(tragetSector)
                 sectors[targetSectorId]= {...tragetSector,name,city}
                  
                 const updateResponse= await firestore()
                                             .collection("sectors")
                                             .doc(id)
                                             .update({name,city});
     
                 dispatch.toast.show({
                     type:'success',
                     title:'Modification ',
                     message:`le sector ${name} est modifier avec success `
                 })
                 dispatch.client.updatedSector(sectors)
                 navigation.navigate("ADMINsectors")
            } catch (error) {
                console.log(error)
            }
        },
        async addSectorsList(args,state){
            try {
               const sectorsList = [
                clientModel('Moaud1',"3USVNsvauVckZKU2qpZg",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('smail',"3USVNsvauVckZKU2qpZg",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('mohamed',"3USVNsvauVckZKU2qpZg",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('souad',"On9ZhtSx6phMkFmfejlm",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('mounir',"On9ZhtSx6phMkFmfejlm",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('etmani',"On9ZhtSx6phMkFmfejlm",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('mouad',"Qp2MogvwrFgzb2yJLaiV",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('faycal',"Qp2MogvwrFgzb2yJLaiV",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('ghafour',"Qp2MogvwrFgzb2yJLaiV",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('felix',"UBqdsSN13n6iFQDCSrbo",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('stephan',"UBqdsSN13n6iFQDCSrbo",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00),
                clientModel('malik',"i445TLusEfNgD2nJhhOS",'AB1','0654785421','Hmam ahbass','Ouarzazate','prix1',3000.00)
             ]

                      
                   
                    
                    var batch = firestore().batch()
                    sectorsList.forEach((doc) => {
                    var docRef = firestore().collection("clients").doc(); //automatically generate unique id
                    batch.set(docRef, doc);
                    });
                console.log('added clients list ')  
                batch.commit()
            } catch (error) {
                console.log(error)
            }
       },
    })
}
export default model