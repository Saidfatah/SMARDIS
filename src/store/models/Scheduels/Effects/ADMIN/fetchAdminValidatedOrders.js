import firestore from '@react-native-firebase/firestore'
import asyncStorage from "@react-native-async-storage/async-storage" 
 
const today = new Date()
const tomorrowJs = new Date(today)
tomorrowJs.setHours(0,0,0,0);

const CONFIG_DOC ="1 - - CONFIG - -"

const setSalesReduxCache=async (dispatch,orders)=>{
    const SALES = await asyncStorage.getItem('SALES')
     
    console.log(SALES != undefined && SALES!=null)
    if(SALES != undefined && SALES!=null){
         const {sales}= JSON.parse(SALES) 

         let SALES_TMP= [...sales]
         const SALES_IDS=sales.map(o=>o.id)

     
         orders.forEach(newFetchedOrder => {
             if( SALES_IDS.indexOf(newFetchedOrder.id) <0 ){
                 SALES_TMP.push(newFetchedOrder)
            }
         });
        
         
        await asyncStorage.setItem('SALES',JSON.stringify({
            sales:SALES_TMP,
            day_of_creation:new Date().getDay(),
            mounth_of_creation:new Date().getMonth()
         }))
    
        dispatch.scheduel.fetchedTodaysSales(sales)
    }else{
       await asyncStorage.setItem('SALES',JSON.stringify({
          sales:orders,
          day_of_creation:new Date().getDay(),
          mounth_of_creation:new Date().getMonth()
       }))

       dispatch.scheduel.fetchedTodaysSales(orders)
    }
}


export default async  (arg,state,dispatch)=>{
    try {
          
        //GET VALIDATED ORDERS FROM CACHE 
        let FETCHED_FROM_CACHE=false
        const VALIDATED_TEMPORARY_RES=await asyncStorage.getItem('VALIDATED_TEMPORARY') 
        if(VALIDATED_TEMPORARY_RES != undefined){
           let VALIDATED_PARSED=  JSON.parse(VALIDATED_TEMPORARY_RES)
           FETCHED_FROM_CACHE=true
           dispatch.scheduel.fetchedTodaysValideOrders({
              orders:VALIDATED_PARSED ,
              validated_commands_ref:null
           })
        } 

        let DATE_LIMIT 
        const LAST_FETCH_DATE = await asyncStorage.getItem('LAST_FETCH_DATE')
        
        if(LAST_FETCH_DATE != undefined && LAST_FETCH_DATE != null){
            const LAST_FETCH_DATE_=new Date(LAST_FETCH_DATE)
            const current_day= new Date().getDay()
           
            if(LAST_FETCH_DATE_.getDay() ==  current_day)
                DATE_LIMIT = firestore.Timestamp.fromDate(new Date(LAST_FETCH_DATE));
            else 
                DATE_LIMIT = firestore.Timestamp.fromDate(tomorrowJs);
        }else{
            DATE_LIMIT = firestore.Timestamp.fromDate(tomorrowJs);
        }


        
        const fetch_orders_first_fetch = state.scheduel.fetch_orders_first_fetch
        if(fetch_orders_first_fetch == true ) return 
       
        
        const admin_city= state.auth.user.city
        const fetchOrdersReponse = await firestore()
                                        .collection('orders')
                                        .where('sale_date','>',DATE_LIMIT)
                                        .where('status',"in",["VALIDATED"])
                                        .where('region','array-contains',admin_city)
         
  
         
         fetchOrdersReponse.onSnapshot(async res=>{
           const EXPORTATION_STATE = state.scheduel.EXPORTATION_STATE
           console.log({EXPORTATION_STATE})
           if(EXPORTATION_STATE === "STARTED") 
           {
            return console.log("cant fetch validated")
           } 

           
           if(res.docs.length && EXPORTATION_STATE === "FINISHED" ){ 
                console.log("fetching validated orders: ")
                console.log(  res.docs.map(d=>d.id))



               const maped_data=res.docs.map(order=>({
                   ...order.data(),
                   id:order.id,
                   sale_date:order.data().sale_date.toDate(),
                   sale_hour:order.data().sale_hour.toDate(),
               }))
              const orders=maped_data.filter(order=>order.id != CONFIG_DOC)

              //set last valdiated orders fetch time/date 
              await asyncStorage.setItem('LAST_FETCH_DATE',new Date().toString())

              //set or append to  VALIDATED_TEMPORARY  
              const VALIDATED_TEMPORARY_RES=await asyncStorage.getItem('VALIDATED_TEMPORARY') 
              if(VALIDATED_TEMPORARY_RES != undefined){
                 let VALIDATED_TEMPORARY=  JSON.parse(VALIDATED_TEMPORARY_RES)
               
                 //MAKE SURE WE REMOVE DUPLICATES OR AT LEAST PREVENT PUSHNG AN ALREADY PUSHED ORDER
                 const VALIDATED_TEMPORARY_IDS=VALIDATED_TEMPORARY.map(o=>o.id)
                 orders.forEach(newFetchedOrder => {
                     if( VALIDATED_TEMPORARY_IDS.indexOf(newFetchedOrder.id) <0 )
                       VALIDATED_TEMPORARY.push(newFetchedOrder)
                 });
        


                 //set SALES CACHE AND SET SALES IN REDUX STATE
                 setSalesReduxCache(dispatch,VALIDATED_TEMPORARY)


                 dispatch.scheduel.fetchedTodaysValideOrders({
                    orders:VALIDATED_TEMPORARY ,
                    validated_commands_ref:null
                 })
                 await asyncStorage.setItem("VALIDATED_TEMPORARY",JSON.stringify(VALIDATED_TEMPORARY))
              }else{
                  
                  //set SALES CACHE AND SET SALES IN REDUX STATE
                  setSalesReduxCache(dispatch,orders)
              
                  //SET VALDIATED OR TO CACHE AND REDUX STATE
                  dispatch.scheduel.fetchedTodaysValideOrders({
                       orders ,
                       validated_commands_ref:null
                  })
                  await asyncStorage.setItem("VALIDATED_TEMPORARY",JSON.stringify(orders))
              }

              return 
           }
           if(!FETCHED_FROM_CACHE){
               dispatch.scheduel.fetchTodaysValideOrdersFAILED()
            //    dispatch.scheduel.todaysSalesFetchFailed()
           }

       })
        
    } catch (error) {
        console.log('\n-----fetchOrders-----')
        console.log(error)
        dispatch.scheduel.fetchTodaysValideOrdersFAILED()

    }
}