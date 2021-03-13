import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'
const today = new Date()
const tomorrowJs = new Date(today)
tomorrowJs.setHours(23,59,59,999);

var tomorrow = firestore.Timestamp.fromDate(tomorrowJs);

const ysterdayMidnight= new Date();
ysterdayMidnight.setHours(0,0,0,0);
var yesterday = firestore.Timestamp.fromDate(ysterdayMidnight);

 
const CONFIG_DOC='1 - - CONFIG - -'

export default async(arg,state,dispatch)=>{
    try {
     
        const orderConfigResponse = await firestore().collection('orders').doc(CONFIG_DOC)
        orderConfigResponse.onSnapshot(res=>{
            const doc=res.data() 
            if(doc){
                dispatch.scheduel.fetchedOrderConfig({orderConfig:doc})
            }
        })
  
    } catch (error) {
        console.log("----fetch orderConfig------")
        console.log(error)
        dispatch.scheduel.fetchedTodaysSectorsFailed()
    }
}