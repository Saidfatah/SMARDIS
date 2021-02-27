import firestore from '@react-native-firebase/firestore'
import Storage from '@react-native-firebase/storage'

export default async  (args,state,dispatch)=>{
    try {
    const {id,navigation,name,regions,category,image,ref,price1,price2,price3,price4}=args
    let products = [...state.products.products]
    const targetProduct= products.filter(p=>p.ref == ref)[0]
    const targetProductIndex= products.indexOf(targetProduct)
    products[targetProductIndex] = {...targetProduct,targetProduct,name,category,image,price1,price2,price3,price4}
    
    const updateResponse= await firestore()
                                .collection("products")
                                .doc(id)
                                .update({regions,name,category,image,price1,price2,price3,price4});
 
 
    dispatch.toast.show({
        type:'success',
        title:'Ajoute ',
        message:`Produit ${name} est modifier avec success`
    })
    dispatch.products.updatedProduct(products)
    navigation.navigate('ADMINproducts')
    } catch (error) {
        console.log(error)
    }
}