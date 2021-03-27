import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'
//we call this after creating a ascheduel to save clients order for
//next scheduel creation 
const CONFIG_DOC="0000CONFIG0000"
export default async (args,state,dispatch)=>{
    try {
          const {clientsOrderd} = args
     
      
          clientsOrderd.forEach(async doc => {
              await firestore()
                    .collection("clients")
                    .doc(doc.id)
                    .update({
                        order_in_sector:doc.order
                    });
          });

          const clients_first_fetch = state.client.clients_first_fetch
          if(!clients_first_fetch){
              let   clients =[...state.client.clients]


              let index 
              clientsOrderd.forEach(client => {
                   const targetClient= clients.filter(c=>c.id === client.id)[0]
                   if(targetClient){
                        index=clients.indexOf(targetClient)
                        clients[index].order_in_sector =client.order
                    }
              });
          
              dispatch.client.updatedClient({clients})
       
              const cache={
                  mounth_of_creation: new Date().getMonth(),
                  clients
              }
              await  asyncStorage.setItem("CLIENTS",JSON.stringify(cache))
          }

    } catch (error) {
        console.log("update client order in sector")
        console.log(error)
    }
 }