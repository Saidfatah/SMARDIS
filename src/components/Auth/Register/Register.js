
import React,{useEffect,useReducer} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import BackgroundImage from '../../Common/BackgroundImage'
import {colors} from '../../Common/Colors'
import Button from '../../Common/Button'
import {buttonTexts,labelsTexts} from '../../Common/GlobalStrings'
import Error from '../../Common/Error'
import Label from '../../Common/Label'
import Logo from '../../Common/Logo'
import CitiesDropDown from '../../Common/CitiesDropDown'
import Loading from '../../Common/Loading'
import { connect } from 'react-redux'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import CheckBoxGorup from '../../Common/CheckBoxGorup'

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
const initialState=()=>({
    errors :{...ERRORS_INITIAL_CONFIG},
    canSubmit :true ,
    type  :"DISTRUBUTOR",
    passwordConfirm:"",
    userInfo:{
        ACCESS_CODE:"",
        name:"",
        email:"",
        city:"",
        phone :"" ,
        password:"",   
      },
})
const reducer=(state,action)=>{
    switch (action.type) {
        case "SET_CAN_SUBMIT":
             return {...state,canSubmit:action.value}
        break;
        case "SET_TYPE":
             return {...state,type:action.value}
        break;
        case "SET_USER_INFO":
             return {...state,userInfo:action.value}
        break;
        case "SET_PASSWORD_CONFIRM":
             return {...state,passwordConfirm:action.value}
        break;
        case "SET_ERRORS":
             return {...state,errors:action.value}
        break;
     
    
        default: return state
           
    }
}




