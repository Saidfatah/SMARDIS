import firestore from '@react-native-firebase/firestore'

const CONFIG_DOC="0000CONFIG0000"
export default async (arg,state,dispatch)=>{
    try {
        const last_visible_client = state.client.last_visible_client

        const moreClientsResponse= await firestore()
                                .collection('clients')
                                .orderBy('ref',"asc")
                                .startAt(last_visible_client)
                                .limit(FETCH_LIMIT)
                                 
                                
        moreClientsResponse.onSnapshot(res=>{
            if(res.docs.length){
                const docs =res.docs
                const PrevClients =  [...state.client.clients]
                PrevClients.pop()
                const maped_data  =  docs.map(doc=>({...doc.data(),id:doc.id}))
                const newClients  =  maped_data.filter(nclient=> nclient.id != CONFIG_DOC)
               
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
    
}