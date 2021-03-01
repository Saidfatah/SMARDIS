import firestore from '@react-native-firebase/firestore'

 
const ysterdayMidnight= new Date();
ysterdayMidnight.setHours(0,0,0,0);
var yesterday = firestore.Timestamp.fromDate(ysterdayMidnight);
const CONFIG_DOC ="1 - - CONFIG - -"

export default async (arg,state,dispatch)=>{
    try {
        const fetchOrdersReponse = await firestore()
                                        .collection('orders')
                                        .where('status','==',"VALIDATED")
                                        .where('sale_date','>',yesterday)
                        

         fetchOrdersReponse.onSnapshot(res=>{
             if(res.docs.length){
                 const maped_data=res.docs.map(order=>({...order.data(),id:order.id}))
                 const orders=maped_data.filter(order => order.id != CONFIG_DOC)
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
}