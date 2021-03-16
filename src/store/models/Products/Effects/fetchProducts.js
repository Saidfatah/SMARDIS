import firestore from '@react-native-firebase/firestore'
import asyncStorage from '@react-native-async-storage/async-storage'

const CONFIG_DOC="000CONFIG000"
export default async(args,state,dispatch)=>{
    try {
          
        const PRODUCTS = await asyncStorage.getItem('PRODUCTS')

        if(PRODUCTS != undefined && PRODUCTS!=null){
             const {products,day_of_creation}= JSON.parse(PRODUCTS) 
             const current_day= new Date().getDate()

             
             if(current_day  == day_of_creation ){
                 return dispatch.products.fetchedProducts({
                     products,
                     products_first_fetch:false,
                 })
             }
        } 
    
      
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
            productsResponse= await firestore().collection('products')
        }
                               
       productsResponse.onSnapshot(async res=>{
           const docs =res.docs
           if(docs.length){
               const maped_data = docs.map(doc=>({...doc.data(), id : doc.id}))
               const products = maped_data
               .sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
               })
               .filter(p=>p.id != CONFIG_DOC)

               if(products.length <1) return  dispatch.products.productsFetchingFailed()
               

               console.log("products fetched :"+products.length)

               //write to cache
               const day_of_creation =new Date().getDate()
               const cache={
                day_of_creation,
                products
               }
               await  asyncStorage.setItem("PRODUCTS",JSON.stringify(cache))

               return  dispatch.products.fetchedProducts({
                    products,
                    products_first_fetch:true,
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