import firestore from '@react-native-firebase/firestore'

export const orderModel=(scheduleId,client,sector,distrubutor,turn)=>({
    distrubutor  ,
    client ,
    sector,
    scheduleId,
    distrubutorId:distrubutor.id,
    sectorId:sector.id,
    turn ,//0,1,2,3,4 depends on what the admin has chosen  
    total : 0,
    products:[],
    created_at: firestore.Timestamp.fromDate(new Date()),
    billRef:"Aucune",//updated from dirtubtor cart on validating command 
    status: "PENDING",//update from distrubutor cart 
    note : "Aucune", // if sale is canceled distrubutor needs to provide a note 
    sale_date : firestore.Timestamp.fromDate(new Date()),//update from distrubutor cart 
    sale_hour : firestore.Timestamp.fromDate(new Date()),//update from ditrubutor cart 
})