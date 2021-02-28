import firestore from "@react-native-firebase/firestore"

export default async (somthing,state,dispatch)=>{
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
}