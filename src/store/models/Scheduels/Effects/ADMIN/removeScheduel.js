import firestore from '@react-native-firebase/firestore'

export default async (args,state,dispatch)=>{
    try {
        const {id,navigation}=args
        const scheduels = [...state.scheduel.scheduels]
        const targetScheduel= scheduels.filter(scheduel=>scheduel.id == id)[0]
        const targetScheduelIndex= scheduels.indexOf(targetScheduel)
        scheduels.splice(targetScheduelIndex,1)

      const scheduelDeleteResponse = await firestore()
                                        .collection('scheduels')
                                        .doc(id)
                                        .delete()

        //get scheduel associated orders 
         const associatedOrdersResponse = await firestore()
                                           .collection('orders')
                                           .where('scheduleId','==',id)
                                           .get()

         const deletedOrdersCount = associatedOrdersResponse.docs.length
        
         //remove associated orders 
        //  const batch = firestore().batch;
         console.log({deletedOrdersCount})
         associatedOrdersResponse.docs.forEach((order)=>{
             order.ref.delete()
            //  batch().delete(ref);
         })
        //  console.log({bacthcount:batch.length})
        //  const delteBatchResponse= await batch().commit();

                                           
         dispatch.scheduel.removedScheduel({scheduels,deletedOrdersCount})
         dispatch.toast.show({
           type:'success',
           title:'Supprission ',
           message:`le trajet  est supprimer avec success `
          })
          navigation.goBack()
    } catch (error) {
           console.log('\n-----updateScheduel-----')
           console.log(error)
           dispatch.scheduel.scheduelRemovingFailed()
    }
}