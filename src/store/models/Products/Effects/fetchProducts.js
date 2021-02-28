import firestore from '@react-native-firebase/firestore'

export default async(args,state,dispatch)=>{
    try {
       const products_first_fetch = state.products.products_first_fetch
       if(products_first_fetch) return
              

        const userType = state.auth.userType
        let productsResponse
        if(userType == "DISTRUBUTOR"){
            const distrubutorCity= state.auth.user.city.toLowerCase()
   
            productsResponse= await firestore()
                                    .collection('products')
                                    .where('regions','array-contains',distrubutorCity)
        }else{
            productsResponse= await firestore()
                                   .collection('products')
        }
                               
       productsResponse.onSnapshot(res=>{
           const docs =res.docs
           if(docs.length){
               const products = docs.map(doc=>({...doc.data(), id : doc.id}))
               return  dispatch.products.fetchedProducts({
                    products,
                    last_visible_Product:products[products.length -1].ref
                })
           } 
           dispatch.products.productsFetchingFailed()
       })
       
        
    } catch (error) {
        console.log("----fetchProducts --------")
        console.log(error)
        dispatch.products.productsFetchingFailed()
    }
}