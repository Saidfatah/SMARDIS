import {productModel} from './Schemas/productModel'
import Storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'


const PRODUCTS_FETCH_LIMIT = 8
const model ={
    state:{
        products         : [],
        productsCount    : 0,
        productImageUploadState: "STALE" ,//"UPLOADING" || "FAILED"  || "DONE" || "STALE"
        uploadedProductImageUri : null ,
        products_first_fetch : false,
        done_fetching_products : false,
        last_visible_Product:null,
        done_adding_product:false,
        done_removing_product:false,
    },
    reducers:{
        fetchedProducts : (state,{products,last_visible_Product})=>({
            ...state,
            products :[...products],
            products_first_fetch:true,
            done_fetching_products:true,
            last_visible_Product
        }),
        productsFetchingFailed : (state,{products,last_visible_Product})=>({
            ...state,
            products :[],
            products_first_fetch:false,
            done_fetching_products:true,
        }),
        fetchedProductsCount : (state,productsCount)=>({
            ...state,
            productsCount  
        }),
        addedProduct : (state,products)=>({
            ...state,
            products :[...products],
            productsCount :state.productsCount +1,
            done_adding_product:true
        }),
        addingProductFailed : (state,products)=>({
            ...state,
            done_adding_product:true
        }),
        uploadedProductImage : (state,{url,name,productImageUploadState})=>({
            ...state,
            categoryImageUploadState:"STALE",
            productImageUploadState:"DONE",
            uploadedProductImageUri:url
        }),
        productImageUploadFailed : (state,args)=>({
            ...state,
            productImageUploadState:"FAILED",
            categoryImageUploadState:"STALE",
            uploadedProductImageUri:"NO_IMAGE"
        }),
        setedProductCategory : (state,products)=>({
            ...state,
            products :[...products]
        }),
        updatedProduct : (state,products)=>({
            ...state,
            products :[...products]
        }),
        removedProduct : (state,products)=>({
            ...state,
            products :[...products],
            productsCount :state.productsCount -1,
            done_removing_product:true
        }),
        removingProductFailed : (state,args)=>({
            ...state,
            done_removing_product:true
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
    },
    effects: (dispatch)=>({
        async fetchProducts(somthing,state){
             try {
                const products_first_fetch = state.products.products_first_fetch
                if(products_first_fetch) return

                 const productsResponse= await firestore()
                                              .collection('products')
                                              .orderBy('category','desc')
                                              
                                            //   .orderBy('ref','desc')
                                            //   .limit(PRODUCTS_FETCH_LIMIT)
                                            //   .get()
                productsResponse.onSnapshot(res=>{
                    const docs =res.docs
                    if(!docs) return dispatch.products.productsFetchingFailed()
                    const products = docs.map(doc=>({...doc.data(), id : doc.id}))
                    dispatch.products.fetchedProducts({
                        products,
                        last_visible_Product:products[products.length -1].ref
                    })
                })
                
                 
             } catch (error) {
                 console.log("----fetchProducts --------")
                 console.log(error)
                 dispatch.products.productsFetchingFailed()
             }
        },
        async fetchMoreProducts(arg,state){
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
            
        },
        async fetchProductsCount(somthing,state){
             try {
                const productsResponse= await firestore()
                                                 .collection('products')
                                                 .get()
                 const count = productsResponse.docs.length
                 
                 dispatch.products.fetchedProductsCount(count)
             } catch (error) {
                 console.log(error)
             }
        },
        async addProduct({navigation,name,category,image,ref,price1,price2,price3,price4},state){
             try {
                let products = [...state.products.products]
                const newProduct = productModel(name,category,image,price1,ref,price2,price3,price4)
                
                //check if ref is already used 
                //check if name is already used 
                //remove from firestore
                const addResponse= firestore()
                                  .collection('products')
                                  .add(newProduct)
               
                products.push(newProduct)
                dispatch.toast.show({
                    type:'success',
                    title:'Ajoute ',
                    message:`Produit ${name} est ajouter avec success`
                })
                navigation.navigate('ADMINproducts')
                dispatch.products.addedProduct(products)
             } catch (error) {
                 console.log(error)
                 dispatch.products.addingProductFailed()
             }
        },
        async updateProduct({id,navigation,name,category,image,ref,price1,price2,price3,price4},state){
            try {
                let products = [...state.products.products]
            const targetProduct= products.filter(p=>p.ref == ref)[0]
            const targetProductIndex= products.indexOf(targetProduct)
            products[targetProductIndex] = {...targetProduct,targetProduct,name,category,image,price1,price2,price3,price4}
            
            const updateResponse= await firestore()
                                        .collection("products")
                                        .doc(id)
                                        .update({name,category,image,price1,price2,price3,price4});
         
         
            dispatch.toast.show({
                type:'success',
                title:'Ajoute ',
                message:`Produit ${name} est modifier avec success`
            })
            dispatch.products.updatedProduct(products)
            navigation.navigate('ADMINproducts')
            } catch (error) {
                console.log(error)
            }
        },
        async removeProduct({product,navigation,admin},state){
             try {
                let products = [...state.products.products]
                const newProducts  = products.filter(p => p.id != product.id) 
                const {image}=product
              
                //remove doc 
                const distrubutorRef=await firestore()
                .collection('products')
                .doc(product.id)
                .delete()

                //remove product image 
                if(image != "NO_IMAGE"){
                     const imageName =  image.split('productImages%2F')[1].split("?alt")[0] 
                     if(imageName){
                            var imageRef =  Storage().child('productImages/'+imageName);
                            const imageRemove = await imageRef.delete() 
                            console.log('removed image')
                     }
                }

                 
                dispatch.toast.show({
                    type:'success',
                    title:'Supprision ',
                    message:`Produit ${product.name} est supprimer avec success`
                })
                dispatch.products.removedProduct(newProducts)
                navigation.goBack()
             } catch (error) {
                 console.log(error)
                 dispatch.products.removingProductFailed()
             }
        },
        async uploadProductImage({image_uri,name},state){
            try {
                const task =  Storage().ref('productImages/'+name).putFile(image_uri);
               
                task.on('state_changed', 
                    sn =>{},
                    err=>console.log(err),
                    () => {
                       console.log('Photo uploaded!'+name)
                       Storage()
                       .ref("productImages").child(name).getDownloadURL()
                       .then(url => {
                         console.log('uploaded image url', url);
                         dispatch.products.uploadedProductImage({url,name})
                       }).catch(err=>console.log(err))
                   }
                )
                await task 
            } catch (error) {
                console.log(error)
                dispatch.products.productImageUploadFailed()
            }
        },
        resetIsDone(field,state){
            dispatch.products.reseted(field)
        }

    })
}
export default model
