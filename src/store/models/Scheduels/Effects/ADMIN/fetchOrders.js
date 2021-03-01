import firestore from '@react-native-firebase/firestore'
 
const ysterdayMidnight= new Date();
ysterdayMidnight.setHours(0,0,0,0);
var yesterday = firestore.Timestamp.fromDate(ysterdayMidnight);

const today = new Date()
const tomorrowJs = new Date(today)
tomorrowJs.setHours(23,59,59,999);

var tomorrow = firestore.Timestamp.fromDate(tomorrowJs);

const CONFIG_DOC ="1 - - CONFIG - -"
export default async  (arg,state,dispatch)=>{
    try {
       const fetchOrdersReponse = await firestore()
                                        .collection('orders')
                                        .where('created_at','<',tomorrow)
                                        .where('created_at','>',yesterday)

       fetchOrdersReponse.onSnapshot(res=>{
  
           if(res.docs.length){
               console.log('got orders')
               const maped_data=res.docs.map(order=>({
                   ...order.data(),
                   id:order.id,
                   sale_date:order.data().sale_date.toDate(),
                   sale_hour:order.data().sale_hour.toDate(),
               }))
              const orders=maped_data.filter(order=>order.id != CONFIG_DOC)
              return  dispatch.scheduel.fetchedOrders(orders)
           }
           dispatch.scheduel.ordersFetchingFailed()
       })
        
    } catch (error) {
        console.log('\n-----fetchOrders-----')
        console.log(error)
        dispatch.scheduel.ordersFetchingFailed()
    }
}