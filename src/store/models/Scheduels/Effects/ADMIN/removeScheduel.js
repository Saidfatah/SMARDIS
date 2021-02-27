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

         //remove associated orders
         const associatedOrdersResponse = await firestore()
                                           .collection('scheduels')
                                           .where('scheduleId','==',id)
                                           .get()

         const deletedOrdersCount = associatedOrdersResponse.docs.length
         associatedOrdersResponse.docs.forEach((order)=>{
             order.ref.delete()
         })
                                           
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