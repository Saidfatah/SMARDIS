import firestore from '@react-native-firebase/firestore'
import {productModel} from '../Schemas/productModel'
import Storage from '@react-native-firebase/storage'

export default async  (args,state,dispatch)=>{
    try {
       const {navigation,name,regions,category,image,ref,price1,price2,price3,price4,subCategory}=args
       let products = [...state.products.products]
   
       //check if ref is already used 
       const checkRefResponse= firestore()
                           .collection('products')
                           .where('ref','==',ref)
                           .get()
       if((await checkRefResponse).docs.length) throw Error('REF_USED')                 
       //check if name is already used 
       const checkNameResponse= firestore()
                           .collection('products')
                           .where('name','==',name)
                           .get()
       if((await checkNameResponse).docs.length) throw Error('NAME_USED')      
       
       //uploadImage then get the uri and use it in 
       
       let imageUri = image
       if(imageUri != "NO_IMAGE")
       {
           const task =  Storage().ref('productImages/'+name).putFile(imageUri);
            task.on('state_changed', 
                sn =>{},
                err=>console.log(err),
                () => {
                   console.log('Photo uploaded!'+name)
                   Storage()
                   .ref("productImages").child(name).getDownloadURL()
                   .then(url => {
                     console.log('uploaded image url', url);
                     imageUri=url
                   }).catch(err=>console.log(err))
               }
            )
            await task
       }

       //add to firestore
       const newProduct = productModel(name,category,imageUri,price1,ref,price2,price3,price4,subCategory,regions)

       const addResponse= firestore()
                         .collection('products')
                         .add(newProduct)
      
       products.push(newProduct)
       dispatch.toast.show({
           type:'success',
           title:'Ajoute ',
           message:`Produit ${name} est ajouter avec success`
       })
       navigation.navigate('ADMINproducts')
       dispatch.products.addedProduct(products)
    } catch (error) {
        console.log(error)
        if(error.message == "NAME_USED")
         return  dispatch.products.addingProductFailed({id:"NAME_USED",message:"le titre du produit est deja utuliser"})
        if(error.message == "REF_USED")
         return  dispatch.products.addingProductFailed({id:"REF_USED",message:"le référence du produit est deja utuliser"})
       dispatch.products.addingProductFailed({id:"ADDING_FAILED",message:"ne peut pas ajouter ce produit d'abord"})
    }
}