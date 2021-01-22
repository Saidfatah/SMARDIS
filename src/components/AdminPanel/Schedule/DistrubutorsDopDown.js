import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import {View} from 'react-native'
import {colors} from '../../Common/Colors'
import Label from '../../Common/Label'


const DistrubutorsDopDown=({distrubutors,selectedDistrubutor, setselectedDistrubutor})=> {
    return <View style={{padding:8}}>
            <Label label="List des vendeurs" />
            <DropDownPicker
               items={distrubutors.map(d=>({value : d, label :d.name}))}
               defaultValue={selectedDistrubutor}
               labelStyle={{color:colors.BLACK}}
               zIndex={99}
               containerStyle={{
                   height: 40,
                }}
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
               onChangeItem={item => setselectedDistrubutor(item.value)}
            />
        </View>

}

export default DistrubutorsDopDown
