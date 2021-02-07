import {sectorModel} from './Schemas/SectorModel'


import firestore from '@react-native-firebase/firestore'



const model ={
    state:{
        sectors       :[],
        todaysSectors :[], 
        selected_sector_Clients :[], 
        sectorsCount  : 0 ,//to display in admin's dashboard
        todaysSectorsCount :0, //to display in distrubutor's dashboard
        last_visited_sector : null,
        sectors_first_fetch:false,
        visited_Sector_has_clients:false,
        done_fetching_sectors:false,
    },
    reducers:{
        fetchedSectors : (state,sectors)=>({
            ...state,
            sectors :sectors ,
            done_fetching_sectors:true,
            sectorsCount:sectors.length
        }),
        fetchedSectorClients : (state,{selected_sector_Clients,last_visited_sector,visited_Sector_has_clients})=>({
            ...state,
            selected_sector_Clients ,
            last_visited_sector,
            visited_Sector_has_clients
        }),
        sectorsFetchFailed : (state,sectors)=>({
            ...state,
            done_fetching_sectors:true
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
    },
    effects: (dispatch)=>({
        async fetchSectors(arg,state){
             try {
                const sectors_first_fetch = state.sector.sectors_first_fetch
                if(sectors_first_fetch) return

                const clientsResponse= await firestore().collection('sectors')
                clientsResponse.onSnapshot(res=>{
                    const docs =res.docs
                    const sectors = docs.map(doc=>({...doc.data(),id:doc.id}))
                    dispatch.sector.fetchedSectors(sectors)
                     
                })
                } catch (error) {
                 console.log(error)
                 dispatch.sector.sectorsFetchFailed()
             }

        },
        async fetchSectorClients(id,state){
             try {
                 //if we revist sector we don't need to refetch the clients 
                 //cause they are stiil in memory
                 //we could make an array with keys being sectors ids and clients field where westore clients
                 //and we can check if array has an item with key id if so don't fetch 
                 //if not fetch and add item with key id and values clients 

                const last_visited_sector = state.sector.last_visited_sector
                
                if(last_visited_sector == id) return

                const SectorClientsResponse= await firestore().collection('clients').where('sectorId','==',id).get()
                const docs =SectorClientsResponse.docs
                const clients = docs.map(doc=>({...doc.data(),id:doc.id}))
                if(clients.length>0){
                   dispatch.sector.fetchedSectorClients({
                       selected_sector_Clients:clients,
                       last_visited_sector : id,
                       visited_Sector_has_clients:true
                   })
                }else{
                    dispatch.sector.fetchedSectorClients({
                        selected_sector_Clients:[],
                        last_visited_sector : id,
                        visited_Sector_has_clients:false
                    })
                }
                 
                } catch (error) {
                 console.log(error)
                 dispatch.sector.sectorsFetchFailed()
             }

        },
        async addSector({name,city,navigation},state){
            try {
                 const sector = sectorModel(name,city)
                 let sectors =[...state.sector.sectors]

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
                 dispatch.sector.addedSector(sectors)
                 navigation.goBack()
            } catch (error) {
                dispatch.sector.sectorAddFailed()
               console.log(error) 
            }
        },
        async updateSector({name,id,city,navigation},state){
            try {
                 let sectors =[...state.sector.sectors]
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
                 dispatch.sector.updatedSector(sectors)
                 navigation.navigate("ADMINsectors")
            } catch (error) {
                console.log(error)
            }
        }
    })
}
export default model