import firestore from '@react-native-firebase/firestore'

export const clientModel=(name,sectorId,ref,phone,address,city,price,objectif,confirmed,coardinations)=>({
    ref,
    name,
    price,
    priceType:price.replace('x','ce'),
    objectif,
    address,
    city,
    credit:0,
    sectorId,
    confirmed,
    phone :phone  ||'NO_DEFINED' , 
    coardinations: coardinations || {x:0,y:0},
    created_at:firestore.Timestamp.fromDate(new Date())
})