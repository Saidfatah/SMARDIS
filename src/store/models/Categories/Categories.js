import {categoryModel} from './Schemas/categoryModel'
import Storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'



const OTHER_CATEGORY_ID="snnGC98TUUzJYTIkDFDq"
const model ={
    state:{
        categories       : [],
        selected_Categories : [],
        selectedCategoryProducts :[],
        selectedCategory : "0hxbmFxnEtU05QcWbaxv" , 
        categoriesCount  : 0,

        categoryImageUploadState: "STALE" ,//"UPLOADING" || "FAILED"  || "DONE" || "STALE"
        uploadedCategoryImageUri : null ,

        done_fetching_categories : false,
        categories_first_fetch : false,
        category_has_products : false,
        done_adding_category : false,
        done_removing_category : false,
        last_selected_Category:null,
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
            done_adding_category:true
        }),
        addingCategoryFailed : (state,args)=>({
            ...state,
            done_adding_category:true
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
        uploadedCategoryImage : (state,{url,name,productImageUploadState})=>({
            ...state,
            categoryImageUploadState:"DONE",
            productImageUploadState: "STALE",
            uploadedCategoryImageUri:url
        }),
        categoryImageUploadFailed : (state,args)=>({
            ...state,
            categoryImageUploadState:"FAILED",
            productImageUploadState: "STALE",
            uploadedCategoryImageUri:"NO_IMAGE"
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
    },
    effects: (dispatch)=>({
        async selectCategory(selectedCategory,state){
            try {
                const last_selected_Category=state.categories.last_selected_Category

                if(selectedCategory == last_selected_Category) return 
                //get the selcted category products 
                //use arrya of array of products 
                //key is category
                //value s product
                //[category:"id",products:[]]
                const productsResponse= await firestore()
                                              .collection('products')
                                              .where('category','==',selectedCategory)
                                              .get()
                      
                 const docs =productsResponse.docs
                 if(docs.length>0)
                 {
                     const products = docs.map(doc=>({...doc.data(), id : doc.id}))
                     dispatch.categories.setedSelectedCategoryProducts({
                         products,
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
                console.log('error')
            }
        },
        async fetchCategories(somthing,state){
            try {
                const categories_first_fetch = state.categories.categories_first_fetch

                if(categories_first_fetch) return 

                const categoriesResponse= await firestore().collection('categories')
                categoriesResponse.onSnapshot(res=>{
                    const docs =res.docs
                    if(docs){
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
        async addCategory({name,navigation,image},state){
             try {
                let categories = [...state.categories.categories]
                const newCategory = categoryModel(name,image)
                
                const addResponse= firestore()
                                  .collection('categories')
                                  .add(newCategory)
   
   
                newCategory.id= addResponse.id
                categories.unshift(newCategory)
   
                dispatch.toast.show({
                    type:'success',
                    title:'Ajoute ',
                    message:`Category ${name} est ajouter avec success`
                })
                dispatch.categories.addedCategory(categories)
                navigation.navigate('ADMINcategories')
            } catch (error) {
                console.log(error)
                dispatch.categories.addingCategoryFailed()
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
                   type:'success',
                   title:'Modification ',
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
                                        .collection('categories')
                                        .doc(id)
                                        .delete()
   
                //remove category image from storage
                if(image != "NO_IMAGE" && image.indexOf('categoryImages%2F')>-1){
                    const imageName =  image.split('categoryImages%2F')[1].split("?alt")[0] 
                    if(imageName){
                           var imageRef =  Storage().ref('categoryImages').child(imageName);
                           const imageRemove = await imageRef.delete() 
                           console.log('removed image')
                    }
               }
                
                //set this category's products category to other category 
                const associatedProductsRef=await firestore()
                                                 .collection('products')
                                                 .where('category','==',id)
                                                 .get()
                 associatedProductsRef.docs.forEach(doc => {
                     doc.ref.update({category:OTHER_CATEGORY_ID})
                 });
   
                dispatch.toast.show({
                    type:'success',
                    title:'Supprision ',
                    message:`Category ${name} est supprimer avec success`
                 })
                dispatch.categories.removedCategory(categories)
                
                navigation.goBack()
             } catch (error) {
                 console.log(error)
                 dispatch.categories.removingCategoryFailed()
             }
        },
        async uploadCategoryImage({image_uri,name},state){
            try {
                const task =  Storage().ref('categoryImages/'+name).putFile(image_uri);
               
                task.on('state_changed', 
                    sn =>{},
                    err=>console.log(err),
                    () => {
                       console.log('Photo uploaded!'+name)
                       Storage()
                       .ref("categoryImages").child(name).getDownloadURL()
                       .then(url => {
                         console.log('uploaded image url', url);
                         dispatch.categories.uploadedCategoryImage({url,name})
                       }).catch(err=>console.log(err))
                   }
                )
                await task 
            } catch (error) {
                console.log(error)
                dispatch.categories.categoryImageUploadFailed()
            }
        },
        resetIsDone(field,state){
            dispatch.categories.reseted(field)
        }
    })
}
export default model
