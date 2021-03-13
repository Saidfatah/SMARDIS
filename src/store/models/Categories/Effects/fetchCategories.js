import firestore from "@react-native-firebase/firestore"
import asyncStorage from '@react-native-async-storage/async-storage'


const CONFIG_DOC="0000CONFIG0000"
export default async (somthing,state,dispatch)=>{
    try {
        const CATEGORIES = await asyncStorage.getItem('CATEGORIES')

        if(CATEGORIES != undefined && CATEGORIES!=null){
             const {categories,day_of_creation}= JSON.parse(CATEGORIES) 
             const current_day= new Date().getDate()
             
             if(current_day == day_of_creation ){
                return dispatch.categories.fetchedCategories({
                    categories,
                    products_first_fetch:false
                })
             }
        } 


        const categories_first_fetch = state.categories.categories_first_fetch

        if(categories_first_fetch) return 

        const categoriesResponse= await firestore().collection("categories")
        categoriesResponse.onSnapshot(async res=>{
            const docs =res.docs
            if(docs.length){
                const maped_data = docs.map(doc=>({...doc.data(),id:doc.id}))
                const categories = maped_data
                .sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
                .filter(category=> category.id != CONFIG_DOC)

                 //write to cache
                 const day_of_creation =new Date().getDate()
                 const cache={
                  day_of_creation,
                  categories
                 }
                 await  asyncStorage.setItem("CATEGORIES",JSON.stringify(cache))

                return dispatch.categories.fetchedCategories({
                    categories,
                    products_first_fetch:true
                })
            }
            dispatch.categories.categoriesFetchFailed()
        })
        
    } catch (error) {
        console.log("-----fetchCategories-----")
        console.log(error)
        dispatch.categories.categoriesFetchFailed()
    }
}