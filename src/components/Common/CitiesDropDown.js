import React from 'react'
import DropDown from './DropDown'

const CitiesDropDown=({setcity,city})=>{
 
     const CITIES =["Ouarzazate","Zagora","Marrakech"]
    return <DropDown 
      selected={CITIES.filter(c=>c==city).map(c=>({label:city,value:city}))[0]}
      setSelected={setcity}
      data={CITIES.map(d=>({value:d,label:d,selected: d=="Ouarzazate"}))}
      keyExtractor={(item) => item.value}
    />
}

export default CitiesDropDown
