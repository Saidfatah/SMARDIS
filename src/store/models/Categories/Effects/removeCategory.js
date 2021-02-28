import Storage from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"

const OTHER_CATEGORY_ID="snnGC98TUUzJYTIkDFDq"
export default async (args,state,dispatch)=>{
    try {
       const {category,navigation} = args
       const {name,id,image} = category
       //remove from redux side
       let categories= [...state.categories.categories]
       const targetCategory = categories.filter(c=>c.id == id)[0]
       const targetCategoryIndex = categories.indexOf(targetCategory)
       categories.splice(targetCategoryIndex,1)

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
       const associatedProductsRef=await firestore()
                                        .collection("products")
                                        .where("category","array-contains",id)
                                        .get()
        associatedProductsRef.docs.forEach(doc => {
            if(doc.data().category.length <1){
                doc.ref.update({category:[OTHER_CATEGORY_ID]})
           }else{
                doc.ref.update({category:firestore.FieldValue.arrayRemove(id)})
            }
        });

       dispatch.toast.show({
           type:"success",
           title:"Supprision ",
           message:`Category ${name} est supprimer avec success`
        })
       dispatch.categories.removedCategory(categories)
       
       navigation.goBack()
    } catch (error) {
        console.log(error)
        dispatch.categories.removingCategoryFailed()
    }
}