import {categoryModel} from "../Schemas/categoryModel"
import Storage from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"
import asyncStorage from '@react-native-async-storage/async-storage'




export default async (args,state,dispatch)=>{
    try {
       const {name,navigation,image,type,parent,selectedProducts,isSpecial}= args
       let categories = [...state.categories.categories]
       
       //check if name exists
       const checkNameResponse= await firestore()
                         .collection("categories")
                         .where("name","==",name)
                         .get()
       if(checkNameResponse.docs.length) throw new Error("NAME_USED")

       //upload image
        let imageUri = image     
        let newCategory = null 
        let created_doc_id=null
        if(imageUri != "NO_IMAGE")
       {
           const task =  Storage().ref('categoryImages/'+name).putFile(imageUri);
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
                     imageUri=url || 'NO_IMAGE'
                     newCategory = categoryModel(name,imageUri,false,type,parent,isSpecial)
                     const addResponse= firestore()
                                     .collection("categories")
                                     .add(newCategory)
                     const addedCategoryId= (await addResponse).id
                     created_doc_id=addedCategoryId
             
                    //check if category has selcted products if so add the categories d to 
                    //the slected products category array field 
                    if(selectedProducts.length>0){
                       selectedProducts.forEach(async productId => {
                           const updateProductResponse= await firestore()
                                .collection("products")
                                .doc(productId)
                                .update({
                                    category:firestore.FieldValue.arrayUnion(addedCategoryId)
                                })
                       });
                    }
            
                   }).catch(err=>console.log(err))
               }
            )
           await task
         
        //add doc
        
        }else{
        newCategory = categoryModel(name,"NO_IMAGE",false,type,parent,isSpecial)
        const addResponse= firestore()
                          .collection("categories")
                          .add(newCategory)
         const addedCategoryId= (await addResponse).id
         created_doc_id=addedCategoryId
 
         //check if category has selcted products if so add the categories d to 
         //the slected products category array field 
         if(selectedProducts.length>0){
            selectedProducts.forEach(async productId => {
                const updateProductResponse= await firestore()
                     .collection("products")
                     .doc(productId)
                     .update({
                         category:firestore.FieldValue.arrayUnion(addedCategoryId)
                     })
            });
         }
 

       }
      
       const categories_first_fetch = state.categories.categories_first_fetch
       if(newCategory != null && created_doc_id!=null && !categories_first_fetch ){
        newCategory.id= created_doc_id
        categories.push(newCategory)

        categories= categories.sort(function(a, b){
           if(a.name < b.name) { return -1; }
           if(a.name > b.name) { return 1; }
           return 0;
         })
        
         dispatch.categories.addedCategory({categories})
         const cache={
          day_of_creation: new Date().getDate(),
          categories
         }
         await  asyncStorage.setItem("CATEGORIES",JSON.stringify(cache))

         //update selected products if theur exist 
         if(selectedProducts.length>0){
             const products = [...state.products.products].map(product=>{
               if(selectedProducts.indexOf(product.id)>=0){
                   return {...product,category:[...product.category,created_doc_id]}
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
         

       }


       dispatch.toast.show({
           type:"success",
           title:"Ajoute ",
           message:`Category ${name} est ajouter avec success`
       })
       
       navigation.navigate("ADMINcategories")
   } catch (error) {
       console.log(error)
       if(error.message == "NAME_USED")
         return dispatch.categories.addingCategoryFailed({id:"NAME_USED",message:"le nom du category est deja utuliser"})

      dispatch.categories.addingCategoryFailed({id:"ADD_FAILED",message:"ne peut pas ajouter la category d'abord"})
   }
}