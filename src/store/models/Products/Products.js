import fetchProducts from './Effects/fetchProducts'
import addProduct from './Effects/addProduct'
import updateProduct from './Effects/updateProduct'
import removeProduct from './Effects/removeProduct'


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
        fetchedProducts : (state,{products,products_first_fetch})=>({
            ...state,
            products :[...products],
            products_first_fetch,
            done_fetching_products:true,
            productsCount:products.length
        }),
        productsFetchingFailed : (state,args)=>({
            ...state,
            products :[],
            products_first_fetch:false,
            done_fetching_products:true,
        }),
        fetchedProductsCount : (state,productsCount)=>({
            ...state,
            productsCount  
        }),

        addedProduct : (state,{products})=>({
            ...state,
             products :products,
             productsCount :products.length,
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

        updatedProduct : (state,{products})=>({
            ...state,
            products :[...products]
        }),

        removedProduct : (state,{products})=>({
             ...state,
             products :[...products],
             productsCount :products.length,
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
        resetedError:  (state,field)=>({
            ...state,
            [field]:null
        }),
    },
    effects: (dispatch)=>({
        fetchProducts     : (args,state)=>fetchProducts(args,state,dispatch),
        addProduct        : (args,state)=>addProduct(args,state,dispatch) ,
        updateProduct     : (args,state)=>updateProduct(args,state,dispatch) ,
        removeProduct     : (args,state)=>removeProduct(args,state,dispatch) , 
        resetIsDone(field,state){ dispatch.products.reseted(field)},
        resetError(field,state){ dispatch.products.resetedError(field)},
    })
}
export default model
