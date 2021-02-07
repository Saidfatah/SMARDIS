import firestore from '@react-native-firebase/firestore'

export const sectorModel=(name,city,province)=>({
    name,
    city,
    province : province || 'NOT_DEFINED',
    created_at:firestore.Timestamp.fromDate(new Date())
})
