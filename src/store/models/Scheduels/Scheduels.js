// orders sent by admin
// emploi du temp  
// get clients List for each District (Secteur)
import {orderModel} from './Schemas/OrderModel'
import {scheduleModel} from './Schemas/ScheduelModel'
import firestore from '@react-native-firebase/firestore'


const today = new Date()
const tomorrowJs = new Date(today)
tomorrowJs.setHours(23,59,59,999);
 

const yestradyJs = new Date(today)
yestradyJs.setDate(yestradyJs.getDate() - 1)


yestradyJs.setDate(yestradyJs.getDate() +7)

const yesterydayJsDstrubutor = new Date(today)
yesterydayJsDstrubutor.setDate(yesterydayJsDstrubutor.getDate() - 1)
yesterydayJsDstrubutor.setHours(23,56,59,999);

var yesterydayDstrubutor = firestore.Timestamp.fromDate(yesterydayJsDstrubutor);

var curr = new Date(today); // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6
var firstday = new Date(curr.setDate(first)); // 06-Jul-2014
var lastday = new Date(curr.setDate(last)); //12-Jul-2014

var weekStart = firestore.Timestamp.fromDate(firstday);
var nextWeek = firestore.Timestamp.fromDate(lastday);
var tomorrow = firestore.Timestamp.fromDate(tomorrowJs);

