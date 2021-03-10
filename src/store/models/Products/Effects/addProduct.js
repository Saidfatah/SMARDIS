import firestore from '@react-native-firebase/firestore'
import {productModel} from '../Schemas/productModel'
import Storage from '@react-native-firebase/storage'
import asyncStorage from '@react-native-async-storage/async-storage' 

const DISCOUNT_CATEGORY="1111POROMOTION1111"
export default async  (args,state,dispatch)=>{
    try {
       const {navigation,name,regions,category,image,ref,price1,price2,price3,price4,subCategory,discount}=args
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
      
       
         
        const CATEGORY=[category]
      
        //if a discount is applied we add product to discounts category
        if(discount >0){
              CATEGORY.push(DISCOUNT_CATEGORY)
        } 

       //uploadImage then get the uri and use it in 
       let imageUri = image
       let newProduct=null
       let created_doc_id=null
       if(imageUri != "NO_IMAGE")
       {
           const task =  Storage().ref('productImages/'+name).putFile(imageUri);
            task.on('state_changed', 
                sn =>{},
                err=>{
                    console.log(err)
                },
                () => {
                   Storage()
                   .ref("productImages").child(name).getDownloadURL()
                   .then(url => {
                     console.log('uploaded image url', url);
                     imageUri=url
                   }).catch(err=>console.log(err))
               }
            )
           await task
           newProduct = productModel(name,CATEGORY,imageUri,price1,ref,price2,price3,price4,subCategory,regions,discount)

           const addResponse= firestore()
                             .collection('products')
                             .add(newProduct)
           created_doc_id=(await addResponse).id
        }else{
            newProduct = productModel(name,CATEGORY,"NO_IMAGE",price1,ref,price2,price3,price4,subCategory,regions,discount)
            
            const addResponse= firestore()
                              .collection('products')
                              .add(newProduct)

            created_doc_id=(await addResponse).id
       }
      
     
       if(newProduct != null && created_doc_id!=null){
           console.log({created_doc_id})

           newProduct.id= created_doc_id
           products.push(newProduct)

           products= [...products.sort(function(a, b){
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
            })]

         const cache={
          day_of_creation: new Date().getDate(),
          products
         }
         await  asyncStorage.setItem("PRODUCTS",JSON.stringify(cache))
       }
  
      
     
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