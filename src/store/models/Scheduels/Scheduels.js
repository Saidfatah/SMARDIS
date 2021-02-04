// orders sent by admin
// emploi du temp  
// get clients List for each District (Secteur)
import {orderModel} from './Schemas/OrderModel'
import {scheduleModel} from './Schemas/ScheduelModel'
import firestore from '@react-native-firebase/firestore'


const model ={
    state:{
        scheduels  :[],
        orders     :[],
        scheduelsCount : 0 ,
        ordersCount : 0 ,
        validatedOrdersCount : 0 ,
        todaysSalesCount : 0 ,
        distrubutor_todays_valide_orders_count : 0 ,
        distrubutor_todays_canceled_orders_count : 0 ,
        todaysSectorsCount :0, //to display in distrubutor's dashboard
        todaysSectors :[], 
        distrubutor_todays_valide_orders :[], 
        distrubutor_todays_canceled_orders :[], 
        currentTurn   : null ,
        todays_orders_first_fetch:false,
        todaysSales:false,
        selectedBill : null ,
        currentSector : null,
        currentSectorIndex : 0,
    },
    reducers:{
        fetchedScheduels : (state,scheduels)=>({
            ...state,
            scheduels ,
            scheduelsCount: scheduels.length
        }),
        fetchedOrders : (state,orders)=>({
            ...state,
            orders ,
            validatedOrdersCount:orders?.filter(o=>o.status =="VALIDATED").length,
            ordersCount: orders.length
        }),
        fetchedDistrubutorTodaysValideOrders : (state,orders)=>({
            ...state,
            distrubutor_todays_valide_orders :orders,
            distrubutor_todays_valide_orders_count :orders.length
        }),
        fetchedDistrubutorTodaysCanceledOrders : (state,orders)=>({
            ...state,
            distrubutor_todays_canceled_orders :orders,
            distrubutor_todays_canceled_orders_count :orders.length
        }),
        addedScheduel  : (state,{scheduels,addedOrdersCount})=>({
            ...state,
            scheduels ,
            scheduelsCount : state.scheduelsCount +1,
            ordersCount : state.scheduelsCount +addedOrdersCount,
        }),
        updatedScheduel  : (state,scheduels)=>({
            ...state,
            scheduels 
        }),
        removedScheduel  : (state,{scheduels,deletedOrdersCount})=>({
            ...state,
            scheduels ,
            scheduelsCount : state.scheduelsCount -1,
            ordersCount : state.scheduelsCount -deletedOrdersCount
        }),
        fetchedTodaysSectors : (state,todaysSectors)=>({
            ...state,
            todaysSectors :[...todaysSectors],
            todaysSectorsCount :todaysSectors.length,
            currentTurn   :todaysSectors[0].orders[0].turn || 0,
            currentSector : todaysSectors[0].sector.id,
            todays_orders_first_fetch:true,
            currentSectorIndex:0
        }),
        fetchedTodaysSales : (state,todaysSales)=>({
            ...state,
            todaysSales,
            todaysSalesCount:todaysSales.length
        }),
        setedNextTurn : (state,{currentSector,currentTurn,currentSectorIndex})=>({
            ...state,
            currentTurn   ,
            currentSector ,
        }),
        selectedABill : (state,selectedBill)=>({
            ...state,
            selectedBill 
        }),
    },
    effects: (dispatch)=>({
        async fetchTodaysSales(arg,state){
            try {
                const fetchOrdersReponse = await firestore()
                                                .collection('orders')
                                                .where('status','==',"VALIDATED")
                                

                 fetchOrdersReponse.onSnapshot(res=>{
                     if(res.docs){
                         const orders=res.docs.map(order=>({...order.data(),id:order.id}))
                         //loop over each order product 
                            //a sale is each sold product
                          let sales= []
                          orders.forEach((order,index)=>{
                              const {billRef,sector,distrubutor,client,sale_date,sale_hour}=order
                               order.products.forEach(product => {
                                //  const total = product.quantity * product[client.price.replace('x','ce')]
                                 const total = product.quantity * product.price1
                                 const sale= {
                                    billRef,
                                    sector,
                                    distrubutor,
                                    client,
                                    product,
                                    sale_date:sale_date.toDate(),
                                    sale_hour:sale_hour.toDate(),
                                    quantity:product.quantity,
                                    total  
                                 }
                                 sales.push(sale)
                               });
                          })
                          dispatch.scheduel.fetchedTodaysSales(sales)
                     }
                 })
                 
                
            } catch (error) {
                console.log(error)
            }
        },
        async fetchTodaysSectors(arg,state){
            try {
                const todays_orders_first_fetch= state.scheduel.todays_orders_first_fetch
                if(todays_orders_first_fetch) return 

                const currentDistrubutorId = state.auth.distrubutorId

                const fetchOrdersReponse = await firestore()
                      .collection('orders')
                      .where('distrubutorId','==',currentDistrubutorId)
                      .where('status','==','PENDING')
    
                fetchOrdersReponse.onSnapshot(res=>{
                    const docs= res.docs
                 
                    if(docs && docs.length){
                         const orderList = docs.map(doc=>({...doc.data(),orderId:doc.id}))
                         let lastOrder= orderList[0]
                         const firstOrder ={...lastOrder}
                         let started = false
                         let i = 0
                         const todaysOrders=orderList.reduce((a,currentOrder)=>{
                              const arr= [...a]
                              
                              if(!started){
                                   let obj={
                                       sector:lastOrder.sector,
                                       scheduleId:lastOrder.scheduleId,
                                       orders:[{
                                           ...lastOrder,     
                                       }]
                                   }
                                   arr.push(obj)
                                  started=true
                              }
                         
                              if(lastOrder.sectorId == currentOrder.sectorId && firstOrder.orderId != currentOrder.orderId){
                                 arr[i].orders.push({...currentOrder})
                              }
                              else if(lastOrder.sectorId != currentOrder.sectorId && started){
                                  console.log('new sector'+currentOrder.sectorId)
                                let obj={
                                    sector:currentOrder.sector,
                                    scheduleId:currentOrder.scheduleId,
                                    orders:[{...currentOrder}]
                                }
                                arr.push(obj)
                                  i++
                              }
                         
                              lastOrder={...currentOrder}
                         
                              return arr
                         }
                         ,[]) 
                        
                         dispatch.scheduel.fetchedTodaysSectors(todaysOrders)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        async fetchOrders(arg,state){
             try {
                const fetchOrdersReponse = await firestore()
                                                 .collection('orders')
      
                fetchOrdersReponse.onSnapshot(res=>{
                    if(res.docs){
                        const orders=res.docs.map(order=>({
                            ...order.data(),
                            id:order.id,
                            sale_date:order.data().sale_date.toDate(),
                            sale_hour:order.data().sale_hour.toDate(),
                        }))
                        dispatch.scheduel.fetchedOrders(orders)
                    }
                })
                 
             } catch (error) {
                 console.log('-----fetchOrders-----')
                 console.log(error)
             }
        },
        async fetchDistrubutorTodaysValideOrders(arg,state){
             try {
                const currentDistrubutorId = state.auth.distrubutorId

                const fetchOrdersReponse = await firestore()
                      .collection('orders')
                      .where('distrubutorId','==',currentDistrubutorId)
                      .where('status','==','VALIDATED')

      
                fetchOrdersReponse.onSnapshot(res=>{
                    if(res.docs){
                        const orders=res.docs.map(order=>({
                            ...order.data(),
                            id:order.id,
                            sale_date:order.data().sale_date.toDate(),
                            sale_hour:order.data().sale_hour.toDate(),
                        }))

                        dispatch.scheduel.fetchedDistrubutorTodaysValideOrders(orders)
                    }
                })
                 
             } catch (error) {
                 console.log('-----fetchOrders-----')
                 console.log(error)
             }
        },
        async fetchDistrubutorTodaysCanceledOrders(arg,state){
             try {
                const currentDistrubutorId = state.auth.distrubutorId

                const fetchOrdersReponse = await firestore()
                      .collection('orders')
                      .where('distrubutorId','==',currentDistrubutorId)
                      .where('status','==','CANCELED')

      
                fetchOrdersReponse.onSnapshot(res=>{
                    if(res.docs){
                        const orders=res.docs.map(order=>({
                            ...order.data(),
                            id:order.id,
                            sale_date:order.data().sale_date.toDate(),
                            sale_hour:order.data().sale_hour.toDate(),
                        }))

                        dispatch.scheduel.fetchedDistrubutorTodaysCanceledOrders(orders)
                    }
                })
                 
             } catch (error) {
                 console.log('-----fetchOrders-----')
                 console.log(error)
             }
        },
        async resetOrder(id,state){
             try {
                const resetOrderReponse = await firestore()
                      .collection('orders')
                      .doc(id)
                      .update({
                          status:'PENDING'
                      })
               console.log('resetedOrder')
                 
             } catch (error) {
                 console.log('-----resetOrder-----')
                 console.log(error)
             }
        },
        selectBill({id,distrubutor},state){
            let selectedBil =null
            if(distrubutor){
                //calling from distrubutor Interface  
                const todaysBills = [...state.scheduel.distrubutor_todays_valide_orders]
                selectedBil = todaysBills.filter(b=>b.id == id)[0]
                
                   
            }else{
               //calling from admin iterface
               const todaysBills = [...state.scheduel.orders]
               selectedBil = todaysBills.filter(b=>b.id == id)[0]
            }
            dispatch.scheduel.selectedABill(selectedBil)
        },

        async fetchScheduels(arg,state){
            try {
                const fetchScheduelsReponse = await firestore()
                                                .collection('scheduels')

                 fetchScheduelsReponse.onSnapshot(res=>{
                 if(res.docs){
                      const scheduels=res.docs.map(order=>({
                          ...order.data(),
                          id:order.id,
                          date:order.data().date.toDate()
                        }))
                      dispatch.scheduel.fetchedScheduels(scheduels)
                 }
                 })
                
            } catch (error) {
                console.log('-----fetchScheduels-----')
                console.log(error)
            }             
        },
        async addScheduel({distrubutor,distination},state){
           try {
                
                const admin = state.auth.user 
                //create scheduel doc 
                const newSchedule = scheduleModel( admin, distrubutor, distination )
                const scheduelAddResponse = await firestore()
                                                  .collection('scheduels')
                                                  .add(newSchedule)
                newSchedule.id=scheduelAddResponse.id

                const scheduelOrders=[]
                
                //map schduel clients to individual orders and add them to orders collection
                const addedOrdersCount=distination.clients.length
                distination.clients.forEach((client,index)=>{
                    const order= orderModel(
                        scheduelAddResponse.id,
                        client,
                        distination.sector,
                        distrubutor,
                        index
                        )
                    scheduelOrders.push(order)
                })
                
                if(scheduelOrders.length>0){
                     var batch = firestore().batch()
                     scheduelOrders.forEach((doc) => {
                         var docRef = firestore().collection("orders").doc(); 
                         batch.set(docRef, doc);
                     });
                     console.log('added orders list ')  
                     batch.commit()
                }

                const scheduels= [...state.scheduel.scheduels]
                scheduels.push(newSchedule)
                dispatch.scheduel.addedScheduel({scheduels,addedOrdersCount})
           } catch (error) {
               console.log('------[addOrder]------')
               console.log(error)
           }
        },
        async updateScheduel({id,distination,distrubutor},state){
         try {
             const scheduels = [...state.scheduel.scheduels]
             const targetScheduel= scheduels.filter(scheduel=>scheduel.id == id)[0]
             const targetScheduelIndex= scheduels.indexOf(targetScheduel)
             scheduels[targetScheduelIndex] = {...targetScheduel,distination,distrubutor}

              const scheduelUpdateResponse = await firestore()
                                                .collection('scheduels')
                                                .doc(id)
                                                .update({distination,distrubutor})

              //update associated orders [turn]
              const associatedOrdersResponse = await firestore()
                                                .collection('scheduels')
                                                .where('scheduleId','==',id)
                                                .get()
              
              //map distination.clients into [{d,turn}] array
              const idTurn = distination.clients.map((cl,index)=>({id:cl.id,turn:index}))                                  
              associatedOrdersResponse.docs.forEach((order)=>{
                  const turn = idTurn.filter(cl=>cl.id==order.id)[0].turn
                  order.ref.update({turn})
              })
                                                

              dispatch.scheduel.updatedScheduel(scheduels)
         } catch (error) {
             console.log('-----updateScheduel-----')
             console.log(error)
         }
        },
        async removeScheduel(id,state){
         try {
             const scheduels = [...state.scheduel.scheduels]
             const targetScheduel= scheduels.filter(scheduel=>scheduel.id == id)[0]
             const targetScheduelIndex= scheduels.indexOf(targetScheduel)
             scheduels[targetScheduelIndex] = {...targetScheduel,distination,distrubutor}

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
         } catch (error) {
             console.log('-----updateScheduel-----')
             console.log(error)
         }
        },

        setNextTurn(args,state){
             try {
                let currentTurn=state.scheduel.currentTurn
                let currentSector=state.scheduel.currentSector
          
                const todaysSectors = [...state.scheduel.todaysSectors]
                const currentSectorObj= todaysSectors.filter(sector=>sector.sector.id == currentSector)[0]
                const currentSectorIndex= todaysSectors.indexOf(currentSectorObj)
   
                //check if these is a client left in sector 
                const clientLeft = currentSectorObj.orders.filter(order=>order.turn > currentTurn)[0]
                if(clientLeft){
                    currentTurn=clientLeft.turn
                }else{
                   currentTurn = 0
                   currentSector = todaysSectors[currentSectorIndex+1].sector.id
                   currentSectorIndex++
                }
   
                dispatch.scheduel.setedNextTurn({currentSector,currentTurn,currentSectorIndex})
             } catch (error) {
                 
                 console.log("set next item :")
                 console.log(error)
             }
        },
        async cancelOrder({orderId,note,navigation},state){
            try {
                console.log({orderId,note})
                const validateOrderReponse = await firestore()
                                                  .collection('orders')
                                                  .doc(orderId)
                                                  .update({
                                                        note,
                                                        status: "CANCELED",
                                                   })
             
                dispatch.scheduel.setNextTurn()
                navigation.goBack()
             } catch (error) {
                 
                 console.log("set next item :")
                 console.log(error)
             }
        },
    })
}
export default model