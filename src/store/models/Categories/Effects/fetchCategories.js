import firestore from "@react-native-firebase/firestore"


const CONFIG_DOC="0000CONFIG0000"
export default async (somthing,state,dispatch)=>{
    try {
        const categories_first_fetch = state.categories.categories_first_fetch

        if(categories_first_fetch) return 

        const categoriesResponse= await firestore().collection("categories")
        categoriesResponse.onSnapshot(res=>{
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