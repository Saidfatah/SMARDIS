import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import {View,Text} from 'react-native'
import {colors} from '../../Common/Colors'
import Label from '../../Common/Label'

const SectorsDropDown=({sectors,setselectedSector,selectedSector})=> {
    return <View style={{padding:8}}>
            <Label label="List des secteurs" />
            <DropDownPicker
               items={sectors.map(s=>({value : s, label :s.name}))}
               defaultValue={selectedSector}
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
                setselectedSector(item.value)
               }}
            />
        </View>

}

export default SectorsDropDown