const ysterdayMidnight= new Date();
ysterdayMidnight.setHours(0,0,0,0);
var yesterday = firestore.Timestamp.fromDate(ysterdayMidnight);

 

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
        
        done_adding_scheduel:false,


        done_canceling_order:false,
        done_canceling_order:false,
        done_removing_scheduel:false,
        
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
            done_adding_scheduel:true
        }),
        addingScheduelFailed  : (state,args)=>({
            ...state, 
            done_adding_scheduel:true
        }),
        updatedScheduel  : (state,scheduels)=>({
            ...state,
            scheduels ,
            done_adding_scheduel:true
        }),
        updatingScheduelFailed  : (state,scheduels)=>({
            ...state, 
            done_adding_scheduel:true
        }),
        removedScheduel  : (state,{scheduels,deletedOrdersCount})=>({
            ...state,
            scheduels ,
            scheduelsCount : state.scheduelsCount -1,
            ordersCount : state.scheduelsCount -deletedOrdersCount,
            done_removing_scheduel:true       
         }),
        scheduelRemovingFailed  : (state,args)=>({
            ...state, 
            done_removing_scheduel:true       
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
            valide_orders_count :orders.length || 0,
            todays_validated_orders_first_fetch:true,
            done_fetching_todays_validated_orders:true,
        }),
        fetchTodaysValideOrdersFAILED : (state,orders)=>({
            ...state,
            valide_orders :[],
            valide_orders_count :0,
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
            todays_orders_first_fetch:false,
            distrubutor_todays_orders_done_fetching:true,
        }),
        setedNextTurn : (state,{currentSector,currentTurn,currentSectorIndex})=>({
            ...state,
            currentTurn   ,
            currentSector ,
            done_canceling_order:true
        }),
        cancelOrderFailed : (state,args)=>({
            ...state,
            done_canceling_order:true
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
        restedOrder:  (state,field)=>({
            ...state,
            done_resetting_order:true
        }),
        resitingOrderFailed:  (state,field)=>({
            ...state,
            done_resetting_order:true
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
    },
    effects: (dispatch)=>({
        async fetchTodaysSales(arg,state){
            try {
                const fetchOrdersReponse = await firestore()
                                                .collection('orders')
                                                .where('status','==',"VALIDATED")
                                                .where('sale_date','>',yesterday)
                                

                 fetchOrdersReponse.onSnapshot(res=>{
                     if(res.docs.length){
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
                          return dispatch.scheduel.fetchedTodaysSales(sales)
                     }
                     dispatch.scheduel.todaysSalesFetchFailed()
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
                console.log('-----Distrubutr todays orders-------')
                const fetchOrdersReponse = await firestore()
                      .collection('orders')
                      .where('created_at','>',yesterday)
                      .where('created_at','<',tomorrow)
                      .where('distrubutorId','==',currentDistrubutorId)
                      .where('status','==','PENDING')
                      .orderBy('created_at','asc')
                      .orderBy('turn','asc')

                 
                fetchOrdersReponse.onSnapshot(res=>{
                    if(res.docs.length){
                        const docs= res.docs
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
                                               scheduelId:lastOrder.scheduleId   
                                           }]
                                       }
                                       arr.push(obj)
                                      started=true
                                  }
                             
                                  if(lastOrder.sectorId == currentOrder.sectorId && firstOrder.orderId != currentOrder.orderId){
                                     arr[i].orders.push({...currentOrder, scheduelId:currentOrder.scheduleId })
                                  }
                                  else if(lastOrder.sectorId != currentOrder.sectorId && started){
                                      console.log('\nnew sector'+currentOrder.sectorId)
                                    let obj={
                                        sector:currentOrder.sector,
                                        scheduleId:currentOrder.scheduleId,
                                        orders:[{...currentOrder, scheduelId:currentOrder.scheduleId   }]
                                    }
                                    arr.push(obj)
                                      i++
                                  }
                             
                                  lastOrder={...currentOrder}
                             
                                  return arr
                             }
                         ,[]) 
                         console.log('fetched todays orders')
                         return dispatch.scheduel.fetchedTodaysSectors(todaysOrders)
                    }
                    dispatch.scheduel.fetchedTodaysSectorsFailed()
                })
            } catch (error) {
                console.log("----fetchTodaysSectors catch1------")
                console.log(error)
                dispatch.scheduel.fetchedTodaysSectorsFailed()
            }
        },
        async fetchOrders(arg,state){
             try {
                const fetchOrdersReponse = await firestore()
                                                 .collection('orders')
                                                 .where('created_at','<',tomorrow)
                                                 .where('created_at','>',yesterday)

                fetchOrdersReponse.onSnapshot(res=>{
           
                    if(res.docs.length){
                        const orders=res.docs.map(order=>({
                            ...order.data(),
                            id:order.id,
                            sale_date:order.data().sale_date.toDate(),
                            sale_hour:order.data().sale_hour.toDate(),
                        }))
                       return  dispatch.scheduel.fetchedOrders(orders)
                    }
                    dispatch.scheduel.ordersFetchingFailed()
                })
                 
             } catch (error) {
                 console.log('\n-----fetchOrders-----')
                 console.log(error)
                 dispatch.scheduel.ordersFetchingFailed()
             }
        },
        async fetchTodaysValideOrders(type,state){
             try {
               
           
                const  todays_validated_orders_first_fetch = state.scheduel.todays_validated_orders_first_fetch
                if(todays_validated_orders_first_fetch) return 
               
                

                let fetchOrdersReponse
                
                if(type=="ADMIN"){
                    fetchOrdersReponse = await firestore()
                    .collection('orders')
                    .where('sale_date', '>', yesterday)
                    .where('status','==','VALIDATED')
                    // .where('sale_date', '<', tomorrow)

                }else{
                    const currentDistrubutorId = state.auth.distrubutorId
                   
                    fetchOrdersReponse = await firestore()
                          .collection('orders')
                          .where('distrubutorId','==',currentDistrubutorId)
                          .where('status','==','VALIDATED')
                          .where('sale_date', '>', yesterydayDstrubutor)
                         
                }
           
               
                fetchOrdersReponse.onSnapshot(res=>{
                    if(res.docs.length){
                        console.log('got validated orders')
                        const orders=res.docs.map(order=>({
                            ...order.data(),
                            id:order.id,
                            sale_date:order.data().sale_date.toDate(),
                            sale_hour:order.data().sale_hour.toDate(),
                        }))

                      return  dispatch.scheduel.fetchedTodaysValideOrders(orders)
                    }
                    dispatch.scheduel.fetchTodaysValideOrdersFAILED()
                })
                 
             } catch (error) {
                 console.log('\n-----fetchOrders-----')
                 console.log(error)
                 dispatch.scheduel.fetchTodaysValideOrdersFAILED()
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
                          .where('sale_date', '>', yesterydayDstrubutor)
             
              
                fetchOrdersReponse.onSnapshot(res=>{
                    if(res.docs.length){
                        console.log('GOT CANCELED')
                       const orders=res.docs.map(order=>({
                            ...order.data(),
                            id:order.id,
                            sale_date:order.data().sale_date.toDate(),
                            sale_hour:order.data().sale_hour.toDate(),
                        }))

                        return dispatch.scheduel.fetchedDistrubutorTodaysCanceledOrders(orders)
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
             
               dispatch.scheduel.restedOrder()
               
            } catch (error) {
                console.log('\n-----resetOrder-----')
                dispatch.scheduel.resitingOrderFailed()
                 console.log(error)
             }
        },
        selectBill({id,distrubutor},state){
            try {
                  let selectedBil =null
                  if(distrubutor){
                      //calling from distrubutor Interface  
                      const valide_orders = [...state.scheduel.valide_orders]
                      selectedBil = valide_orders.filter(b=>b.id == id)[0]
                      
                         
                  }else{
                     //calling from admin iterface
                     const valide_orders = [...state.scheduel.orders]
                     console.log("valide_orders:"+valide_orders.length)
                     selectedBil = valide_orders.filter(b=>b.id == id)[0]
                     console.log({selectedBil})
                  }
                  if(selectedBil != null) dispatch.scheduel.selectedABill(selectedBil)
                 
            } catch (error) {
                console.log("----selctedbill---")
                console.log(error)
            }
        },

        async fetchScheduels(arg,state){
            try {
                const fetchScheduelsReponse = await firestore()
                                                   .collection('scheduels')
                                                   .where('date','<',nextWeek)
                                                   .where('date','>=',weekStart)

                 fetchScheduelsReponse.onSnapshot(res=>{
                     if(res.docs.length){
                          const scheduels=res.docs.map(scheduel=>({
                              ...scheduel.data(),
                              id:scheduel.id,
                              date:scheduel.data().date.toDate(),
                              start_date:scheduel.data().start_date.toDate(),
                            }))
                         return  dispatch.scheduel.fetchedScheduels(scheduels)
                      }
                   dispatch.scheduel.scheduelsFetchingFailed()
                 })
                
            } catch (error) {
                console.log('\n-----fetchScheduels-----')
                console.log(error)
                dispatch.scheduel.scheduelsFetchingFailed()

            }             
        },
        async addScheduel({distrubutor,distination,start_date},state){
           try {
                
                const admin = state.auth.user 
                //create scheduel doc 
                const newSchedule = scheduleModel( admin, distrubutor, distination ,start_date)
            
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
                        index,
                        start_date
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
                 dispatch.toast.show({
                  type:'success',
                  title:'Ajoute ',
                  message:`le trajet  est ajouter avec success `
                 })
           } catch (error) {
               console.log('\n------[addOrder]------')
               console.log(error)
               dispatch.scheduel.addingScheduelFailed()

           }
        },
        async updateScheduel({id,distination,distrubutor,start_date},state){
         try {
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
                  console.log('found orders')
                associatedOrdersResponse.docs.forEach((order)=>{
                    const turn = idTurn.filter(cl=>cl.id==order.data().client.id)[0].turn
                    order.ref.update({turn})
                })
              }
                        console.log('updating scheduel')                        

              dispatch.scheduel.updatedScheduel(scheduels)
            } catch (error) {
             console.log('\n-----updateScheduel-----')
             dispatch.scheduel.updatingScheduelFailed()
             console.log(error)
         }
        },
        async removeScheduel(id,state){
         try {
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
            } catch (error) {
                console.log('\n-----updateScheduel-----')
                console.log(error)
                dispatch.scheduel.scheduelRemovingFailed()
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
                 dispatch.scheduel.cancelOrderFailed()
             }
        },
        resetIsDone(field,state){
            dispatch.scheduel.reseted(field)
        }
    })
}
export default model