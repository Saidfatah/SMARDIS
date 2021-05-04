
import React  from 'react'
import {View,TextInput,StyleSheet} from 'react-native'
import Error from '../../Common/Error'
import Label from '../../Common/Label'
import {colors} from '../../Common/Colors'
 
const ERRORS_INITIAL_CONFIG = {
    ACCESS_CODE_REQUIRED:false,
    ACCESS_CODE_INVALIDE:false,
    name_USED:false,
    UNKNOWN:false,
    nameREQUIRED:false,
    emailREQUIRED:false,
    emailUSED:false,
    emailINVALID:false,
    phoneREQUIRED:false,
    cityREQUIRED:false,
    typeREQUIRED:false,
    passwordREQUIRED:false,
    passwordConfirmREQUIRED:false,
    passwordNotMatch:false,
}

const REQUIRED_FIELD="ce champ est obligatoir !"
export default  InputField=({dispatch,value,handelChange,placeholder,label,error,extraErrors,keyboardType,textContentType})=>{
    
    const resetErrors=()=>dispatch({type:'SET_ERRORS',value:{...ERRORS_INITIAL_CONFIG}})

    return <View style={{width:'100%'}} onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        console.log({height,y})
      }} >
    <Label label={label}  color="#fff"  mga={4} />

    {
        extraErrors && extraErrors.map((err,index)=><Error 
            key={err.message+index}
            trigger={err.error}    
            error={err.message} 
       />)
    }
    
    <Error trigger={error} error={REQUIRED_FIELD} />  
    <TextInput style={{...styles.Input}}   
        placeholder={placeholder}   
        defaultValue={value} 
        placeholderTextColor="#fff"
        keyboardType={keyboardType?keyboardType:"default"}
        textContentType={textContentType?textContentType:"username"}
        secureTextEntry={textContentType!= undefined}
        onFocus={e=> resetErrors()}
        onChangeText={handelChange} 
    />
  </View>
}

var styles = StyleSheet.create({
    Input:{
        padding:8 ,
        color:"#fff",
        width:'100%',
        marginBottom:8,
        borderRadius:12, 
        borderColor:"#fff",
        borderWidth:2,
        backgroundColor:'transparent',
        display:'flex',
       
    },
    ButtonText:{
        color:colors.BLACK,
        textAlign:'center',
        fontWeight:'bold'
    },
    BtnXstyle:{
        margin:0,
        borderRadius:12,
        borderColor:"#fff",
        borderWidth:2,
        width:'100%',
        marginTop:8
    },
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff'
    } ,
    Logo:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        padding:16,
        paddingBottom:0
        
    },
    Form :{ 
        height:'100%', 
        flex:2, 
        display:'flex', 
        alignItems:'center',
        padding:16,
        justifyContent:'space-evenly'
    },
    inputs:{ 
        flex:2, 
        display:'flex', 
        alignItems:'center',
        padding:16,
        width:'100%'
    },
});

