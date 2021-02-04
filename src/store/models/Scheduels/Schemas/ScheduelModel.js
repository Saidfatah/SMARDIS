import firestore from '@react-native-firebase/firestore'

export const scheduleModel=(admin,distrubutor,distination)=>({
    date:new Date(),
    admin ,
    ordersCompleted:[],
    completed:0, //how many clients have been validated
    distrubutor: distrubutor ,
    distrubutorId: distrubutor.id,
    distination: distination,
    created_at:firestore.Timestamp.fromDate(new Date())
})