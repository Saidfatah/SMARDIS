import firestore from '@react-native-firebase/firestore'

export default async (arg,state,dispatch)=>{
    try {
         
            
    } catch (error) {
       console.log("-----fetchTodaysSales-----")
       console.log(error)
       dispatch.scheduel.todaysSalesFetchFailed()
    }
}