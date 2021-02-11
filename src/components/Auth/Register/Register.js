
import React,{useEffect,useState} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import BackgroundImage from '../../Common/BackgroundImage'
import {colors} from '../../Common/Colors'
import Button from '../../Common/Button'
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




const  Register=({navigation,registerError,register})=> {
    
    const [errors, seterrors] = useState({...ERRORS_INITIAL_CONFIG})
    const [canSubmit, setcanSubmit] = useState(true)
    const [type, settype] = useState("DISTRUBUTOR")
    const [passwordConfirm, setpasswordConfirm] = useState("123456")
    const [userInfo, setuserInfo] = useState({
      ACCESS_CODE:"123456",
      name:"said vendeur",
      email:"said_said@vendor.com",
      city:"Ouarzazate",
      phone :"0625414578" ,
      password:"123456",   
    })


    useEffect(() => {
        console.log({registerError})
          if(registerError!= null){
              if(registerError.id == "EMAIL_USED")
                 seterrors({...errors,emailUSED:true})
              if(registerError.id == "EMAIL_INVALID")
                 seterrors({...errors,emailINVALID:true})
              if(registerError.id == "ACCESS_CODE_INVALID")
                 seterrors({...errors,ACCESS_CODE_INVALIDE:true})
              if(registerError.id == "UNKNOWN")
                 seterrors({...errors,ACCESS_CODE_INVALIDE:true})
        }
        setcanSubmit(true)
    }, [registerError ])


    const resetErrors=()=>seterrors({...ERRORS_INITIAL_CONFIG})
    const handelChange=input=>v=>{ setuserInfo({...userInfo,[input]:v}) }
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
           seterrors(errorsTemp)
           return false
        }
        return true
    }
    const handleLogin=()=>{
        if(!validateFields() || !canSubmit) return 
        
        const obj= {...userInfo,type}
        register(obj)
        setcanSubmit(false)
    }
    
 
    const {name,city,phone,email,password,ACCESS_CODE}= userInfo
    return (
    <BackgroundImage>
        <KeyboardAwareScrollView   contentContainerStyle={{ display:'flex',  flexGrow:1 }} >
              <View style={styles.Logo}>
                   <Logo width={100} height={100}  />
              </View>
             <View style={styles.Form}>            
                 <View style={styles.inputs} >
                      <View style={{width:'100%'}} >
                           <Label label="Code d'access "  color="#fff"  mga={4} />
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
                           <Label label="Nom "  color="#fff"  mga={4} />
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
                          <Label label="Email "  color="#fff"  mga={4} />
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
                          <Label label="Téléphone "  color="#fff"  mga={4} />
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
                             setSelectedValue={(value)=>settype(value)}
                          />
                       </View>
                      <View style={{width:'100%'}} >
                     <Label label="Mote de passe"  color="#fff" mga={4} />
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
                     <Label label="Confirmer le mote de passe"  color="#fff" mga={4} />
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
                         onChangeText={text=>setpasswordConfirm(text)} 
                     />
                 </View>
                      <View style={{width:'100%'}} >
                      <Label label="Ville "  color="#fff"  mga={4} />
                      <Error trigger={errors.cityREQUIRED} error={REQUIRED_FIELD} />
                      <CitiesDropDown {...{setcity:handelChange('city'),city}} />

                 </View>
                     <Error trigger={errors.UNKNOWN} error={registerError && registerError.message} />
                      <Button 
                       xStyle={styles.BtnXstyle} 
                       color={"WHITE"} 
                       disabled={!canSubmit}
                       clickHandler={e=>handleLogin()} >
                       {
                           canSubmit
                           ?<Text style={styles.ButtonText}>Inscrire</Text>
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
                                 <Text style={{color:'#fff',fontWeight:"bold",padding:16}}>Connecter </Text>
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
