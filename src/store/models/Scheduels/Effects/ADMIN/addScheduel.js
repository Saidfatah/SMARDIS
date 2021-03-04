import {orderModel} from '../../Schemas/OrderModel'
import {scheduleModel} from '../../Schemas/ScheduelModel'
import firestore from '@react-native-firebase/firestore'
 
 
export default async (args,state,dispatch)=>{
    try {
         const {navigation,distrubutor,distination,start_date}=args
         const admin = state.auth.user 
         delete distrubutor.commits
         delete distrubutor.confimred
         delete distrubutor.type
         delete distrubutor.user_id
         delete distrubutor.email
         delete distrubutor.created_at

         //this will be used in order to be filterd with when fetching validated commands from admin
         const CITY=admin.city
       
         //create scheduel doc 
         const newSchedule = scheduleModel( admin, distrubutor, distination ,start_date,distination.sector.id,[CITY])
     
         //check if there s a scheduel already assigned to same dstrubutor in the same date
         const starDatePrevNight= new Date(start_date)
         starDatePrevNight.setHours(0,0,0,0)
         const starDateNextNight= new Date(start_date)
         starDateNextNight.setHours(23,59,59,999)
        
         const start_date_dayStart = firestore.Timestamp.fromDate(starDatePrevNight)
         const start_date_dayEnd = firestore.Timestamp.fromDate(starDateNextNight)
         const scheduelCheckResponse = await firestore()
                                            .collection('scheduels')
                                            .where('start_date','<',start_date_dayEnd)
                                            .where('start_date','>',start_date_dayStart)
                                            .where('distrubutorId','==',distrubutor.id)
                                            .where('sectorId','==',distination.sector.id)
                                            .get()
                                                                         
         if(scheduelCheckResponse.docs[0]){
             dispatch.scheduel.addingScheduelFailed({schedule_add_error:{id:"ALREACY_ASIGNED",message:"le ce traject est deja assigner a le ditrubuteur ["+ distrubutor.name+"]"}})

         }
        

         const scheduelAddResponse = await firestore()
                                           .collection('scheduels')
                                           .add(newSchedule)
         newSchedule.id=scheduelAddResponse.id

         const scheduelOrders=[]
         //map schduel clients to individual orders and add them to orders collection
         const addedOrdersCount=distination.clients.length

         distination.clients.forEach((client,index)=>{
             const order= orderModel(
                 scheduelAddResponse.id,
                 client,
                 distination.sector,
                 distrubutor,
                 index,
                 start_date,
                 [CITY]
                 )
             scheduelOrders.push(order)
         })


         if(scheduelOrders.length>0){
              var batch = firestore().batch()
              scheduelOrders.forEach((doc) => {
                      var docRef = firestore().collection("orders").doc(); 
                      batch.set(docRef, doc);
              });
              console.log('\nadded orders list ')  
              batch.commit()
                
         }
         console.log('added orders ')
             
         const scheduels= [...state.scheduel.scheduels]
          scheduels.push(newSchedule)
          dispatch.scheduel.addedScheduel({scheduels,addedOrdersCount})
          dispatch.toast.show({
           type:'success',
           title:'Ajoute ',
           message:`le trajet  est ajouter avec success `
          })
          navigation.navigate("ADMINlistOfScheduleS")
    } catch (error) {
        console.log('\n------[addOrder]------')
        console.log(error)
        dispatch.scheduel.addingScheduelFailed({schedule_add_error:{id:"ADD_FAILED",message:"somthing went wrong!"}})

    }
 }