import {productModel} from './Schemas/productModel'
import {categoryModel} from './Schemas/categoryModel'
import {categoriesList} from './Schemas/categoriesList'
import {productsList} from './Schemas/productsList'

//use async storage here 
//then we an listen for product prices changes 

//diffrente use scenario
//admin - all products - categories 
//vendor

//shpould we store these in cache 
//then lsiten to chanegsin db if something changes we update it in local

//product can have no category and will put them in other category 

const userTypes= ['ADMIN','DISTRIBUTOR']
const model ={
    state:{
        products         : [],
        categories       : [],
        selectedCategoryProducts :[productsList.filter(p=>p.category == 1)] ,
        selectedCategory : 2 , 
        productsCount    : 0,
        categoriesCount  : 0,
    },
    reducers:{
        fetchedProducts : (state,products)=>({
            ...state,
            products :products,
            productsCount : products.length
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
        fetchCategories(somthing,state){
             dispatch.products.fetchedCategories(categoriesList)
        },
        addCategory({name,navigation,image},state){
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
        updateCategory({id,name,image,navigation},state){
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
        removeCategory({category,admin,navigation},state){
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

     

        fetchProducts(somthing,state){
             //do we fetch all products at app start 
             //get products from asyncstorage
             //get products from firebase
             dispatch.products.fetchedProducts([...productsList])
        },
        addProduct({navigation,name,category,image,ref,price1,price2,price3,price4,stock,activePrice},state){
             console.log('ad product')
             let products = [...state.products.products]
             const newProduct = productModel(name,category,image,price1,ref,stock,price2,price3,price4,activePrice)
             products.push(newProduct)
             dispatch.toast.show({
                 type:'success',
                 title:'Ajoute ',
                 message:`Produit ${name} est ajouter avec success`
             })
             navigation.navigate('ADMINproducts')
             dispatch.products.addedProduct(products)
        },
        updateProduct({id,navigation,name,category,image,ref,price1,price2,price3,price4,stock,activePrice},state){
            let products = [...state.products.products]
            const targetProduct= products.filter(p=>p.id == id)[0]
            const targetProductIndex= products.indexOf(targetProduct)
            products[targetProductIndex] = {...targetProduct,targetProduct,name,category,image,ref,price1,price2,price3,price4,stock,activePrice}
            dispatch.toast.show({
                type:'success',
                title:'Ajoute ',
                message:`Produit ${name} est modifier avec success`
            })
            dispatch.products.updatedProduct(products)
            navigation.navigate('ADMINproducts')
        },
        removeProduct({product,navigation,admin},state){
             let products = [...state.products.products]
             const newProducts  = products.filter(p => p.id != product.id) 
             dispatch.toast.show({
                 type:'success',
                 title:'Ajoute ',
                 message:`Produit ${product.name} est supprimer avec success`
             })
             dispatch.products.removedProduct(newProducts)
             navigation.goBack()
        },

    })
}
export default model
