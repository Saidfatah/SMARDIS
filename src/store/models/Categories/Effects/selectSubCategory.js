export default (id,state,dispatch)=>{
    try {
        const categories = state.categories.categories
      
        const selectedCategorySubCategories = categories.filter(c=> c.type == "SUB" && c.parent.id == id  )
        if(selectedCategorySubCategories.length>0){
           
           return  dispatch.categories.selectedSubCategories({selectedCategorySubCategories})
        }
        dispatch.categories.selectedSubCategories({selectedCategorySubCategories:[]})
    } catch (error) {
        console.log("--------selectSubCategory----------")
        console.log(error)
        dispatch.categories.selectSubCategoriesFailed()
    }
}