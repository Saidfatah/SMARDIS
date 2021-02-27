import Storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

export default async (args,state,dispatch)=>{
    try {
       const {product,navigation,admin}= args
       let products = [...state.products.products]
       const newProducts  = products.filter(p => p.id != product.id) 
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

      

        
       dispatch.toast.show({
           type:'success',
           title:'Supprision ',
           message:`Produit ${product.name} est supprimer avec success`
       })
       dispatch.products.removedProduct(newProducts)
       navigation.goBack()
    } catch (error) {
        console.log(error)
        dispatch.products.removingProductFailed()
    }
}