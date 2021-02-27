import firestore from '@react-native-firebase/firestore'

const today = new Date()
 
const yesterydayJsDstrubutor = new Date(today)
yesterydayJsDstrubutor.setDate(yesterydayJsDstrubutor.getDate() - 1)
yesterydayJsDstrubutor.setHours(23,56,59,999);

var yesterydayDstrubutor = firestore.Timestamp.fromDate(yesterydayJsDstrubutor);

 
export default async (arg,state,dispatch)=>{
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
}