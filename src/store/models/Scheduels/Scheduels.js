// orders sent by admin
// emploi du temp  
// get clients List for each District (Secteur)
import {orderModel} from './Schemas/OrderModel'
import {scheduleModel} from './Schemas/ScheduelModel'
import firestore from '@react-native-firebase/firestore'


const model ={
    state:{
        //arrays
        scheduels  :[],
        orders     :[],
        todaysSales:[],
        todaysSectors :[], 
        valide_orders :[], 
        distrubutor_todays_canceled_orders :[], 

        //counters
        scheduelsCount : 0 ,
        ordersCount : 0 ,
        validatedOrdersCount : 0 ,
        todaysSalesCount : 0 ,
        valide_orders_count : 0 ,
        distrubutor_todays_canceled_orders_count : 0 ,
        todaysSectorsCount :0,

        //fetchng booleans
        distrubutor_todays_orders_done_fetching: false ,
        todays_orders_first_fetch:false,

        distrubutor_todays_canceled_orders_done_fetching: false ,
        todays_canceled_orders_first_fetch:false,

        todays_sales_first_fetch:false,
        done_fetching_todays_Sales:false,

        todays_validated_orders_first_fetch:false,
        done_fetching_todays_validated_orders:false,

        todays_orders_first_fetch:false,
        done_fetching_todays_orders:false,

        todays_scheduels_first_fetch:false,
        done_fetching_todays_scheduels:false,
        
        //seclection
        selectedBill : null ,

        //control turns in distrubutors todays orders 
        currentTurn   : null ,
        currentSector : null,
        currentSectorIndex : 0,
    },
    reducers:{
        //todays sales [ADMIN] screens
        fetchedScheduels : (state,scheduels)=>({
            ...state,
            scheduels ,
            scheduelsCount: scheduels.length,
            todays_scheduels_first_fetch:true,
            done_fetching_todays_scheduels:true,
        }),
        scheduelsFetchingFailed : (state,args)=>({
            ...state,
            scheduels :[] ,
            scheduelsCount: 0,
            todays_scheduels_first_fetch:false,
            done_fetching_todays_scheduels:true,
        }),
        fetchedOrders : (state,orders)=>({
            ...state,
            orders ,
            ordersCount: orders.length,
            todays_orders_first_fetch:true,
            done_fetching_todays_orders:true,
        }),
        ordersFetchingFailed : (state,args)=>({
            ...state,
            orders :[] ,
            ordersCount: 0,
            todays_orders_first_fetch:false,
            done_fetching_todays_orders:true,
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
        fetchedTodaysSales : (state,todaysSales)=>({
            ...state,
            todaysSales,
            todaysSalesCount:todaysSales.length,
            done_fetching_todays_Sales : true,
            todays_sales_first_fetch : true,
        }),
        todaysSalesFetchFailed : (state,args)=>({
            ...state,
            todaysSales:[],
            todaysSalesCount:0,
            done_fetching_todays_Sales : true,
            todays_sales_first_fetch : false,
        }),
        
        //used in both [ADMIN,DISTRUBUTOR]$   
        fetchedTodaysValideOrders : (state,orders)=>({
            ...state,
            valide_orders :orders,
            valide_orders_count :orders.length,
            todays_validated_orders_first_fetch:true,
            done_fetching_todays_validated_orders:true,
        }),
        fetchTodaysValideOrdersFAILED : (state,orders)=>({
            ...state,
            valide_orders :orders,
            valide_orders_count :orders.length,
            todays_validated_orders_first_fetch:false,
            done_fetching_todays_validated_orders:true,
        }),
        //used in [DISTRUBUTOR] screens
        fetchedTodaysSectors : (state,todaysSectors)=>({
            ...state,
            todaysSectors :[...todaysSectors],
            todaysSectorsCount :todaysSectors.length,
            currentTurn   :todaysSectors[0].orders[0].turn || 0,
            currentSector : todaysSectors[0].sector.id,
            todays_orders_first_fetch:true,
            currentSectorIndex:0,
            distrubutor_todays_orders_done_fetching:true,
        }),
        fetchedTodaysSectorsFailed : (state,todaysSectors)=>({
            ...state,
            todaysSectors :[],
            todaysSectorsCount :0,
            todays_orders_first_fetch:true,
            distrubutor_todays_orders_done_fetching:true,
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
     
        fetchedDistrubutorTodaysCanceledOrders : (state,orders)=>({
            ...state,
            distrubutor_todays_canceled_orders :orders,
            distrubutor_todays_canceled_orders_count :orders.length,
            distrubutor_todays_canceled_orders_done_fetching: true ,
            todays_canceled_orders_first_fetch:true,
        }),
        distrubutorTodaysCanceledOrdersFetchingFailed : (state,orders)=>({
            ...state,
            distrubutor_todays_canceled_orders :[],
            distrubutor_todays_canceled_orders_count :0,
            distrubutor_todays_canceled_orders_done_fetching: true ,
            todays_canceled_orders_first_fetch:false,
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
               console.log("-----fetchTodaysSales-----")
               console.log(error)
               dispatch.scheduel.todaysSalesFetchFailed()

            }
        },
        async fetchTodaysOrders(arg,state){
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
                    try {
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
                                      console.log('\nnew sector'+currentOrder.sectorId)
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
                        }else{
                            throw new Error('NO_DOCS')
                        }
                    } catch (error) {
                        console.log("----fetchTodaysSectors catch2------")
                        dispatch.scheduel.fetchedTodaysSectorsFailed()
                    }
                })
            } catch (error) {
                console.log("----fetchTodaysSectors catch1------")
                dispatch.scheduel.fetchedTodaysSectorsFailed()
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
                    dispatch.scheduel.ordersFetchingFailed()
                })
                 
             } catch (error) {
                 console.log('\n-----fetchOrders-----')
                 dispatch.scheduel.ordersFetchingFailed()
                 console.log(error)
             }
        },
        async fetchTodaysValideOrders(type,state){
             try {
                 console.log("-----fetchTodaysValideOrders------")
                 console.log({type})

                const  todays_validated_orders_first_fetch = state.scheduel.todays_validated_orders_first_fetch
                if(todays_validated_orders_first_fetch) return 
               
                let fetchOrdersReponse 
                if(type=="ADMIN"){
                    fetchOrdersReponse = await firestore()
                    .collection('orders')
                    .where('status','==','VALIDATED')
                }else{
                    const currentDistrubutorId = state.auth.distrubutorId
                
                    fetchOrdersReponse = await firestore()
                          .collection('orders')
                          .where('distrubutorId','==',currentDistrubutorId)
                          .where('status','==','VALIDATED')
    
                }
               
      
                fetchOrdersReponse.onSnapshot(res=>{
                    if(res.docs){
                        const orders=res.docs.map(order=>({
                            ...order.data(),
                            id:order.id,
                            sale_date:order.data().sale_date.toDate(),
                            sale_hour:order.data().sale_hour.toDate(),
                        }))

                        dispatch.scheduel.fetchedTodaysValideOrders(orders)
                    }
                })
                 
             } catch (error) {
                 console.log('\n-----fetchOrders-----')
                 console.log(error)
                 dispatch.scheduel.fetchTodaysValideOrdersFAILED(orders)
             }
        },
        async fetchDistrubutorTodaysCanceledOrders(arg,state){
             try {
             
                const todays_canceled_orders_first_fetch = state.scheduel.todays_canceled_orders_first_fetch
                if(todays_canceled_orders_first_fetch) return
                
                const currentDistrubutorId = state.auth.distrubutorId

                const fetchOrdersReponse = await firestore()
                      .collection('orders')
                      .where('distrubutorId','==',currentDistrubutorId)
                      .where('status','==','CANCELED')

      
                fetchOrdersReponse.onSnapshot(res=>{
                    console.log('\n fetch cancled orders')
                    console.log(res.docs.length)
                    if(res.docs){
                        const orders=res.docs.map(order=>({
                            ...order.data(),
                            id:order.id,
                            sale_date:order.data().sale_date.toDate(),
                            sale_hour:order.data().sale_hour.toDate(),
                        }))

                        dispatch.scheduel.fetchedDistrubutorTodaysCanceledOrders(orders)
                    }
                    dispatch.scheduel.distrubutorTodaysCanceledOrdersFetchingFailed()
                })
                
            } catch (error) {
                console.log('\n-----fetchOrders-----')
                console.log(error)
                dispatch.scheduel.distrubutorTodaysCanceledOrdersFetchingFailed()
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
               console.log('\nresetedOrder')
                 
             } catch (error) {
                 console.log('\n-----resetOrder-----')
                 console.log(error)
             }
        },
        selectBill({id,distrubutor},state){
            let selectedBil =null
            if(distrubutor){
                //calling from distrubutor Interface  
                const valide_orders = [...state.scheduel.valide_orders]
                selectedBil = valide_orders.filter(b=>b.id == id)[0]
                
                   
            }else{
               //calling from admin iterface
               const valide_orders = [...state.scheduel.orders]
               selectedBil = valide_orders.filter(b=>b.id == id)[0]
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
                        dispatch.scheduel.scheduelsFetchingFailed()
                 })
                
            } catch (error) {
                console.log('\n-----fetchScheduels-----')
                console.log(error)
                dispatch.scheduel.scheduelsFetchingFailed()

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
                     console.log('\nadded orders list ')  
                     batch.commit()
                }

                const scheduels= [...state.scheduel.scheduels]
                scheduels.push(newSchedule)
                dispatch.scheduel.addedScheduel({scheduels,addedOrdersCount})
           } catch (error) {
               console.log('\n------[addOrder]------')
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
             console.log('\n-----updateScheduel-----')
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
             console.log('\n-----updateScheduel-----')
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
                    //check if sector exists 
                    if(todaysSectors.length == currentSectorIndex+1) return 

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