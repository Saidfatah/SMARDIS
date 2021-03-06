import firestore from '@react-native-firebase/firestore'


export default async (args,state,dispatch)=>{
    try {
        console.log('exported')
        const validated_orders=state.scheduel.valide_orders

        if(validated_orders.length){
            validated_orders.forEach(async(order)=>{
                await firestore()
                      .collection('orders')
                      .doc(order.id)
                      .update({
                          status:'EXPORTED'
                      })
            });
        }
     
    
       } catch (error) {
        console.log('\n-----exportOrders-----')
        dispatch.scheduel.updatingScheduelFailed()
        console.log(error)
    }
 }