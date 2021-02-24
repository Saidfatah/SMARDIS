import React,{useState,useEffect,useMemo,createRef,useRef} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native'
import {colors} from './Colors'


const CheckBoxGroup=({list,selected,setSelectedValue})=> {
    const [values, setvalues] = useState([])

    useEffect(() => {
         setvalues([...list.map((v,i)=>i!=0 ?false:true)])
    }, [])
 

    const check = (index)=>{
        if(selected && selected==list[index].value) return 
        setSelectedValue(list[index].value)
        let valuesTemp = [...values]
        valuesTemp = valuesTemp.map(v=>false)
        valuesTemp[index]= true
        
       setvalues([...valuesTemp])
    }

    return useMemo(()=>{
        return (
            <View style={styles.planTypes}>
        
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
    },[values] )
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
