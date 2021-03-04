import firestore from "@react-native-firebase/firestore"
import Storage from "@react-native-firebase/storage"

const DISCOUNT_CATEGORY="1111POROMOTION1111"
export default async (args,state,dispatch)=>{
    try {
        const {id,name,image,navigation,selectedProducts} =args
        let categories = [...state.categories.categories]
        let products = [...state.products.products]
        const targetCategory= categories.filter(c=>c.id == id)[0]
        const targetCategoryIndex= categories.indexOf(targetCategory)
        categories[targetCategoryIndex] = {...targetCategory,name,image}
    
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
        


         console.log({selectedProducts})
        
         console.log('selectedProducts:'+selectedProducts.length)
         const categoryProductsIds = products.filter(p=>p.category.indexOf(id)>-1).map(p=>p.id)
         
         if(categoryProductsIds.length >0){
                     console.log("category has  products ")

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
             console.log("category has no products ")
             console.log({selectedProducts})
                    selectedProducts.forEach(async productId => {
                        const updateProductResponse= await firestore()
                             .collection("products")
                             .doc(productId)
                             .update({
                                 category:firestore.FieldValue.arrayUnion(id)
                             })
                    });
         }
    


        dispatch.toast.show({
           type:"success",
           title:"Modification ",
           message:`Category ${name} est modifier avec success`
        })
        dispatch.categories.updatedCategory(categories)
        navigation.navigate("ADMINcategories")
        
    } catch (error) {
        console.log(error)
    }
}