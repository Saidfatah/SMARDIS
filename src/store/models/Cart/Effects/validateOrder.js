import firestore from '@react-native-firebase/firestore'
import deleteCartFromASyncStorage from './deleteCartFromASyncStorage'
const CONFIG_DOC='1 - - CONFIG - -'
import asyncStorage from '@react-native-async-storage/async-storage'
import {Decimal} from 'decimal.js';

export default async (args,state,dispatch)=>{
    try {
        const {navigation} = args
         const cartItems= [...state.cart.cartItems]
         const guest= state.cart.guest
         const sector= state.cart.sector
         const scheduelId=state.cart.scheduelId
          
         if(cartItems.length>0){
        
              const orderId = guest.orderId 
              const client  = guest
              const total   = new Decimal(cartItems.reduce((a,c)=>a+(c.priceForClient * c.quantity),0))
              
             //set next client turn 
             dispatch.scheduel.setNextTurn()
          
          
             //get billref counter from fristore
             let billRefCounter 
             const orderConfig =state.scheduel.orderConfig
             if(orderConfig){
               billRefCounter=  orderConfig.counter
             }
         
             //generate billRef with BC000* inital
             const billRefCounterArrayed = (++billRefCounter).toString().split('')
             let   zeros     = new Array(6-billRefCounterArrayed.length).fill("0",0,6-billRefCounterArrayed.length)
             const billRef   = [...zeros,...billRefCounterArrayed].reduce((a,c)=>a+c,"BC")
   
             //update order doc ["VALIDATED"]
             const validateOrderReponse = await firestore()
              .collection('orders')
              .doc(orderId)
              .update({
                 products:[...cartItems.map(item=>{
                     delete item.orderId
                     delete item.client
                     return item 
                 })],
                 billRef,
                 total:total.toNumber(),
                 status: "VALIDATED",
                 sale_date : firestore.Timestamp.fromDate(new Date()), 
                 sale_hour : firestore.Timestamp.fromDate(new Date()),
               })
            


             //update clients' objectif progress
             const {objectif,id,name}=client
             const {last_mounth,progress,initial}= objectif
             const currentMount= new Date().getMonth()

             const clientsProges=new Decimal(progress)
             const progressCalculated= total.plus(clientsProges)
             const initialDecimal=new Decimal(initial)
             console.log({initialDecimal})
             console.log({progressCalculated})
             console.log({clientsProges})

             if(currentMount == last_mounth){
                 await firestore().collection('clients').doc(id).update({objectif:{
                     initial:initialDecimal.toNumber(),
                     progress:progressCalculated.toNumber() ,
                     last_mounth : new Date().getMonth()
                 }})
             }
             
             //check if this order is the last in teh scheduel
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
                          console.log({targetScheduelOrdersCount,todaysSectorsLength})
                 
                          if(todaysSectorsLength == 1){
                              
                              if(targetScheduelOrdersCount <1){
                                   await  asyncStorage.removeItem("TODAYS_ORDERS")
                                   dispatch.scheduel.removedOrderAfterValidating({todaysSectors:[]}) 
                              }else{

                                  todaysOrdersToCache[targetSectorIndex].orders=ordersFiltered
                                  //write to cache
                                  const day_of_creation =new Date().getDate()
                                  const cache={
                                   day_of_creation,
                                   todaysSectors:todaysOrdersToCache
                                  }
                                  await  asyncStorage.setItem("TODAYS_ORDERS",JSON.stringify(cache))
                                  dispatch.scheduel.removedOrderAfterValidating({todaysSectors:todaysOrdersToCache}) 
                            
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
                               todaysSectors:todaysOrdersToCache
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

             //increment billref counter in fristore , we waited until here to make sure the billRef get incremented
             //only if teh orders validation was successfull
            //   const increment = firestore.FieldValue.increment(1)
            //   await firestore()
                //    .collection('orders')
                //    .doc(CONFIG_DOC)
                //    .update({counter:increment})
                  
            
 
             //update distrubutor commits 
             const currentDistrubutorId = state.auth.distrubutorId
             const updateCommitsReponse = await firestore()
             .collection('users')
             .doc(currentDistrubutorId)
             .update({
                 commits:firestore.FieldValue.arrayUnion({
                     date : firestore.Timestamp.fromDate(new Date()),
                     billRef,
                     number_of_products: cartItems.length,
                     validated:"VALIDATED",
                     client:client.name,
                     sector:sector.name
                 })
             })
                         
            

             dispatch.toast.show({
                type:'success',
                title:'Validation ',
                message:`La command  est valider avec success `
             })
             dispatch.cart.validatedGuestOrder()
             deleteCartFromASyncStorage()
             navigation.navigate('DISTRIBUTORDashBoard')
         }
     } catch (error) {
         console.log("validate order cart")
         console.log(error)
         dispatch.cart.validatingGuestOrderFailed()
     }
 }