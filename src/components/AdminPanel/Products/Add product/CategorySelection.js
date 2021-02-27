import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import Label from '../../../Common/Label'
import Error from '../../../Common/Error'
import DropDown from '../../../Common/DropDown'
import { colors } from '../../../Common/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
 

const CategorySelection=(props)=>{
    const {
        dispatch,
        errors,
        ERRORS_MESSAGES,
        selectedCategory,
        selectedSubCategory,
        selectedCategorySubCategories,
        categories,
        hasSubCategory
    }=props

    console.log(selectedCategorySubCategories)
    return <View>
    <Label label="Category" mga={16} />
    <Error trigger={errors.categoryREQUIRED} error={ERRORS_MESSAGES[0].message} />
    <DropDown 
        data={categories.filter(c=>c.type == "MAIN").map(c=>({value : c, label :c.name}))} 
        keyExtractor={item=>item.value.id}
        defaultValue={selectedCategory && selectedCategory.name}
        setSelected={(value)=>dispatch({type:'SET_SELECTED_CATEGORY',value})}
        selected={selectedCategory}
    />

     <TouchableOpacity   onPress={()=>{dispatch({value:!hasSubCategory,type:"SET_HAS_SUBCATEGORY"})}}>
      <View style={styles.planType}>
          <Icon 
               name={hasSubCategory
                  ?"checkmark-circle"
                  :"checkmark-circle-outline"} 
               size={20} 
               color={colors.GREEN} 
          />
          <Text> Sous category  </Text>
      </View>
     </TouchableOpacity>

      <DropDown 
          hidden={ selectedCategorySubCategories.length < 1 || !hasSubCategory}
          data={selectedCategorySubCategories.map(c=>({value : c, label :c.name}))} 
          keyExtractor={item=>item.value.id}
          defaultValue={selectedSubCategory && selectedSubCategory.name ||(selectedCategorySubCategories[0] && selectedCategorySubCategories[0].name)}
          setSelected={(value)=>dispatch({type:'SET_SELECTED_SUBCATEGORY',value})}
          selected={selectedSubCategory}
      />
   
</View>

}
export default CategorySelection

var styles = StyleSheet.create({
    Input:{
      padding:8 ,
      color:colors.BLACK,
      backgroundColor:'#fff',
      width:'100%',
      marginBottom:8,
      borderColor:colors.BLACK,
      borderWidth:2,
      borderRadius:12, 
    },
    ButtonText:{color:"#fff",textAlign:'center',fontWeight:'bold'},
    BtnXstyle:{
        flex:1,
        margin:0,
        borderRadius:12,
        display:'flex',
        flexDirection:'row',
        justifyContent:('center'),
        alignItems:'center'
    },
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff'
    },
    btns:{flex:1,display:'flex',flexDirection:'row',marginTop:16,marginBottom:16,justifyContent:'space-between'}
    ,planType:{
        backgroundColor:'#fff',
        borderRadius:50,
        flexDirection:'row',
        padding:4,
        margin:4,
    },
     
});
