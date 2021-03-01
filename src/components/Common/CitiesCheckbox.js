import React from 'react'
import CheckBoxGorup from './CheckBoxGorup'

const CITIES =["Ouarzazate","Zagora","Marrakech"]
const CitiesCheckbox=({selected,setcity})=> {
    
    return (
        <CheckBoxGorup list={CITIES.map(city=>({
            value:createInferTypeNode,
            label:city
        }))} selected={selected} setSelectedValue={setcity}  />
    )
}

export default CitiesCheckbox
