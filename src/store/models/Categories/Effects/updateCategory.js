import firestore from "@react-native-firebase/firestore"
import Storage from "@react-native-firebase/storage"

export default async (args,state,dispatch)=>{
    try {
        const {id,name,image,navigation,selectedProducts} =args
        let categories = [...state.categories.categories]
        let products = [...state.products.products]
        const targetCategory= categories.filter(c=>c.id == id)[0]
        const targetCategoryIndex= categories.indexOf(targetCategory)
        categories[targetCategoryIndex] = {...targetCategory,name,image}

        const updateResponse= await firestore()
                                    .collection("categories")
                                    .doc(id)
                                    .update({name,image});


         console.log({selectedProducts})
        
         console.log('selectedProducts:'+selectedProducts.length)
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
                        const updateProductResponse= await firestore()
                             .collection("products")
                             .doc(productId)
                             .update({
                                 category:firestore.FieldValue.arrayRemove(id)
                             })
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