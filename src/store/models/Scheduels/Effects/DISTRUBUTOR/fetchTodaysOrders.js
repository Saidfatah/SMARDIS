import firestore from '@react-native-firebase/firestore'

const today = new Date()
const tomorrowJs = new Date(today)
tomorrowJs.setHours(23,59,59,999);

var tomorrow = firestore.Timestamp.fromDate(tomorrowJs);

const ysterdayMidnight= new Date();
ysterdayMidnight.setHours(0,0,0,0);
var yesterday = firestore.Timestamp.fromDate(ysterdayMidnight);

 
const CONFIG_DOC='1 - - CONFIG - -'

export default async(arg,state,dispatch)=>{
    try {
        const todays_orders_first_fetch= state.scheduel.todays_orders_first_fetch
        if(todays_orders_first_fetch) return 
        console.log('fetch todays orders')
        const currentDistrubutorId = state.auth.distrubutorId
        
      
        const fetchOrdersReponse = await firestore()
              .collection('orders')
              .where('created_at','>',yesterday)
              .where('created_at','<',tomorrow)
              .where('distrubutorId','==',currentDistrubutorId)
              .where('status','==','PENDING')
              .orderBy('created_at','asc')
              .orderBy('turn','asc')

        //get orders config doc    
        const orderConfigResponse = await firestore().collection('orders').doc(CONFIG_DOC)
        orderConfigResponse.onSnapshot(res=>{
            const doc=res.data() 
            if(doc){
                dispatch.scheduel.fetchedOrderConfig({orderConfig:doc})
            }
        })
         
        
        

        fetchOrdersReponse.onSnapshot(async res=>{
            if(res.docs.length){
                // const flteredDocs=  res.docs.filter(doc=> doc.id != CONFIG_DOC)
                 const flteredDocs=  res.docs  
                //chececk for clients objectifs 
                //reset their objectif progress if its the beggning of the month 
                if(flteredDocs.length <1) return dispatch.scheduel.fetchedTodaysSectorsFailed()
                const currentMount=new Date().getMonth()
                const refrencedClients=flteredDocs.map(doc=>({...doc.data().client}))

                refrencedClients.forEach(async client=>{
                    const {objectif,id} = client
                    const {initial,last_mounth} = objectif

                    if(currentMount > last_mounth ){
                        console.log("reset objectif progress")
                        await firestore().collection('clients').doc(id).update({objectif:{
                           initial:initial ,
                           progress: -initial,
                           last_mounth : new Date().getMonth()
                        }})
                    }
                })

                const orderList= flteredDocs.map(doc=>({...doc.data(),orderId:doc.id}))
                 
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
                 return dispatch.scheduel.fetchedTodaysSectors({todaysOrders})
            }
            dispatch.scheduel.fetchedTodaysSectorsFailed()
        })
    } catch (error) {
        console.log("----fetchTodaysSectors catch1------")
        console.log(error)
        dispatch.scheduel.fetchedTodaysSectorsFailed()
    }
}