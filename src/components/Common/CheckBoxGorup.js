import React,{useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native'
import {colors} from './Colors'
import Label from './Label'

const CheckBoxGroup=({list,setSelectedValue,title})=> {

    const [values, setvalues] = useState([])

    useEffect(() => {
         setvalues([...list.map((v,i)=>i!=0 ?false:true)])
    }, [])

    const check = (index)=>{
        setSelectedValue(list[index].value)
        let valuesTemp = [...values]
        valuesTemp = valuesTemp.map(v=>false)
        valuesTemp[index]= true
        setvalues([...valuesTemp])
    }

    return (
    <View style={styles.planTypes}>
        <Label label={title} color="#fff" mgr={4}  mga={4} />
        {
            values.map((v,i)=><TouchableOpacity key={i} onPress={()=>check(i)}>
            <View style={styles.planType}>
                <Text> {list[i].label} </Text>
                <Icon 
                     name={v
                        ?"checkmark-circle"
                        :"checkmark-circle-outline"} 
                     size={20} 
                     color={colors.GREEN} 
                />
            </View>
           </TouchableOpacity>
           )
        }
    </View>
    )
}

export default CheckBoxGroup
var styles = StyleSheet.create({
    planType:{
        backgroundColor:'#fff',
        borderRadius:50,
        flexDirection:'row',
        padding:4,
        elevation:5,
        margin:4,
    },
    planTypes:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:'100%',
        marginBottom:16,
        marginTop:16,
        borderRadius:12,
    },
});
