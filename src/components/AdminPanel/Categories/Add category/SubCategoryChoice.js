import React from 'react'
import {View} from 'react-native'
import CheckBoxGorup from '../../../Common/CheckBoxGorup'
import DropDown from '../../../Common/DropDown'


const SubCategoryChoice=({CATEGORY_TYPES,type,dispatch,categories,selectedCategory,update})=> {

    if(update) return null
    
    return <View>
    <CheckBoxGorup 
       title="Type :" 
       list={[...CATEGORY_TYPES]} 
       dispatch={dispatch}
       setSelectedValue={(value)=>{dispatch({type:'SET_TYPE',value}) }}
    />
    {
        type=="SUB"
        ?<DropDown 
        data={categories.map(c=>({value : c, label :c.name}))} 
        keyExtractor={item=>item.value.id}
        setSelected={(value)=>dispatch({type:'SET_SELECTED_CATEGORY',value})} 
        selected={selectedCategory}
       />
        :null
    }
</View>
}

export default SubCategoryChoice
