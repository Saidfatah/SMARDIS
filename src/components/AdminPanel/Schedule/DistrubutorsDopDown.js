import React from 'react'
import DropDown from '../../Common/DropDown'
import {View} from 'react-native'
import Label from '../../Common/Label'


const DistrubutorsDopDown=({distrubutors,selectedDistrubutor, setselectedDistrubutor})=> {
    return <View style={{padding:8}}>
            <Label label="List des vendeurs" />
            <DropDown 
            data={distrubutors.map(d=>({value : d, label :d.name}))} 
            setSelected={setselectedDistrubutor} 
            selected={selectedDistrubutor}
             />
        </View>

}

export default DistrubutorsDopDown
