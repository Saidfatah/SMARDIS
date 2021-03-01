import firestore from '@react-native-firebase/firestore'

const today = new Date()
 
var curr = new Date(today); // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6
var firstday = new Date(curr.setDate(first)); // 06-Jul-2014
var lastday = new Date(curr.setDate(last)); //12-Jul-2014

var weekStart = firestore.Timestamp.fromDate(firstday);
var nextWeek = firestore.Timestamp.fromDate(lastday);
 
 
const CONFIG_DOC ="0000CONFIG0000"
export default async (arg,state,dispatch)=>{
    try {
        console.log('fetchScheduelsReponse')
        const fetchScheduelsReponse =  firestore()
                                      .collection('scheduels')
                                      .where('date','>=',weekStart)
                                      //   .where('date','<',nextWeek)

         fetchScheduelsReponse.onSnapshot(res=>{
             if(res.docs.length){
                 console.log('got scheduels')
                  const maped_data=res.docs.map(scheduel=>({
                      ...scheduel.data(),
                      id:scheduel.id,
                      date:scheduel.data().date.toDate(),
                      start_date:scheduel.data().start_date.toDate(),
                    }))

                  const scheduels= maped_data.filter(scheduel=> scheduel.id != CONFIG_DOC)
                  console.log({scheduels})
                  if(scheduels.length <1) return dispatch.scheduel.scheduelsFetchingFailed()
                 return  dispatch.scheduel.fetchedScheduels(scheduels)
              }
           dispatch.scheduel.scheduelsFetchingFailed()
         })
        
    } catch (error) {
        console.log('\n-----fetchScheduels-----')
        console.log(error)
        dispatch.scheduel.scheduelsFetchingFailed()

    }             
}