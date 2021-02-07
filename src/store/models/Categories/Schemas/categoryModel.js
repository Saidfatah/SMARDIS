import firestore from '@react-native-firebase/firestore'


export const  categoryModel= (name,image,isOther) =>({
    name,
    image ,
    isOther:isOther ||false,
    created_at:firestore.Timestamp.fromDate(new Date())

})