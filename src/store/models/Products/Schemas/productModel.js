import firestore from '@react-native-firebase/firestore'

export const  productModel = (name,category,image,price1,ref,stock,price2,price3,price4) =>({
    name ,
    ref:ref || 'P'+name+(new Date().getTime()),
    category :category || 0,
    image : image || 'NO_IMAGE' ,
    price1, 
    price2:price2 || 'NOT_DEFINED',
    price3:price3 || 'NOT_DEFINED',
    price4:price4 || 'NOT_DEFINED',
    stock : stock || 99 ,
    soldCount : 0 ,
    created_at:firestore.Timestamp.fromDate(new Date())
})