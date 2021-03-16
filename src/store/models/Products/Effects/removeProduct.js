import Storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'

export default async (args,state,dispatch)=>{
    try {
       const {product,navigation,admin}= args
       const {image}=product

        //remove product image 
        if(image != "NO_IMAGE" && image.indexOf('productImages%2F')>-1){
            
           let imageName =  (image||"").split('productImages%2F')[1].split("?alt")[0]
           imageName= imageName.replace('%20',' ')
           if(imageName){
                  //check ifimage exists in storage
                  var imageRef =  Storage().ref('productImages').child(imageName);
                  const imageRemove = await imageRef.delete() 
           }
       }
       //remove doc 
       const distrubutorRef=await firestore()
       .collection('products')
       .doc(product.id)
       .delete()

      
        //delete from 
        const products_first_fetch = state.products.products_first_fetch
        if(!products_first_fetch){
            let products = [...state.products.products].filter(p => p.id != product.id) 
    
            dispatch.products.removedProduct({products})
            
            const day_of_creation =new Date().getDate()
            const cache={
             day_of_creation,
             products
            }

            await  asyncStorage.setItem("PRODUCTS",JSON.stringify(cache))
        }

        
        dispatch.toast.show({
            type:'success',
            title:'Supprision ',
            message:`Produit ${product.name} est supprimer avec success`
        })
        navigation.goBack()
    } catch (error) {
        console.log(error)
        dispatch.products.removingProductFailed()
    }
}