import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'

export default async (args,state,dispatch)=>{
    try {
          const {navigation,id,name,sectorId,phone,address,city,price,objectif,ref} = args
          const updatedFields= {
              name,
              sectorId,
              phone,
              address,
              city,
              price,
              ref,
              objectif:{
                  initial:objectif,
                  progress:-objectif,
                  last_mounth:new Date().getMonth()
              },
              confirmed:"VALIDATED"
             }
          let   clients =[...state.client.clients]
          const targetClient = clients.filter(client =>client.id == id)[0]
          let   targetClientIndex =clients.indexOf(targetClient)
          clients[targetClientIndex]= {...targetClient,...updatedFields} 

          const updateResponse= await firestore()
                                      .collection("clients")
                                      .doc(id)
                                      .update({...updatedFields});


             //update in cache from cache
             const day_of_creation =new Date().getDate()
             const cache={
              day_of_creation,
              clients
             }
             await  asyncStorage.setItem("CLIENTS",JSON.stringify(cache))

                                      
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
 }