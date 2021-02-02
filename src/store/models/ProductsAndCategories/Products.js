import {productModel} from './Schemas/productModel'
import {categoryModel} from './Schemas/categoryModel'
import {categoriesList} from './Schemas/categoriesList'
import Storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
//use async storage here 
//then we an listen for product prices changes 

//diffrente use scenario
//admin - all products - categories 
//vendor

//shpould we store these in cache 
//then lsiten to chanegsin db if something changes we update it in local

//product can have no category and will put them in other category 

const userTypes= ['ADMIN','DISTRIBUTOR']
const PRODUCTS_FETCH_LIMIT = 8
const model ={
    state:{
        products         : [],
        categories       : [],
        selectedCategoryProducts :null,
        selectedCategory : 2 , 
        productsCount    : 0,
        categoriesCount  : 0,
        productImageUploadState: "STALE" ,//"UPLOADING" || "FAILED"  || "DONE" || "STALE"
        uploadedProductImageUri : null ,
        first_fetch : false,
        last_visible_Product:null
    },
    reducers:{
        fetchedProducts : (state,{products,last_visible_Product})=>({
            ...state,
            products :[...products],
            first_fetch:true,
            last_visible_Product
        }),
        fetchedProductsCount : (state,productsCount)=>({
            ...state,
            productsCount  
        }),
        setedSelectedCategoryProducts : (state,products)=>({
            ...state,
            selectedCategoryProducts :products
        }),
        addedProduct : (state,products)=>({
            ...state,
            products :[...products],
            productsCount :state.productsCount +1
        }),
        uploadedProductImage : (state,{url,name,productImageUploadState})=>({
            ...state,
            productImageUploadState:"DONE",
            uploadedProductImageUri:url
        }),
        imageUploadFailed : (state,args)=>({
            ...state,
            productImageUploadState:"FAILED",
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
            productsCount :state.productsCount -1
        }),


        selectedCategory : (state,category)=>({
            ...state,
            selectedCategory :category
        }),
        fetchedCategories : (state,categories)=>({
            ...state,
            categories :[...categories],
            categoriesCount : categories.length
        }),
        addedCategory : (state,categories)=>({
            ...state,
            categories :[...categories],
            categoriesCount :state.categoriesCount +1
        }),
        updatedCategory : (state,categories)=>({
            ...state,
            categories :[...categories]
        }),
        removedCategory : (state,categories)=>({
            ...state,
            categories :[... categories],
            categoriesCount :state.categoriesCount -1
        }),
    },
    effects: (dispatch)=>({

        selectCategory(selectedCategory,state){
            //get the selcted category products 
             const products = state.products.products
             const filterdProducts = [...products].filter(p=>p.category == selectedCategory)
             dispatch.products.selectedCategory(selectedCategory)
             dispatch.products.setedSelectedCategoryProducts(filterdProducts)
        },
        async fetchCategories(somthing,state){
            try {
                // const categoriesResponse=await firestore().collection('categories').get()
                // const docs=  categoriesResponse.docs
                // if(docs.length >0)
                //     docs.map(doc=>({...doc.data(),id:doc.id}))
                dispatch.products.fetchedCategories(categoriesList)
            } catch (error) {
                console.log(error)
            }
        },
        async addCategory({name,navigation,image},state){
             let categories = [...state.products.categories]
             const newCategory = categoryModel(name,image)
             categories.push(newCategory)
              dispatch.toast.show({
                 type:'success',
                 title:'Ajoute ',
                 message:`Category ${name} est ajouter avec success`
             })
             dispatch.products.addedCategory(categories)
             navigation.navigate('ADMINcategories')
        },
        async updateCategory({id,name,image,navigation},state){
            let categories = [...state.products.categories]
            const targetCategory= categories.filter(c=>c.id == id)[0]
            const targetCategoryIndex= categories.indexOf(targetCategory)
            categories[targetCategoryIndex] = {...targetCategory,name,image}
            dispatch.toast.show({
               type:'success',
               title:'Modification ',
               message:`Category ${name} est modifier avec success`
            })
            dispatch.products.updatedCategory(categories)
            navigation.navigate("ADMINcategories")
        },
        async removeCategory({category,admin,navigation},state){
             const {name,id} = category
             let categories= [...state.products.categories]
             let products= [...state.products.products]
             const targetCategory = categories.filter(c=>c.id == id)[0]
             const targetCategoryIndex = categories.indexOf(targetCategory)
             categories.splice(targetCategoryIndex,1)
             dispatch.toast.show({
                 type:'success',
                 title:'Supprision ',
                 message:`Category ${name} est supprimer avec success`
              })
             dispatch.products.removedCategory(categories)
             //set this category's products category to other category 
             products = [...products].map(p=>{
                 if(p.category == id) p.category =0
                 return p
             })
             dispatch.products.setedProductCategory(products)
             navigation.goBack()
        },

     

        async fetchProducts(somthing,state){
             try {
                const first_fetch = state.products.first_fetch
                if(first_fetch) return

                 const productsResponse= await firestore()
                                              .collection('products')
                                              .orderBy('category','desc')
                                              .orderBy('ref','desc')
                                              .limit(PRODUCTS_FETCH_LIMIT)
                                              .get()
                 const docs =productsResponse.docs
                 const products = docs.map(doc=>({...doc.data(), id : doc.id}))
                
                 if(products.length <1) return 
                 dispatch.products.fetchedProducts({
                     products,
                     last_visible_Product:products[products.length -1].ref
                 })
             } catch (error) {
                 console.log(error)
             }
        },
        async fetchMoreProducts(arg,state){
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
             console.log('ad product')
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
        },
        async addProductsList(args,state){
            const productsList =[
            productModel('3des',1,'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/02/lentils-6-500x500.jpg',70),
            productModel('kanelini',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-cannellini-600x400.jpg',70),
            productModel('whiteFayot ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-fayot-600x400.jpg',70),
            productModel('KidneyBeans  ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-kidney-600x400.jpg',70),
            productModel('Chickpeas   ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-chickpea-garbanzo-600x400.jpg',70),
            productModel('Chickpeas1   ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-chickpea-garbanzo-600x400.jpg',70),
            productModel('Chickpeas2   ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-chickpea-garbanzo-600x400.jpg',70),
            productModel('Chickpeas3   ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-chickpea-garbanzo-600x400.jpg',70),
            productModel('zain   ',2,'https://cdn11.bigcommerce.com/s-podjif72xf/images/stencil/1280x1280/products/13827/9169/9504000062330__57481.1594292115.jpg?c=2?imbypass=on',70),
            productModel('espego   ',2,'https://dibaonline.de/media/image/product/883/lg/espido-roghan-zeitoon-cooking-oil-with-extra-virgin-olive-oil-5000ml.png',70),
            productModel('extravergin   ',2,'https://images-na.ssl-images-amazon.com/images/I/71JLJ0MQT8L._SY879_.jpg',70),
            productModel('felipoBerd   ',2,'https://www.costco.co.uk/medias/sys_master/products/h74/he9/10039956406302.jpg',70),
            productModel('hayat   ',2,'https://www.luluhypermarket.com/medias/1144337-01.jpg-515Wx515H?context=bWFzdGVyfGltYWdlc3w2MTkzOXxpbWFnZS9qcGVnfGltYWdlcy9oN2EvaDBhL2gwMC85MjM5MjM2MzQ1ODg2LmpwZ3w1NDFiZTJkMzEyYjE3NTJmODU2Nzc4NzAwNmZiODU1NDM2Y2YxMzBlOWM0NzZhMzg1YjA4MDlkNGQ0OWU1MjNk',70),
            productModel('dove',3,'https://firebasestorage.googleapis.com/v0/b/distrubazate.appspot.com/o/productImages%2FDove?alt=media&token=86ade115-ba24-4953-883a-f0880c164e1a',70),
            productModel('rexona   ',3,'https://cdn1.bigcommerce.com/n-dvzvde/vef0tp/products/8676/images/9391/Rexona_Soap_5.29_OZ_150_Grams__70413.1430724192.1280.1280.jpg?c=2',70),
            productModel('dial   ',3,'https://images.heb.com/is/image/HEBGrocery/000032889',70),
            productModel('garnier   ',3,'https://i.ebayimg.com/images/g/cSQAAOSwzUVdHYJX/s-l300.jpg',70),
            productModel('camay   ',3,'https://imperialsoap.com/wp-content/uploads/2018/10/1-Camay.jpg',70),
            productModel('spaghetti   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-spaghetti-600x400.jpg',70),
            productModel('Pappardelle   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-pappardelle-600x400.jpg',70),
            productModel('Fusilli   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-fusilli-600x400.jpg',70),
            productModel('Farfalle   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-farfalle-psd-600x400.jpg',70),
            productModel('Penne   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-penne-600x400.jpg',70),
            productModel('HodgsonMill',5,'https://www.world-grain.com/ext/resources/Article-Images/2019/12/Hodgson-Mill_Unbleached-All-Purpose-White-Wheat-Flour_Photo-cred-FDA_E.jpg?1575296844',70),
            productModel('ArrowheadMills',5,'https://assets.epicurious.com/photos/5a5e769b1e703a366d4197db/6:4/w_1600%2Cc_limit/flour-taste-test-inset-1-12012018.jpg',70),
            productModel('GoldMedal',5,'https://images.albertsons-media.com/is/image/ABS/117100035?$ecom-pdp-desktop$&defaultImage=Not_Available&defaultImage=Not_Available',70),
            productModel('WhiteLily',5,'https://m.media-amazon.com/images/I/51ewnN4dJTL.jpg',70),
            ]
            var batch = firestore().batch()
            productsList.forEach((doc) => {
               var docRef = firestore().collection("products").doc(); //automatically generate unique id
               batch.set(docRef, doc);
            });
            batch.commit()
            console.log('commited')
        },
        async updateProduct({id,navigation,name,category,image,ref,price1,price2,price3,price4},state){
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
        },
        async removeProduct({product,navigation,admin},state){
             let products = [...state.products.products]
             const newProducts  = products.filter(p => p.id != product.id) 

             //remove auth account 
             const distrubutorRef=await firestore()
             .collection('products')
             .doc(product.id)
             .delete()
              
             //remove image 
            //  const imageRef= Storage.get
              
             dispatch.toast.show({
                 type:'success',
                 title:'Supprision ',
                 message:`Produit ${product.name} est supprimer avec success`
             })
             dispatch.products.removedProduct(newProducts)
             navigation.goBack()
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
                dispatch.products.imageUploadFailed()
            }
        },

    })
}
export default model
