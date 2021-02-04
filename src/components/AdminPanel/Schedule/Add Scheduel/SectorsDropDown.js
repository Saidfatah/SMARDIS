import React from 'react'
import {View} from 'react-native'
import Label from '../../../Common/Label'
import DropDown from '../../../Common/DropDown'

const SectorsDropDown=({sectors,setselectedSector,selectedSector})=> {
    return <View style={{padding:8}}>
            <Label label="List des secteurs" />
            <DropDown 
            data={sectors.map(s=>({value : s, label :s.name}))} 
            setSelected={setselectedSector} 
            selected={selectedSector}
             />
    </View>

}

export default SectorsDropDown
