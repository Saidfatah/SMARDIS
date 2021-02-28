import {categoryModel} from "../Schemas/categoryModel"
import Storage from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"

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
       if(imageUri!="NO_IMAGE"){
           const task =  Storage().ref("categoryImages/"+name).putFile(imageUri);
            task.on("state_changed", 
                sn =>{},
                err=>console.log(err),
                () => {
                   console.log("Photo uploaded!"+name)
                   Storage()
                   .ref("categoryImages").child(name).getDownloadURL()
                   .then(url => {
                     console.log("uploaded image url", url);
                     imageUri=url
                   }).catch(err=>console.log(err))
               }
            )
            await task 
       }

       //add to frestore 
       const newCategory = categoryModel(name,imageUri,false,type,parent,isSpecial)
       const addResponse= firestore()
                         .collection("categories")
                         .add(newCategory)
        const addedCategoryId= (await addResponse).id
        newCategory.id=addedCategoryId

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

       categories.unshift(newCategory)

       dispatch.toast.show({
           type:"success",
           title:"Ajoute ",
           message:`Category ${name} est ajouter avec success`
       })
       dispatch.categories.addedCategory(categories)
       navigation.navigate("ADMINcategories")
   } catch (error) {
       console.log(error)
       if(error.message == "NAME_USED")
         return dispatch.categories.addingCategoryFailed({id:"NAME_USED",message:"le nom du category est deja utuliser"})

      dispatch.categories.addingCategoryFailed({id:"ADD_FAILED",message:"ne peut pas ajouter la category d'abord"})
   }
}