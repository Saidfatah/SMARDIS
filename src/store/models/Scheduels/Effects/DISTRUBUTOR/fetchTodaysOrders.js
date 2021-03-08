import firestore from '@react-native-firebase/firestore'
import _ from 'lodash'
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
        const currentDistrubutorId = state.auth.distrubutorId
        
        
        console.log({currentDistrubutorId})
        const fetchOrdersReponse = await firestore()
              .collection('orders')
              .where('created_at','>',yesterday)
              .where('created_at','<',tomorrow)
              .where('distrubutorId','==',currentDistrubutorId)
              .where('status','==','PENDING')
              .orderBy('created_at','asc')
             

        //get orders config doc    
        const orderConfigResponse = await firestore().collection('orders').doc(CONFIG_DOC)
        orderConfigResponse.onSnapshot(res=>{
            const doc=res.data() 
            if(doc){
                dispatch.scheduel.fetchedOrderConfig({orderConfig:doc})
            }
        })
         
        
        

        const todays_orders_ref=fetchOrdersReponse.onSnapshot(async res=>{
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
                const ordersnamessectors= orderList.map(o=>({sector:o.sector.name,turn:o.turn}))
                console.log(ordersnamessectors)
                 
                const groupBySector=_.groupBy(orderList,"sectorId")
            
                 const todaysOrders = Object.keys(groupBySector).map(key=>({
                    sector:groupBySector[key][0].sector,
                    scheduleId:groupBySector[key][0].scheduleId,
                    orders:[...groupBySector[key]
                    .sort((a,b)=>{
                        if (a.turn < b.turn) { return -1; }
                        if (a.turn > b.turn) { return 1; }
                        return 0;
                    })
                    .map(o=>({...o,scheduelId:o.scheduleId  })) ]
                }))
              
              
            
                 return dispatch.scheduel.fetchedTodaysSectors({todaysOrders,todays_orders_ref})
            }
            dispatch.scheduel.fetchedTodaysSectorsFailed()
        })
    } catch (error) {
        console.log("----fetchTodaysSectors catch1------")
        console.log(error)
        dispatch.scheduel.fetchedTodaysSectorsFailed()
    }
}