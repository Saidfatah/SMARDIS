import firestore from '@react-native-firebase/firestore'

const today = new Date()
 
var curr = new Date(today); // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6
var firstday = new Date(curr.setDate(first)); // 06-Jul-2014
var lastday = new Date(curr.setDate(last)); //12-Jul-2014

var weekStart = firestore.Timestamp.fromDate(firstday);
var nextWeek = firestore.Timestamp.fromDate(lastday);
 
 

export default async (arg,state,dispatch)=>{
    try {
        const fetchScheduelsReponse = await firestore()
                                           .collection('scheduels')
                                           .where('date','<',nextWeek)
                                           .where('date','>=',weekStart)

         fetchScheduelsReponse.onSnapshot(res=>{
             if(res.docs.length){
                  const scheduels=res.docs.map(scheduel=>({
                      ...scheduel.data(),
                      id:scheduel.id,
                      date:scheduel.data().date.toDate(),
                      start_date:scheduel.data().start_date.toDate(),
                    }))
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