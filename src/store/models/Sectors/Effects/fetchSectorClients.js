import firestore from '@react-native-firebase/firestore'

export default async (id,state,dispatch)=>{
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
}