import firestore from '@react-native-firebase/firestore'

export default async (arg,state,dispatch)=>{
    try {
        const admin_city = state.auth.user.city
        const valide_orders=state.scheduel.valide_orders
                        
        let sales= []
        valide_orders.forEach((order,index)=>{
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
            
    } catch (error) {
       console.log("-----fetchTodaysSales-----")
       console.log(error)
       dispatch.scheduel.todaysSalesFetchFailed()
    }
}