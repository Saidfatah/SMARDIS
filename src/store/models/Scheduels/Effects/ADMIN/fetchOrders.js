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

        const fetch_orders_first_fetch = state.scheduel.fetch_orders_first_fetch
        if(fetch_orders_first_fetch == true ) return 
       
        const admin_city= state.auth.user.city
        const fetchOrdersReponse = await firestore()
                                        .collection('orders')
                                        .where('created_at','<',tomorrow)
                                        .where('created_at','>',yesterday)
                                        .where('region','array-contains',admin_city)
         
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

              //get sales 
              let sales=orders.filter(order=>order.status == "VALIDATED" || order.status == "EXPORTED")
              dispatch.scheduel.fetchedTodaysSales(sales)
              
              //get valide orders 
              const validated=orders.filter(order=>order.status == "VALIDATED")
              dispatch.scheduel.fetchedTodaysValideOrders({
                  orders:validated,
                  validated_commands_ref:null
              })
              console.log(validated.length)

              //get all all orders
              return  dispatch.scheduel.fetchedOrders(orders)
           }
           dispatch.scheduel.ordersFetchingFailed()
           dispatch.scheduel.fetchTodaysValideOrdersFAILED()
           dispatch.scheduel.todaysSalesFetchFailed()

       })
        
    } catch (error) {
        console.log('\n-----fetchOrders-----')
        console.log(error)
        dispatch.scheduel.ordersFetchingFailed()
        dispatch.scheduel.todaysSalesFetchFailed()
        dispatch.scheduel.fetchTodaysValideOrdersFAILED()

    }
}