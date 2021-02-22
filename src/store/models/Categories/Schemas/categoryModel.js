import firestore from '@react-native-firebase/firestore'


export const  categoryModel= (name,image,isOther,type,parent) =>({
    name,
    image ,
    isOther:isOther ||false,
    type,
    parent:type=="SUB"?parent:null,
    created_at:firestore.Timestamp.fromDate(new Date())

})