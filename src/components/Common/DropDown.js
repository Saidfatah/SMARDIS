import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from './Colors'

const DropDown=({data,selected ,setSelected})=> {
    return <DropDownPicker
    items={data}
    defaultValue={selected}
    labelStyle={{color:colors.BLACK}}
    containerStyle={{height: 40}}
    style={{
     borderColor:colors.BLACK,
     borderWidth:2,
     borderRadius:12, 
     }}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{
        backgroundColor: '#fafafa'
     }}
    onChangeItem={item =>{
     setSelected(item.value)
    }}
   />
}

export default DropDown
