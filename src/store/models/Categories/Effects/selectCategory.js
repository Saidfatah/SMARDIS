export default (args,state,dispatch)=>{
    try {
        const {selectedCategory,isSub,fromClientPanel} = args
        const products = [...state.products.products]

        const categories= [...state.categories.categories]
        const targetCategory= categories.filter(c=>c.id == selectedCategory)[0]
        const categoryIsSpecial=targetCategory && targetCategory.isSpecial
         console.log(products)
        let categoryProducts
        if(fromClientPanel){
             categoryProducts =  products.filter(product=>product.category.indexOf(selectedCategory) > -1 )
        }else{
            if(!isSub){
                if(categoryIsSpecial){
                    categoryProducts =  products.filter(product=>product.category.indexOf(selectedCategory) > -1  )
                }else{
                    categoryProducts =  products.filter(product=>product.category.indexOf(selectedCategory) > -1  &&  product.subCategory == "NOT_DEFINED")
                }
            }else{
                categoryProducts =  products.filter(product=> product.subCategory == selectedCategory )
            }
        }
       

        
         if(categoryProducts.length>0)
         {
             dispatch.categories.setedSelectedCategoryProducts({
                 products:categoryProducts,
                 category_has_products:true,
                 last_selected_Category : selectedCategory,
                 isSelectedCategorySpecial:categoryIsSpecial
                })
         }else{
             dispatch.categories.setedSelectedCategoryProducts({
                 products:[],
                 category_has_products:false,
                 last_selected_Category : selectedCategory,
                 isSelectedCategorySpecial:categoryIsSpecial
                })
         }
        
         dispatch.categories.selectedCategory(selectedCategory)

    } catch (error) {
        console.log("--------selectCategory--------")
        console.log(error)
    }
}