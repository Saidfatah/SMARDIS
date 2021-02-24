import React from 'react'
import DropDown from '../../../Common/DropDown'
import {View} from 'react-native'
import Label from '../../../Common/Label'


const DistrubutorsDopDown=({distrubutors,selectedDistrubutor, dispatch})=> {
    return <View style={{padding:8}}>
            <Label label="List des vendeurs" />
            <DropDown 
            data={distrubutors.map(d=>({value : d, label :d.name}))} 
            setSelected={(value)=>dispatch({id:'SET_ORDERD_LIST_OF_CLIENTS',value})} 
            keyExtractor={item=>item.value.id}
            selected={selectedDistrubutor}
            defaultValue={selectedDistrubutor && selectedDistrubutor.name}
             />
        </View>

}

export default DistrubutorsDopDown
