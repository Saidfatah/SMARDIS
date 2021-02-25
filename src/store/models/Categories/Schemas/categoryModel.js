import firestore from '@react-native-firebase/firestore'


export const  categoryModel= (name,image,isOther,type,parent,isSpecial) =>({
    name,
    image ,
    isOther:isOther ||false,
    type,
    parent:type=="SUB"?parent:null,
    created_at:firestore.Timestamp.fromDate(new Date()),
    isSpecial:isSpecial || false,
})