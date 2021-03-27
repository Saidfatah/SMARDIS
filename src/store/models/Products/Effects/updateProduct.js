import firestore from '@react-native-firebase/firestore'
import Storage from '@react-native-firebase/storage'
import asyncStorage from '@react-native-async-storage/async-storage'


const DISCOUNT_CATEGORY="1111POROMOTION1111"
export default async  (args,state,dispatch)=>{
    try {
    const {id,navigation,name,regions,category,image,ref,price1,price2,price3,price4,discount,subCategory}=args
    
    let products = [...state.products.products]
    const targetProduct= products.filter(p=>p.ref == ref)[0]
    const targetProductCategories=targetProduct.category

     
    //remove previous man category 
    //don't emove special categories
    let CATEGORY=[]

    if(targetProductCategories.length ==1){
        CATEGORY=[category]
    }else if(targetProductCategories.length >1) {
        CATEGORY=[...targetProductCategories]
        CATEGORY[0]=category
    }

     //if we have applied a discount the product gets added to discountes category
     const hasDiscountCategory = CATEGORY.indexOf(DISCOUNT_CATEGORY)
     if(discount > 0){
       //but check if it hasn't already been added , maybe admin changed discount from .5 to .3 
       if( hasDiscountCategory < 0){
           CATEGORY.push(DISCOUNT_CATEGORY)
       }
     }else{
        //check f product had been in discount category , but admin changed discount to 1 
        if( hasDiscountCategory > -1){
            CATEGORY =[...CATEGORY].filter(c=>c!=DISCOUNT_CATEGORY)
        }
     }
 
    

     if(image !="NO_IMAGE" ){

        if( image.toString().indexOf("productImages%") < 0){
          const task =  Storage().ref('productImages/'+name).putFile(image);
          task.on('state_changed', 
              sn =>{},
              err=>{
                  console.log(err)
              },
               async () => {
                 Storage()
                 .ref("productImages").child(name).getDownloadURL()
                 .then(async url => {
                   console.log('uploaded image url', url);
                   const updateResponse= await firestore()
                   .collection("products")
                   .doc(id)
                   .update({
                       regions,
                       name,
                       category:CATEGORY,
                       image:url||"NO_IMAGE",
                       price1,
                       price2,
                       price3,
                       price4,
                       discount:discount||0
                   });
                 }).catch(err=>console.log(err))
             }
          )
         await task
        }else{
            const updateResponse= await firestore()
            .collection("products")
            .doc(id)
            .update({
                regions,
                name,
                category:CATEGORY,
                image,
                price1,
                price2,
                price3,
                price4,
                discount:discount||0
            });
        }
     }else{
    const updateResponse= await firestore()
    .collection("products")
    .doc(id)
    .update({
        regions,
        name,
        category:CATEGORY,
        image,
        price1,
        price2,
        price3,
        price4,
        discount:discount||0
    }); 
     
     }
  

     //update in cache from 
     const products_first_fetch = state.products.products_first_fetch
     if(!products_first_fetch){
         const targetProductIndex= products.indexOf(targetProduct)
        
         products[targetProductIndex] = {
            ...targetProduct,
            targetProduct,
            name,
            category:CATEGORY,
            image,
            price1,
            price2,
            price3,
            price4
         }

         dispatch.products.updatedProduct({products})
         
         
         const cache={
             month_of_creation: new Date().getMonth(),
             products
         }
         await  asyncStorage.setItem("PRODUCTS",JSON.stringify(cache))
     }

 
    dispatch.toast.show({
        type:'success',
        title:'Ajoute ',
        message:`Produit ${name} est modifier avec success`
    })
    navigation.navigate('ADMINproducts')
    } catch (error) {
        console.log(error)
    }
}