const  Register=({navigation,registerError,register})=> {
    const [state, dispatch] = useReducer(reducer, initialState())
     
     const {
        errors ,
        canSubmit ,
        type ,
        passwordConfirm,
        userInfo
     }=state

    useEffect(() => {
          if(registerError!= null){
              if(registerError.id == "NAME_USED")
                 dispatch({id:'SET_ERRORS',value:{...errors,name_USED:true}})
              if(registerError.id == "EMAIL_USED")
                 dispatch({id:'SET_ERRORS',value:{...errors,emailUSED:true}})
              if(registerError.id == "EMAIL_INVALID")
                 dispatch({id:'SET_ERRORS',value:{...errors,emailINVALID:true}})
              if(registerError.id == "ACCESS_CODE_INVALID")
                 dispatch({id:'SET_ERRORS',value:{...errors,ACCESS_CODE_INVALIDE:true}})
              if(registerError.id == "UNKNOWN")
                 dispatch({id:'SET_ERRORS',value:{...errors,UNKNOWN:true}})
        }
        dispatch({id:'SET_CAN_SUBMIT',value:true})
    }, [registerError ])


    const resetErrors=()=>dispatch({id:'SET_ERRORS',value:{...ERRORS_INITIAL_CONFIG}})
    const handelChange=input=>v=>dispatch({id:'SET_USER_INFO',value:{...userInfo,[input]:v}}) 
    const validateFields =()=>{
        let errorsCount=0
        const {name,email,city,phone,password,ACCESS_CODE}=userInfo
        let errorsTemp = {...errors}


        if(ACCESS_CODE == ''){
            errorsTemp.ACCESS_CODE_REQUIRED =true
            errorsCount++
        }
        if(name == ''){
            errorsTemp.nameREQUIRED =true
            errorsCount++
        }
        if(password == ''){
            errorsTemp.passwordREQUIRED =true
            errorsCount++
        }
        if(passwordConfirm ==""){
            errorsTemp.passwordConfirmREQUIRED =true
            errorsCount++
        }else{
            if(password !=  passwordConfirm)
            {
                errorsTemp.passwordNotMatch =true
                errorsCount++
            }
        }
       
        if(email == ''){
            errorsTemp.emailREQUIRED =true
            errorsCount++
        }
        if(city == ''){
            errorsTemp.cityREQUIRED =true
            errorsCount++
        }
        if(phone == ''){
            errorsTemp.phoneREQUIRED =true
            errorsCount++
        }
        if(type == ''){
            errorsTemp.typeREQUIRED =true
            errorsCount++
        }



        if(errorsCount >0) {
           dispatch({id:'SET_ERRORS',value:errorsTemp})
           return false
        }
        return true
    }
    const handleLogin=()=>{
        if(!validateFields() || !canSubmit) return 
        
        const obj= {...userInfo,type}
        register(obj)
        dispatch({id:'SET_CAN_SUBMIT',value:false})

    }
    
 
    const {name,city,phone,email,password,ACCESS_CODE}= userInfo
    return (
    <BackgroundImage>
        <KeyboardAwareScrollView   contentContainerStyle={{ display:'flex',  flexGrow:1 }} >
              <View style={styles.Logo}>
                   <Logo width={120} height={120}  />
              </View>
             <View style={styles.Form}>            
                 <View style={styles.inputs} >
                      <View style={{width:'100%'}} >
                           <Label label={labelsTexts.ACCESS_CODE}  color="#fff"  mga={4} />
                           <Error trigger={errors.ACCESS_CODE_REQUIRED} error={REQUIRED_FIELD} />
                           <Error trigger={errors.ACCESS_CODE_INVALIDE} error={registerError && registerError.message} />
                           <TextInput style={{...styles.Input}}   
                               placeholder={"Inserer le code d'access"}   
                               defaultValue={ACCESS_CODE} 
                               placeholderTextColor="#fff"
                               onFocus={e=> resetErrors()}
                               onChangeText={handelChange('ACCESS_CODE')} 
                           />
                      </View>
                      <View style={{width:'100%'}} >
                           <Label label={labelsTexts.NAME}  color="#fff"  mga={4} />
                           <Error trigger={errors.name_USED}    error={registerError && registerError.message} />
                           <Error trigger={errors.nameREQUIRED} error={REQUIRED_FIELD} />
                           <TextInput style={{...styles.Input}}   
                               placeholder={"Inserer votre nom complet"}   
                               defaultValue={name} 
                               placeholderTextColor="#fff"
                               onFocus={e=> resetErrors()}
                               onChangeText={handelChange('name')} 
                           />
                      </View>
                      <View style={{width:'100%'}} >
                            <Label label={labelsTexts.CITY}  color="#fff"  mga={4} />
                            <Error trigger={errors.cityREQUIRED} error={REQUIRED_FIELD} />
                            <CitiesDropDown {...{setcity:handelChange('city'),city}} />
                      </View>
                      <View style={{width:'100%'}} >
                          <Label label={labelsTexts.EMAIL}  color="#fff"  mga={4} />
                          <Error trigger={errors.emailUSED}     error={registerError && registerError.message} />
                          <Error trigger={errors.emailINVALID}  error={registerError && registerError.message} />
                          <Error trigger={errors.emailREQUIRED} error={REQUIRED_FIELD} />
                          <TextInput style={{...styles.Input}}   
                              placeholder={"Inserer votre email address"}   
                              defaultValue={email} 
                              placeholderTextColor="#fff"
                              onFocus={e=> resetErrors()}
                              onChangeText={handelChange('email')} 
                          />
                     </View>
                      <View style={{width:'100%'}} >
                          <Label label={labelsTexts.PHONE}  color="#fff"  mga={4} />
                          <Error trigger={errors.phoneREQUIRED}     error={REQUIRED_FIELD} />
                          <TextInput style={{...styles.Input}}   
                              placeholder={"Inserer votre numero du téléphone"}   
                              defaultValue={phone} 
                              placeholderTextColor="#fff"
                              keyboardType="phone-pad"
                              onFocus={e=> resetErrors()}
                              onChangeText={handelChange('phone')} 
                          />
                     </View>
                      <View style={{width:"100%"}} >
                          <CheckBoxGorup 
                             title="Type :" 
                           list={[
                            {label:"Vendeur",value:"DISTRUBUTOR"},
                            {label:"Admin",value:"ADMIN"},
                           ]} 
                             setSelectedValue={(value)=> dispatch({id:'SET_TYPE',value}) }
                          />
                       </View>
                      <View style={{width:'100%'}} >
                            <Label label={labelsTexts.PASSWORD}  color="#fff" mga={4} />
                            <Error trigger={errors.passwordREQUIRED}  error={REQUIRED_FIELD} />
                            <TextInput style={{...styles.Input}}   
                                placeholder={"Entrer le mote de passe"}   
                                defaultValue={password} 
                                textContentType="password"
                                secureTextEntry={true}
                                placeholderTextColor="#fff"
                                keyboardType="default"
                                onFocus={e=> resetErrors()}
                                onChangeText={handelChange('password')} 
                            />
                     </View>
                      <View style={{width:'100%'}} >
                             <Label label={labelsTexts.PASSWORD_CONFIRM}  color="#fff" mga={4} />
                             <Error trigger={errors.passwordConfirmREQUIRED}  error={REQUIRED_FIELD} />
                             <Error trigger={errors.passwordNotMatch}  error={"le mot de passe ne correspond pas! "} />
                             <TextInput style={{...styles.Input}}   
                                 placeholder={"Entrer le mote de passe"}   
                                 defaultValue={passwordConfirm} 
                                 textContentType="password"
                                 secureTextEntry={true}
                                 placeholderTextColor="#fff"
                                 keyboardType="default"
                                 onFocus={e=> resetErrors()}
                                 onChangeText={value=>dispatch({id:'SET_PASSWORD_CONFIRM',value})} 
                             />
                     </View>
                      
                     <Error trigger={errors.UNKNOWN} error={registerError && registerError.message} />
                      <Button 
                       xStyle={styles.BtnXstyle} 
                       color={"WHITE"} 
                       disabled={!canSubmit}
                       clickHandler={e=>handleLogin()} >
                       {
                           canSubmit
                           ?<Text style={styles.ButtonText}>{buttonTexts.REGISTER}</Text>
                           :<View style={{display:'flex',flexDirection:'row',justifyContent:'center'}} >
                               <Loading  spacing={30} /> 
                           </View>
                       }
                     </Button>
                     
                      <View style={{
                          display:"flex",
                          flexDirection:"row",
                          alignItems:'center',
                          }} >
                          <Text style={{color:'#fff',marginRight:16}}>Vous este deja enrgister ?</Text>
                          <TouchableOpacity onPress={e=>navigation.navigate('LOGIN')} >
                                 <Text style={{color:'#fff',fontWeight:"bold",padding:16}}>{buttonTexts.LOGIN_CALL} </Text>
                          </TouchableOpacity>
                      </View>
                 </View>
             </View>
        </KeyboardAwareScrollView>
    </BackgroundImage>
    )
}

export default connect(
    state=>({
        registerError : state.auth.registerError ,
    }),
    dispatch=>({
        register : dispatch.auth.register
    })
)(Register)


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
