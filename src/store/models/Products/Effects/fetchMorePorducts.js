import firestore from '@react-native-firebase/firestore'
const PRODUCTS_FETCH_LIMIT = 8
export default async (arg,state,dispatch)=>{
    return 
    try {
        const last_visible_Product = state.products.last_visible_Product
        const productsCount        = state.products.productsCount
        const prevProducts =  [...state.products.products]
        if(prevProducts.length >= productsCount) return console.log('end of list ')

        const moreProductsResponse= await firestore()
                                .collection('products')
                                .orderBy('category','desc')
                                .orderBy('ref','desc')
                                .startAt(last_visible_Product)
                                .limit(PRODUCTS_FETCH_LIMIT)
                                .get()
                            
        const docs = moreProductsResponse.docs

        
        prevProducts.pop()
        const newProducts  = docs.map(doc=>({...doc.data(),d :doc.id}))

        dispatch.products.fetchedProducts({
            products : [...prevProducts,...newProducts],
            last_visible_Product : newProducts[newProducts.length -1].ref
        })              
       
    } catch (error) {
        console.log(error)
    }
    
}