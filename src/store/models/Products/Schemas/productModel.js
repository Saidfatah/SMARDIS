import firestore from '@react-native-firebase/firestore'

export const  productModel = (name,category,image,price1,ref,price2,price3,price4,subCategory,regions,discount,stock) =>({
    name ,
    ref:ref || 'P'+name+(new Date().getTime()),
    category :category || [],
    subCategory :subCategory || "NOT_DEFINED",
    image : image || 'NO_IMAGE' ,
    price1:price1 || 0, 
    price2:price2 || 0,
    price3:price3 || 0,
    price4:price4 || 0,
    discount:discount||0,
    regions:regions || [],
    created_at:firestore.Timestamp.fromDate(new Date())
})