import firestore from '@react-native-firebase/firestore'

const today = new Date()
 
const yestradyJs = new Date(today)
yestradyJs.setDate(yestradyJs.getDate() - 1)

yestradyJs.setDate(yestradyJs.getDate() +7)

const yesterydayJsDstrubutor = new Date(today)
yesterydayJsDstrubutor.setDate(yesterydayJsDstrubutor.getDate() - 1)
yesterydayJsDstrubutor.setHours(23,56,59,999);

var yesterydayDstrubutor = firestore.Timestamp.fromDate(yesterydayJsDstrubutor);

 
const ysterdayMidnight= new Date();
ysterdayMidnight.setHours(0,0,0,0);
var yesterday = firestore.Timestamp.fromDate(ysterdayMidnight);

const CONFIG_DOC ="1 - - CONFIG - -"
export default async  (type,state,dispatch)=>{
    try {
  
       const  todays_validated_orders_first_fetch = state.scheduel.todays_validated_orders_first_fetch
       if(todays_validated_orders_first_fetch) return 
       
       

       let fetchOrdersReponse
        
       if(type=="ADMIN"){
           const admin_city= state.auth.user.city

           fetchOrdersReponse = await firestore()
           .collection('orders')
           .where('sale_date', '>', yesterday)
           .where('status','==','VALIDATED')
           .where('region','array-contains',admin_city)


       }else{
           const currentDistrubutorId = state.auth.distrubutorId
          
           fetchOrdersReponse = await firestore()
           .collection('orders')
           .where('distrubutorId','==',currentDistrubutorId)
           .where('status','==','VALIDATED')
           .where('sale_date', '>', yesterydayDstrubutor)
       }
  
  
       const validated_commands_ref =fetchOrdersReponse.onSnapshot(res=>{
        if(res.docs.length){
         const maped_data=res.docs.map(order=>({
             ...order.data(),
             id:order.id,
             sale_date:order.data().sale_date.toDate(),
             sale_hour:order.data().sale_hour.toDate(),
         }))
         const orders= maped_data.filter(order => order.id != CONFIG_DOC)
          
         //get sales 
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
                       sale_date:sale_date ,
                       sale_hour:sale_hour ,
                       quantity:product.quantity,
                       total  
                    }
                    sales.push(sale)
                  });
             })
            dispatch.scheduel.fetchedTodaysSales(sales)

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