import React from 'react'
import {View} from 'react-native'
import Label from '../../../Common/Label'
import DropDown from '../../../Common/DropDown'

const SectorsDropDown=({sectors,dispatch,selectedSector})=> {

    return <View style={{padding:8}}>
            <Label label="List des secteurs" />
            <DropDown 
            data={sectors.filter(s=>s.name != undefined).map(s=>({value : s, label :s.name}))} 
            keyExtractor={item=>item.value.name}
            defaultValue={selectedSector && selectedSector.name}
            setSelected={(value)=>dispatch({type:"SET_SELECTED_SECTOR",value})} 
            selected={selectedSector}

             />
    </View>

}

export default SectorsDropDown
