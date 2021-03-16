
import React,{useEffect,useState,useCallback} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import BackgroundImage from '../../Common/BackgroundImage'
import Logo from '../../Common/Logo'
import {colors} from '../../Common/Colors'
import {buttonTexts,labelsTexts} from '../../Common/GlobalStrings'
import  Button from '../../Common/Button'
import  Error from '../../Common/Error'
import  Label from '../../Common/Label'

import { connect } from 'react-redux'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import {CheckBox} from 'react-native-elements'
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler ,Alert} from 'react-native';


const  Login=(props)=> {
   const {
     navigation,
     authError,
     savedEmail,
     login,
     resetIsDone,
     has_logged_once,
     done_Logging,
     toggleSavePassword,
     savePassword,
     savedPassword
    }=props
    const [username, setusername] = useState("")
    const [password, setPassword] = useState("")
    const [canSubmit, setcanSubmit] = useState(true)
    const [savePasswordLogin, setsavePasswordLogin] = useState(false)
    const [passwordRequired, setpasswordRequired] = useState(null)
    const [usernameRequired, setusernameRequired] = useState(null)
    const [authErrorLocal, setauthErrorLocal] = useState(null)

    useEffect(() => {
          if(savePassword == undefined || savePassword == null) return 
        
          if(savePassword && savePassword.indexOf("true") > -1){
            setsavePasswordLogin(true)
            setPassword(savedPassword)
            setusername(savedEmail)
          }else{
            setsavePasswordLogin(false)
          }
    }, [savePassword,savedEmail,savedPassword])
    useEffect(() => {
   
          if(authError != null){
            setauthErrorLocal(authError)
            setcanSubmit(true)
          }
          setcanSubmit(true)
    }, [authError])
    useEffect(() => {
          if(done_Logging ){
            if(savePassword && savePassword.indexOf("false") > -1){
              setusername('')
              setPassword('')
            }
            // resetIsDone("done_Logging")
          }
          setcanSubmit(true)
    }, [done_Logging])
    useEffect(() => {
          if(has_logged_once == true) setcanSubmit(true)
         
    }, [has_logged_once])
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            Alert.alert("Attention!", "Êtes-vous sûr de vouloir quitter?", [
              {
                text: "Annuler",
                onPress: () => null,
                style: "cancel"
              },
              { text: "OUI", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
        
          BackHandler.addEventListener("hardwareBackPress", onBackPress);
        
          return () =>
            BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        
    }, []));


    
    const handleLogin=()=>{
        if(!canSubmit) return 
         if(password == '') return setpasswordRequired({message:"Inserer votre mote de passe !"})
         if(username == '') return setusernameRequired({message:"Inserer votre numero du Téléphone !"})
        
         //reset errors 
         setauthErrorLocal(null)
         resetIsDone('has_logged_once')
         login({password,username,savePassword:savePasswordLogin,navigation})
         setcanSubmit(false)
    }
    
    const Errors = ()=>{
         const message= "Adresse e-mail ou mot de passe invalide"
         if(authErrorLocal != null || usernameRequired != null || passwordRequired != null ){
           return <Error trigger={authErrorLocal != null}  error={message} />
         }
       
        return <View />
    }


    return (
    <BackgroundImage>
        <KeyboardAwareScrollView   contentContainerStyle={{ display:'flex',  flexGrow:1 }} >

        <View style={styles.Logo}>
             <Logo width={120} height={120}  />
        </View>
         <View style={styles.Form}>
       
             <Errors />
              
             <View style={styles.inputs} >
                 <View style={{width:'100%'}} >
                      <Label label={labelsTexts.EMAIL}  color="#fff"  mga={4} />
                      <TextInput style={{...styles.Input}}   
                          placeholder={"Insere votre email"}   
                          defaultValue={username} 
                          placeholderTextColor="#fff"
                          onFocus={e=> setusernameRequired(null)}
                          onChangeText={text=>setusername(text.replace(/\s/g, ''))} 
                      />
                 </View>
     
                 <View style={{width:'100%'}} >
                     <Label label={labelsTexts.PASSWORD}  color="#fff" mga={4} />
                     <TextInput style={{...styles.Input}}   
                         placeholder={"Insere votre mote de passe"}   
                         defaultValue={password} 
                         textContentType="password"
                         secureTextEntry={true}
                         placeholderTextColor="#fff"
                         keyboardType="default"
                         onFocus={e=> setpasswordRequired(null)}
                         onChangeText={text=>setPassword(text)} 
                     />
                 </View>
                 <Button 
                     xStyle={styles.BtnXstyle} 
                     color={"WHITE"} 
                     disabled={!canSubmit}
                     clickHandler={e=>handleLogin()}
                     loading={!canSubmit}
                     loadingSize={30}
                      >
                    <Text style={styles.ButtonText}>{buttonTexts.LOGIN}</Text>
                 </Button>
            </View>

             <View style={{
                          display:"flex",
                          flexDirection:"row",
                          alignItems:'center',
                          }} >
                          <Text style={{color:'#fff',marginRight:16}}>{labelsTexts.DONT_HAVE_ACCOUNT_YET}</Text>
                          <TouchableOpacity onPress={e=>navigation.navigate('REGISTER')} >
                                 <Text style={{color:'#fff',fontWeight:"bold",padding:16}}>{buttonTexts.REGISTER_CALL} </Text>
                          </TouchableOpacity>
           </View>
             
             <CheckBox 
                 checked={savePasswordLogin} 
                onPress={v=>{
                    setsavePasswordLogin(!savePasswordLogin)
                    toggleSavePassword({savePassword:!savePasswordLogin})
                 }} 
                title={buttonTexts.SAVE_PASSWORD} 
                textStyle={{color:colors.WHITE}}
                checkedColor={colors.WHITE}
                uncheckedColor={colors.WHITE}
                 containerStyle={{borderRadius:12,backgroundColor:'transparent'}}
             />
        
         </View>
        </KeyboardAwareScrollView>
    </BackgroundImage>
    )
}

export default connect(
    state=>({
        authError : state.auth.authError ,
        savedPassword : state.auth.savedPassword ,
        savedEmail : state.auth.savedEmail ,
        savePassword : state.auth.savePassword ,
        done_Logging : state.auth.done_Logging ,
        has_logged_once : state.auth.has_logged_once ,
    }),
    dispatch=>({
       login : dispatch.auth.login,
       resetIsDone : dispatch.auth.resetIsDone,
       toggleSavePassword : dispatch.auth.toggleSavePassword,
    })
)(Login)


var styles = StyleSheet.create({
    Input:{
      padding:8 ,
      color:"#fff",
      width:'100%',
      marginBottom:8,
      borderRadius:12, 
      borderColor:"#fff",
      borderWidth:2,
      backgroundColor:'transparent'
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
