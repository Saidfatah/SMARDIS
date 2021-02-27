import firestore from '@react-native-firebase/firestore'


export default async (args,state,dispatch)=>{
    try {
        const {id,distination,distrubutor,start_date,navigation}=args
        const scheduels = [...state.scheduel.scheduels]
        const targetScheduel= scheduels.filter(scheduel=>scheduel.id == id)[0]
        const targetScheduelIndex= scheduels.indexOf(targetScheduel)
        scheduels[targetScheduelIndex] = {...targetScheduel,distination,distrubutor}

         const scheduelUpdateResponse = await firestore()
                                           .collection('scheduels')
                                           .doc(id)
                                           .update({
                                               distination,
                                               distrubutor,
                                               start_date:firestore.Timestamp.fromDate(new Date(start_date))
                                           })

         //update associated orders [turn]
         const associatedOrdersResponse = await firestore()
                                           .collection('orders')
                                           .where('scheduleId','==',id)
                                           .get()
         
         //map distination.clients into [{d,turn}] array
         const idTurn = distination.clients.map((cl,index)=>({id:cl.id,turn:index}))                                  
         if(associatedOrdersResponse.docs.length){
           associatedOrdersResponse.docs.forEach((order)=>{
               const turn = idTurn.filter(cl=>cl.id==order.data().client.id)[0].turn
               order.ref.update({ 
                   turn,
                   created_at:firestore.Timestamp.fromDate(new Date(start_date)),
                   start_date:firestore.Timestamp.fromDate(new Date(start_date)),
               })
           })
         }

         dispatch.scheduel.updatedScheduel(scheduels)
         dispatch.toast.show({
           type:'success',
           title:'Modification ',
           message:`le trajet  est modifier avec success `
          })
          navigation.goBack()
       } catch (error) {
        console.log('\n-----updateScheduel-----')
        dispatch.scheduel.updatingScheduelFailed()
        console.log(error)
    }
   }