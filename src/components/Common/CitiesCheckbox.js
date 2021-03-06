import React,{useState,useEffect,useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity,View,Text} from 'react-native'
import {colors} from './Colors'


const CitiesCheckBox=({setSelected,selected,data,isMultiple})=>{
    const [values, setvalues] = useState([...data])
 
    
    const check = (index)=>{
        let tempValue
        const selectedCity = values[index].value
        const selectedCityChecked = values[index].checked
        let checkedVluesTemp=[...values]
        if(isMultiple){
               
                tempValue = [...selected]
                if( i >=0){
                    tempValue.splice(i,1)
                }else{
                    tempValue.push(selectedCity)
                }
                checkedVluesTemp[index].checked = !checkedVluesTemp[index].checked

        }else{
            checkedVluesTemp=[...values.map((city,i)=>({...city,checked:i == index}))]
            tempValue = selectedCity
        }
        console.log({tempValue,selectedCity})

        setSelected(tempValue)
        setvalues([...checkedVluesTemp])
    }

    const CheckItem=({checked,label,index})=>{
        return <TouchableOpacity   onPress={()=>check(index)}>
        <View style={{ 
            backgroundColor:'#fff',
             borderRadius:50,
             flexDirection:'row',
             padding:4,
             elevation:5,
             margin:4,
             display:"flex",
             alignItems:"center",
             justifyContent:'flex-start'
         }}>
            <Text> { label} </Text>
            <Icon 
                 name={checked
                    ?"checkmark-circle"
                    :"checkmark-circle-outline"} 
                 size={20} 
                 color={colors.GREEN} 
            />
        </View>
       </TouchableOpacity>
    }

    return <View style={{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap"
        }} >
        {
            values.map((c,i)=> <CheckItem  
            index={i} 
            key={i} 
            label={c.value} 
            checked={values[i].checked} 
            />)
        }
    </View>
}

export default CitiesCheckBox
