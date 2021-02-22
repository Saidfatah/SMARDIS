import {categoryModel} from "./Schemas/categoryModel"
import Storage from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"



const OTHER_CATEGORY_ID="snnGC98TUUzJYTIkDFDq"
const model ={
    state:{
        categories       : [],
        selected_Categories : [],
        selectedCategorySubCategories:[],
        selectedCategoryProducts :[],
        selectedCategory : "0hxbmFxnEtU05QcWbaxv" , 
        categoriesCount  : 0,

        done_fetching_categories : false,
        categories_first_fetch : false,
        category_has_products : false,
        done_adding_category : false,
        done_removing_category : false,
        last_selected_Category:null,
        category_add_error:null,
    },
    reducers:{
        setedSelectedCategoryProducts : (state,{products,category_has_products,last_selected_Category,selectedCategory})=>({
            ...state,
            selectedCategoryProducts :products,
            category_has_products,
            last_selected_Category,
            selectedCategory :last_selected_Category ,
        }),
        selectedCategory : (state,last_selected_Category)=>({
            ...state,
            last_selected_Category
        }),
        fetchedCategories : (state,categories)=>({
            ...state,
            categories :[...categories],
            products_first_fetch :true,
            done_fetching_categories : true,
            categoriesCount: categories.length
        }),
        categoriesFetchFailed : (state,categories)=>({
            ...state,
            categories :[],
            done_fetching_categories : true,
        }),
        addedCategory : (state,categories)=>({
            ...state,
            categories :[...categories],
            categoriesCount :state.categoriesCount +1,
            done_adding_category:true,
            category_add_error:null
        }),
        addingCategoryFailed : (state,category_add_error)=>({
            ...state,
            done_adding_category:true,
            category_add_error
        }),
        updatedCategory : (state,categories)=>({
            ...state,
            categories :[...categories]
        }),
        removedCategory : (state,categories)=>({
            ...state,
            categories :[... categories],
            categoriesCount :state.categoriesCount -1,
            done_removing_category:true
        }),
        removingCategoryFailed : (state,args)=>({
            ...state,
            done_removing_category:true
        }),
        selectedSubCategories : (state,{selectedCategorySubCategories})=>({
            ...state,
            selectedCategorySubCategories
        }),
        selectSubCategoriesFailed : (state,args)=>({
            ...state,
            selectedCategorySubCategories:[]
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
    },
    effects: (dispatch)=>({
         selectCategory({selectedCategory,isSub,fromClientPanel},state){
            try {
                console.log({fromClientPanel})
                const products = [...state.products.products]
                let categoryProducts
                if(fromClientPanel){
                     categoryProducts =  products.filter(product=>product.category == selectedCategory )
                }else{
                    if(!isSub){
                        categoryProducts =  products.filter(product=>product.category == selectedCategory  &&  product.subCategory == "NOT_DEFINED")
                    }else{
                        categoryProducts =  products.filter(product=> product.subCategory == selectedCategory )
                    }
                }
       
        
                
                 if(categoryProducts.length>0)
                 {
                     dispatch.categories.setedSelectedCategoryProducts({
                         products:categoryProducts,
                         category_has_products:true,
                         last_selected_Category : selectedCategory
                        })
                 }else{
                     dispatch.categories.setedSelectedCategoryProducts({
                         products:[],
                         category_has_products:false,
                         last_selected_Category : selectedCategory

                        })
                 }
                
                 dispatch.categories.selectedCategory(selectedCategory)

            } catch (error) {
                console.log("--------selectCategory--------")
                console.log(error)
            }
        },
        async fetchCategories(somthing,state){
            try {
                const categories_first_fetch = state.categories.categories_first_fetch

                if(categories_first_fetch) return 

                const categoriesResponse= await firestore().collection("categories")
                categoriesResponse.onSnapshot(res=>{
                    const docs =res.docs
                    if(docs.length){
                        const categories = docs.map(doc=>({...doc.data(),id:doc.id}))
                        return dispatch.categories.fetchedCategories(categories)
                    }
                    dispatch.categories.categoriesFetchFailed()
                })
                
            } catch (error) {
                console.log("-----fetchCategories-----")
                console.log(error)
                dispatch.categories.categoriesFetchFailed()
            }
        },
        async addCategory({name,navigation,image,type,parent},state){
             try {
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
                const newCategory = categoryModel(name,imageUri,false,type,parent)
                const addResponse= firestore()
                                  .collection("categories")
                                  .add(newCategory)
   
   
                newCategory.id= addResponse.id
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
        },
        async updateCategory({id,name,image,navigation},state){
            try {
                let categories = [...state.categories.categories]
                const targetCategory= categories.filter(c=>c.id == id)[0]
                const targetCategoryIndex= categories.indexOf(targetCategory)
                categories[targetCategoryIndex] = {...targetCategory,name,image}
    
                const updateResponse= await firestore()
                                            .collection("categories")
                                            .doc(id)
                                            .update({name,image});
    
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
        },
        async removeCategory({category,admin,navigation},state){
             try {
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
                                                 .where("category","==",id)
                                                 .get()
                 associatedProductsRef.docs.forEach(doc => {
                     doc.ref.update({category:OTHER_CATEGORY_ID})
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
        },
        selectSubCategory(id,state){
            try {
                const categories = state.categories.categories
                const selectedCategorySubCategories = categories.filter(c=> c.type == "SUB" && c.parent.id == id  )
                if(selectedCategorySubCategories.length>0){
                    console.log({selectedCategorySubCategories})
                   return  dispatch.categories.selectedSubCategories({selectedCategorySubCategories})
                }
                dispatch.categories.selectedSubCategories({selectedCategorySubCategories:[]})
            } catch (error) {
                console.log("--------selectSubCategory----------")
                console.log(error)
                dispatch.categories.selectSubCategoriesFailed()
            }
        },
        resetIsDone(field,state){
            dispatch.categories.reseted(field)
        },
    })
}
export default model
