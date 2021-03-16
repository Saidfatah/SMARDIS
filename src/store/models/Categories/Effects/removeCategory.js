import Storage from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"
import asyncStorage from '@react-native-async-storage/async-storage'


const OTHER_CATEGORY_ID="snnGC98TUUzJYTIkDFDq"
export default async (args,state,dispatch)=>{
    try {
       const {category,navigation} = args
       const {name,id,image} = category
      

       //remove category  doc
       const categoryRef=await firestore()
                               .collection("categories")
                               .doc(id)
                               .delete()

       //remove category image from storage
       if(image != "NO_IMAGE" && image.indexOf("categoryImages%2F")>-1){
           const imageName =  image.split("categoryImages%2F")[1].split("?alt")[0] 
           if(imageName){
                  var imageRef =  Storage().ref("categoryImages").child(imageName);
                  const imageRemove = await imageRef.delete() 
                  console.log("removed image")
           }
      }
       
       //set this category"s products category to other category 
       let categoryPorducts=[]
       const associatedProductsRef=await firestore()
                                        .collection("products")
                                        .where("category","array-contains",id)
                                        .get()
        associatedProductsRef.docs.forEach(doc => {
            categoryPorducts.push(doc.id)
            if(doc.data().category.length <1){
                doc.ref.update({category:[OTHER_CATEGORY_ID]})
           }else{
                doc.ref.update({category:firestore.FieldValue.arrayRemove(id)})
            }
        });


        const categories_first_fetch = state.categories.categories_first_fetch
        if(!categories_first_fetch){
            let categories = [...state.categories.categories].filter(c => c.id !=id) 
    
            
             //update selected products if theur exist 
             if(categoryPorducts.length>0){
                 console.log('category removed has prodcust ')
                 console.log(category.id)
                 
                 const products = [...state.products.products].map(product=>{
                   if(categoryPorducts.indexOf(product.id)>=0){
                       let productCategories= [...product.category]
                       const categoryIndex=productCategories.indexOf(category.id)
                       productCategories.splice(categoryIndex,1)
                       return {...product,category:productCategories}
                   }
                   return product
                 })
     
                 dispatch.products.updatedProduct({products})
     
                 const day_of_creation =new Date().getDate()
                 const cache={
                     day_of_creation,
                     products
                 }
                await  asyncStorage.setItem("PRODUCTS",JSON.stringify(cache))
             }


            dispatch.categories.removedCategory({categories})
            const day_of_creation =new Date().getDate()
            const cache={
             day_of_creation,
             categories
            }
            await  asyncStorage.setItem("CATEGORIES",JSON.stringify(cache))
        }


       dispatch.toast.show({
           type:"success",
           title:"Supprision ",
           message:`Category ${name} est supprimer avec success`
        })
       
       
       navigation.goBack()
    } catch (error) {
        console.log(error)
        dispatch.categories.removingCategoryFailed()
    }
}