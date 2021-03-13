import firestore from '@react-native-firebase/firestore'

export const sectorModel=(name,city)=>({
    name,
    city,
    created_at:firestore.Timestamp.fromDate(new Date())
})
