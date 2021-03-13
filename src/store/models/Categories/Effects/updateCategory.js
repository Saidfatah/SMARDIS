import firestore from "@react-native-firebase/firestore"
import Storage from "@react-native-firebase/storage"
import asyncStorage from '@react-native-async-storage/async-storage' 


const DISCOUNT_CATEGORY="1111POROMOTION1111"
export default async (args,state,dispatch)=>{
    try {
        const {id,name,image,navigation,selectedProducts} =args
        let products = [...state.products.products]
        
    
        if(image !="NO_IMAGE" ){

              if( image.toString().indexOf("categoryImages%") < 0){
                const task =  Storage().ref('categoryImages/'+name).putFile(image);
                task.on('state_changed', 
                    sn =>{},
                    err=>{
                        console.log(err)
                    },
                     async () => {
                       Storage()
                       .ref("categoryImages").child(name).getDownloadURL()
                       .then(async url => {
                         console.log('uploaded image url', url);
                         const updateResponse= await firestore()
                         .collection("categories")
                         .doc(id)
                         .update({name,image:url || 'NO_IMAGE'});
                       }).catch(err=>console.log(err))
                   }
                )
               await task
              }else{
                   const updateResponse= await firestore()
                   .collection("categories")
                   .doc(id)
                  .update({name,image});
              }
        }else{
            const updateResponse= await firestore()
            .collection("categories")
            .doc(id)
            .update({name,image});
        }
        

        const categoryProductsIds = products.filter(p=>p.category.indexOf(id)>-1).map(p=>p.id)
        if(categoryProductsIds.length >0){
                    //selectedProducts =>[id,id,id,id] basically list of product ids 
                    //check if we have selected products from the update screen 
                    const newlySelected  = selectedProducts.filter(selectedProductId=> categoryProductsIds.indexOf(selectedProductId)<0 )
                    const unSelected= categoryProductsIds.filter(categoryProductId=> selectedProducts.indexOf(categoryProductId)<0 )
                  
                   console.log({unSelected})
                   console.log({newlySelected})
                   //I'm updating category for only newly selected because if  just did update for all selected
                   //products we might add category d two times to a product 
                    newlySelected.forEach(async productId => {
                        const updateProductResponse= await firestore()
                             .collection("products")
                             .doc(productId)
                             .update({
                                 category:firestore.FieldValue.arrayUnion(id)
                             })
                    });

                    //remove category id for teh unselected products 
                    unSelected.forEach(async productId => {
                        let update ={
                            category:firestore.FieldValue.arrayRemove(id)
                        }
                        if(id==DISCOUNT_CATEGORY){
                            update.discount=0
                        } 
                        const updateProductResponse= await firestore()
                             .collection("products")
                             .doc(productId)
                             .update(update)
                        });
        }else if(categoryProductsIds.length <1){
                    selectedProducts.forEach(async productId => {
                        const updateProductResponse= await firestore()
                             .collection("products")
                             .doc(productId)
                             .update({
                                 category:firestore.FieldValue.arrayUnion(id)
                             })
                    });
        }
    
       
         //update in cache from 
         const categories_first_fetch = state.products.categories_first_fetch
         if(!categories_first_fetch){
             let categories = [...state.categories.categories]
             const targetCategory= categories.filter(c=>c.id == id)[0]
             const targetCategoryIndex= categories.indexOf(targetCategory)
             categories[targetCategoryIndex] = {...targetCategory,name,image}

          
             const day_of_creation =new Date().getDate()
             const cache={
              day_of_creation,
              categories
             }
             await  asyncStorage.setItem("CATEGORIES",JSON.stringify(cache))
             dispatch.categories.updatedCategory({categories})
         }



        dispatch.toast.show({
           type:"success",
           title:"Modification ",
           message:`Category ${name} est modifier avec success`
        })
        
        navigation.navigate("ADMINcategories")
        
    } catch (error) {
        console.log(error)
    }
}