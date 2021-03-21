import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'

export default async (args,state,dispatch)=>{
    try {
        const validated_orders=state.scheduel.valide_orders

        if(validated_orders.length){

            dispatch.scheduel.setedExportationState("STARTED")

            //RESET VALDIATED ORDERS TO [] AND UNSBSCRIBE FROM THE ONSNAPSHOT CALL
            dispatch.scheduel.fetchTodaysValideOrdersFAILED()
            const validated_commands_ref= state.scheduel.validated_commands_ref
            if(validated_commands_ref != null){
                console.log('export unsubscribe from validated_commands_ref')
                validated_commands_ref()
            }
            await asyncStorage.removeItem('VALIDATED_TEMPORARY') 

            //SET VALIDATED ORDERS TO EXPORTED
            validated_orders.forEach(async(order)=>{
                await firestore()
                      .collection('orders')
                      .doc(order.id)
                      .update({
                          status:'EXPORTED'
                      })
            });

            
            //REFECTH VALDIATED ORDERS
            dispatch.scheduel.setedExportationState("FINISHED")
            dispatch.scheduel.fetchAdminValidatedOrders()
        }
     
    
       } catch (error) {
        console.log('\n-----exportOrders-----')
        console.log(error)
    }
 }