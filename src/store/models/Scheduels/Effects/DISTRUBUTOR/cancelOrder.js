import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'

export default  async (args,state,dispatch)=>{
    try {
        const {orderId,note,navigation,scheduelId}=args

        const validateOrderReponse = await firestore()
                                          .collection('orders')
                                          .doc(orderId)
                                          .update({
                                                note,
                                                status: "CANCELED",
                                           })

        let todaysSectors= [...state.scheduel.todaysSectors]
        const todaysSectorsLength = todaysSectors.length

        
    
        if(todaysSectorsLength>0){
            const targetSector=todaysSectors.filter(ts=>ts.scheduleId == scheduelId )[0]
            const targetSectorIndex=todaysSectors.indexOf(targetSector)
            const orders= targetSector.orders
       
             if(orders.length>0){
                 const targetOrder= orders.filter(o=>o.orderId == orderId)[0]
                
                 if(targetOrder){
                     //remove order from todays orders in cache 
                     let todaysOrdersToCache= [...todaysSectors]
                     let ordersFiltered = [...todaysOrdersToCache[targetSectorIndex].orders].filter(o=>o.orderId != orderId)
                     
                     const targetScheduelOrdersCount=ordersFiltered.length
            
                     if(todaysSectorsLength == 1){
                         
                         if(targetScheduelOrdersCount <1){
                              await  asyncStorage.removeItem("TODAYS_ORDERS")
                              dispatch.scheduel.removedOrderAfterValidating({todaysSectors:[]}) 
                         }else{
                             todaysOrdersToCache[targetSectorIndex].orders=ordersFiltered
                             //set state 
                            dispatch.scheduel.removedOrderAfterValidating({todaysSectors:todaysOrdersToCache}) 
                             //write to cache
                             const day_of_creation =new Date().getDate()
                             const cache={
                              day_of_creation,
                              todaysSectors:todaysOrdersToCache
                             }
                              
                          
                             await  asyncStorage.setItem("TODAYS_ORDERS",JSON.stringify(cache))
                             const res =await  asyncStorage.getItem("TODAYS_ORDERS")
                       
                         }   
                     }else if(todaysSectorsLength >= 1){
                         if(targetScheduelOrdersCount <1){
                             todaysOrdersToCache.splice(targetSectorIndex,1)
                         }else{
                             todaysOrdersToCache[targetSectorIndex].orders=ordersFiltered
                         }
       
                         //write to cache
                         const day_of_creation =new Date().getDate()
                         const cache={
                          day_of_creation,
                          todaysOrders:todaysOrdersToCache
                         }
                         await  asyncStorage.setItem("TODAYS_ORDERS",JSON.stringify(cache))
                         dispatch.scheduel.removedOrderAfterValidating({todaysSectors:todaysOrdersToCache}) 
                   
                     }       
       
                     const is_last_in_scheduel =targetOrder.is_last_in_scheduel
                     
                     if(is_last_in_scheduel){
                       //  write to cache delete cache 
                        await  asyncStorage.removeItem("TODAYS_ORDERS")
       
                        await firestore()
                        .collection('scheduels')
                        .doc(scheduelId)
                        .update({
                            status:"VALIDATED"
                        })
                     }
                 }
             }
        }
     
       dispatch.scheduel.setNextTurn()
        navigation.goBack()
     } catch (error) {
         console.log("set next item :")
         console.log(error)
         dispatch.scheduel.cancelOrderFailed()
     }
}