
export default (arg,state,dispatch)=>{
    try {
        const waiting_clients_first_fetch = state.client.waiting_clients_first_fetch
        if(waiting_clients_first_fetch) return
        
        const clients = [...state.client.clients]
        console.log(clients.map(c=>c.name))
        const waitingClinets=clients.filter(c=>c.confirmed != "VALIDATED" )
          console.log({waitingClinets})
        if(waitingClinets.length>0){
            return dispatch.client.fetchedWaitingClients(waitingClinets)
        }   

        dispatch.client.fetcheWaitingClientsFailed()              

    } catch (error) {
        dispatch.client.fetcheWaitingClientsFailed()
        console.log(error)
    }
   
}