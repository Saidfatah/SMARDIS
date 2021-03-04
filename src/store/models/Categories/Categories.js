
import selectSubCategory from './Effects/selectSubCategory'
import removeCategory from './Effects/removeCategory'
import updateCategory from './Effects/updateCategory'
import addCategory from './Effects/addCategory'
import fetchCategories from './Effects/fetchCategories'
import selectCategory from './Effects/selectCategory'


const model ={
    state:{
        categories       : [],
        selected_Categories : [],
        selectedCategorySubCategories:[],
        selectedCategoryProducts :[],
        selectedCategory : "0hxbmFxnEtU05QcWbaxv" , 
        categoriesCount  : 0,
        isSelectedCategorySpecial:false,
        done_fetching_categories : false,
        categories_first_fetch : false,
        category_has_products : false,
        done_adding_category : false,
        done_removing_category : false,
        last_selected_Category:null,
        category_add_error:null,
    },
    reducers:{
        setedSelectedCategoryProducts : (state,{isSelectedCategorySpecial,products,category_has_products,last_selected_Category,selectedCategory})=>({
            ...state,
            selectedCategoryProducts :products,
            category_has_products,
            last_selected_Category,
            selectedCategory :last_selected_Category ,
            isSelectedCategorySpecial
        }),
        selectedCategory : (state,last_selected_Category)=>({
            ...state,
            last_selected_Category
        }),
        fetchedCategories : (state,categories)=>({
            ...state,
            categories :[...categories],
            products_first_fetch :true,
            done_fetching_categories : true,
            categoriesCount: categories.length
        }),
        categoriesFetchFailed : (state,categories)=>({
            ...state,
            categories :[],
            done_fetching_categories : true,
        }),
        addedCategory : (state,categories)=>({
            ...state,
            categories :[...categories],
            categoriesCount :state.categoriesCount +1,
            done_adding_category:true,
            category_add_error:null
        }),
        addingCategoryFailed : (state,category_add_error)=>({
            ...state,
            done_adding_category:true,
            category_add_error
        }),
        updatedCategory : (state,categories)=>({
            ...state,
            categories :[...categories]
        }),
        removedCategory : (state,categories)=>({
            ...state,
            categories :[... categories],
            categoriesCount :state.categoriesCount>1?state.categoriesCount -1:0,
            done_removing_category:true
        }),
        removingCategoryFailed : (state,args)=>({
            ...state,
            done_removing_category:true
        }),
        selectedSubCategories : (state,{selectedCategorySubCategories})=>({
            ...state,
            selectedCategorySubCategories
        }),
        selectSubCategoriesFailed : (state,args)=>({
            ...state,
            selectedCategorySubCategories:[]
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
        selectCategory    : (args,state)=>selectCategory(args,state,dispatch),
        fetchCategories   : (args,state)=>fetchCategories(args,state,dispatch),
        addCategory       : (args,state)=>addCategory(args,state,dispatch),
        updateCategory    : (args,state)=>updateCategory(args,state,dispatch),
        removeCategory    : (args,state)=>removeCategory(args,state,dispatch),
        selectSubCategory : (args,state)=>selectSubCategory(args,state,dispatch),   
        resetIsDone(field,state){
            dispatch.categories.reseted(field)
        },
        resetError(field,state){
            dispatch.categories.resetedError(field)
        },
    })
}
export default model
