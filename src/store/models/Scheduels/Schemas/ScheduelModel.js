import firestore from '@react-native-firebase/firestore'

export const scheduleModel=(admin,distrubutor,distination,start_date)=>({
    date:new Date(),
    admin ,
    ordersCompleted:[],
    completed:0, //how many clients have been validated
    distrubutor: distrubutor ,
    distrubutorId: distrubutor.id,
    distination: distination,
    status:'PENDING',
    start_date:firestore.Timestamp.fromDate(new Date(start_date)),
    created_at:firestore.Timestamp.fromDate(new Date())
})