import firestore from '@react-native-firebase/firestore'

const today = new Date()
 
const yestradyJs = new Date(today)
yestradyJs.setDate(yestradyJs.getDate() - 1)

yestradyJs.setDate(yestradyJs.getDate() +7)

const yesterydayJsDstrubutor = new Date(today)
yesterydayJsDstrubutor.setDate(yesterydayJsDstrubutor.getDate() - 1)
yesterydayJsDstrubutor.setHours(23,56,59,999);

var yesterydayDstrubutor = firestore.Timestamp.fromDate(yesterydayJsDstrubutor);


const CONFIG_DOC ="1 - - CONFIG - -"
export default async  (type,state,dispatch)=>{
    try {
  
       const  todays_validated_orders_first_fetch = state.scheduel.todays_validated_orders_first_fetch
       if(todays_validated_orders_first_fetch) return 
       
      
       const currentDistrubutorId = state.auth.distrubutorId
       const fetchOrdersReponse = await firestore()
       .collection('orders')
       .where('distrubutorId','==',currentDistrubutorId)
       .where('status','==','VALIDATED')
       .where('sale_date', '>', yesterydayDstrubutor)
     
  
  
       const validated_commands_ref =fetchOrdersReponse.onSnapshot(res=>{
       if(res.docs.length){
        const maped_data=res.docs.map(order=>({
            ...order.data(),
            id:order.id,
            sale_date:order.data().sale_date.toDate(),
            sale_hour:order.data().sale_hour.toDate(),
        }))
        const orders= maped_data.filter(order => order.id != CONFIG_DOC)
         
        

        return  dispatch.scheduel.fetchedTodaysValideOrders({orders,validated_commands_ref})
        }
        dispatch.scheduel.fetchTodaysValideOrdersFAILED()
      })
     
    } catch (error) {
        console.log('\n-----fetchOrders-----')
        console.log(error)
        dispatch.scheduel.fetchTodaysValideOrdersFAILED()
    }
}