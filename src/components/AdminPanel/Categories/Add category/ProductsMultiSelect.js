import React,{useRef} from 'react'
import {View} from 'react-native'
import Label from '../../../Common/Label'
import { colors } from '../../../Common/Colors'
import MultiSelect from 'react-native-multiple-select';

const ProductsMultiSelect=({dispatch,items,selectedProducts})=> {
    const onSelectedItemsChange = selectedItems => {
        dispatch({type:"SET_SELECTED_PRODUCTS",value:selectedItems})
    };
    let multiSelect= useRef()

    return  <View>
    <Label label="Les produits"  mga={16} />
    <MultiSelect
     styleTextDropdownSelected={{
         marginLeft:8
     }}
     styleDropdownMenuSubsection={{
        borderColor:colors.BLACK,
        borderWidth:2,
        borderRadius:12,
        padding:4,
     }}
    
     styleItemsContainer={{
        height:200
     }}
      
     items={items}
     uniqueKey="id"
     ref={multiSelect}
     
     onSelectedItemsChange={onSelectedItemsChange}
     selectedItems={selectedProducts}
     selectText="Selectioner les produits"
     searchInputPlaceholderText="Chercher les produits..."
     altFontFamily="ProximaNova-Light"
     tagRemoveIconColor={colors.RED}
     tagBorderColor={colors.BLACK}
     tagTextColor={colors.BLACK}
     selectedItemTextColor={colors.BLACK}
     selectedItemIconColor={colors.GREEN}
     itemTextColor={colors.BLACK}
     displayKey="name"
     searchInputStyle={{ color: '#CCC' }}
     submitButtonColor={colors.GREEN}
     submitButtonText="Valider"
   />

{/* { multiSelect.current &&   multiSelect.current.getSelectedItemsExt(selectedProducts)} */}
</View>
}

export default ProductsMultiSelect
