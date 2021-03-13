import firestore from '@react-native-firebase/firestore'

 
 
function startOfWeek(date)
  {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  
    return new Date(date.setDate(diff));
 
  }
//get first day of week and last day of the current  week 
var firstday =startOfWeek(new Date())
var lastday = new Date()
lastday.setDate(firstday.getDate()+7); 

console.log({lastday})
var weekStart = firestore.Timestamp.fromDate(firstday);
var nextWeek = firestore.Timestamp.fromDate(lastday);

const CONFIG_DOC ="0000CONFIG0000"

export default async (arg,state,dispatch)=>{
    try {
        const admin_city= state.auth.user.city

        const fetchScheduelsReponse =  firestore()
                                      .collection('scheduels')
                                      .where('region',"array-contains",admin_city)
                                      .where('status',"==","PENDING")
                                      .where('date','>=',weekStart)
                                      .where('date','<=',nextWeek)

        
        const fetch_scheduels_ref =fetchScheduelsReponse.onSnapshot(res=>{
            if(res.docs.length){
                 const scheduels=res.docs.map(scheduel=>({
                     ...scheduel.data(),
                     id:scheduel.id,
                     date:scheduel.data().date.toDate(),
                     start_date:scheduel.data().start_date.toDate(),
                   }))

             
                 if(scheduels.length <1) return dispatch.scheduel.scheduelsFetchingFailed()
                return  dispatch.scheduel.fetchedScheduels({scheduels,fetch_scheduels_ref})
             }
          dispatch.scheduel.scheduelsFetchingFailed()
        })
        
    } catch (error) {
        console.log('\n-----fetchScheduels-----')
        console.log(error)
        dispatch.scheduel.scheduelsFetchingFailed()

    }             
}