import firestore from '@react-native-firebase/firestore'
import asyncStorage from "@react-native-async-storage/async-storage" 

var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

const firstDayOfmonth = new Date(firstDay)
firstDayOfmonth.setHours(23,59,59,999);


const CONFIG_DOC ="1 - - CONFIG - -"
export default async  (arg,state,dispatch)=>{
    try {
         
        //check if SALES is in cache if so get them and set redux state 
        const SALES = await asyncStorage.getItem('SALES')
        if(SALES != undefined && SALES!=null){
             const {sales,day_of_creation,mounth_of_creation}= JSON.parse(SALES) 
             const current_mounth= new Date().getMonth()
             
             if(current_mounth == mounth_of_creation ){
                return dispatch.scheduel.fetchedTodaysSales(sales)
             }
        } 

         console.log('getting here ')
        const fetch_orders_first_fetch = state.scheduel.fetch_orders_first_fetch
        if(fetch_orders_first_fetch == true ) return 
       
        const admin_city= state.auth.user.city
        const fetchOrdersReponse = await firestore()
                                        .collection('orders')
                                        .where('created_at','>',firstDayOfmonth)
                                        .where('status',"in",["VALIDATED","EXPORTED"])
                                        .where('region','array-contains',admin_city)
       
                            
         fetchOrdersReponse.onSnapshot(async res=>{
           if(res.docs.length){
              
               const maped_data=res.docs.map(order=>({
                   ...order.data(),
                   id:order.id,
                   sale_date:order.data().sale_date.toDate(),
                   sale_hour:order.data().sale_hour.toDate(),
               }))
              const sales=maped_data.filter(order=>order.id != CONFIG_DOC)
             
              await asyncStorage.setItem('SALES',JSON.stringify({
                sales,
                day_of_creation:new Date(),
                mounth_of_creation:new Date().getMonth()
              }))

              return   dispatch.scheduel.fetchedTodaysSales(sales)
           }
           dispatch.scheduel.todaysSalesFetchFailed()

       })
        
    } catch (error) {
        console.log('\n-----FETCH SALES-----')
        console.log(error)
        dispatch.scheduel.todaysSalesFetchFailed()

    }
}