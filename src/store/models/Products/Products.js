import {productModel} from './Schemas/productModel'
import Storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'





const PRODUCTS_FETCH_LIMIT = 8
const model ={
    state:{
        products         : [],
        productsCount    : 0,
        products_first_fetch : false,
        done_fetching_products : false,
        last_visible_Product:null,
        done_adding_product:false,
        done_removing_product:false,
        product_adding_error:null,
    },
    reducers:{
        fetchedProducts : (state,{products,last_visible_Product})=>({
            ...state,
            products :[...products],
            products_first_fetch:true,
            done_fetching_products:true,
            last_visible_Product,
            productsCount:products.length
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
            done_adding_product:true,
            product_adding_error:null
        }),
        addingProductFailed : (state,product_adding_error)=>({
            ...state,
            done_adding_product:true,
            product_adding_error
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
        async addProduct({navigation,name,category,image,ref,price1,price2,price3,price4},state){
             try {
                let products = [...state.products.products]
            
                //check if ref is already used 
                const checkRefResponse= firestore()
                                    .collection('products')
                                    .where('ref','==',ref)
                                    .get()
                if((await checkRefResponse).docs.length) throw Error('REF_USED')                 
                //check if name is already used 
                const checkNameResponse= firestore()
                                    .collection('products')
                                    .where('name','==',name)
                                    .get()
                if((await checkNameResponse).docs.length) throw Error('NAME_USED')      
                
                //uploadImage then get the uri and use it in 
                
                let imageUri = image
                if(imageUri != "NO_IMAGE")
                {
                    const task =  Storage().ref('productImages/'+name).putFile(imageUri);
                     task.on('state_changed', 
                         sn =>{},
                         err=>console.log(err),
                         () => {
                            console.log('Photo uploaded!'+name)
                            Storage()
                            .ref("productImages").child(name).getDownloadURL()
                            .then(url => {
                              console.log('uploaded image url', url);
                              imageUri=url
                            }).catch(err=>console.log(err))
                        }
                     )
                     await task
                }

                //add to firestore
                const newProduct = productModel(name,category,imageUri,price1,ref,price2,price3,price4)

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
                 if(error.message == "NAME_USED")
                  return  dispatch.products.addingProductFailed({id:"NAME_USED",message:"le titre du produit est deja utuliser"})
                 if(error.message == "REF_USED")
                  return  dispatch.products.addingProductFailed({id:"REF_USED",message:"le référence du produit est deja utuliser"})
                dispatch.products.addingProductFailed({id:"ADDING_FAILED",message:"ne peut pas ajouter ce produit d'abord"})
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

                 //remove product image 
                 if(image != "NO_IMAGE" && image.indexOf('productImages%2F')>-1){
                     
                    const imageName =  (image||"").split('productImages%2F')[1].split("?alt")[0] 
                    if(imageName){
                           //check ifimage exists in storage
                           var imageRef =  Storage().ref('productImages').child(imageName);
                           const imageRemove = await imageRef.delete() 
                           console.log('removed image')
                    }
                }
                //remove doc 
                const distrubutorRef=await firestore()
                .collection('products')
                .doc(product.id)
                .delete()

               

                 
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
       
        resetIsDone(field,state){
            dispatch.products.reseted(field)
        }

    })
}
export default model
