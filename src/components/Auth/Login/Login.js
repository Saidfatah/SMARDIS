
import React,{useEffect,useState,useCallback} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import BackgroundImage from '../../Common/BackgroundImage'
import Logo from '../../Common/Logo'
import {colors} from '../../Common/Colors'
import  Button from '../../Common/Button'
import  Error from '../../Common/Error'
import  Label from '../../Common/Label'
import Loading from '../../Common/Loading'
import { connect } from 'react-redux'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import {CheckBox} from 'react-native-elements'
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler ,Alert} from 'react-native';


const  Login=({navigation,authError,login,done_Logging,toggleSavePassword,savePassword,savedPassword})=> {
    const [username, setusername] = useState("said_designer@outlook.com")
    const [password, setPassword] = useState("00000000")
    const [canSubmit, setcanSubmit] = useState(true)
    const [savePasswordLogin, setsavePasswordLogin] = useState(false)
    const [passwordRequired, setpasswordRequired] = useState(null)
    const [usernameRequired, setusernameRequired] = useState(null)
    const [authErrorLocal, setauthErrorLocal] = useState(null)

    useEffect(() => {
          if(savePassword){
            setsavePasswordLogin(true)
            setPassword(savedPassword)
          }
    }, [])
    useEffect(() => {
        console.log({authError})
          if(authError != null){
            setauthErrorLocal(authError)
            setcanSubmit(true)
          }
    }, [authError])
    useEffect(() => {
          if(done_Logging){
            setcanSubmit(true)
            setusername('')
            setPassword('')
          }
    }, [done_Logging])
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

         login({password,username,savePassword:savePasswordLogin,navigation})
         setcanSubmit(false)
    }
    
    const Errors = ()=>{
         if(passwordRequired != null)
           return <Error trigger={passwordRequired != null}  error={passwordRequired.message} />
       
         if(usernameRequired != null)
           return <Error trigger={usernameRequired != null}  error={usernameRequired.message} />
       
         if(authErrorLocal != null)
           return <Error trigger={authErrorLocal != null}  error={authErrorLocal.message} />
       
       
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
                      <Label label="Téléphone"  color="#fff"  mga={4} />
                      <TextInput style={{...styles.Input}}   
                          placeholder={"Numero du téléphone"}   
                          defaultValue={username} 
                          placeholderTextColor="#fff"
                          onFocus={e=> setusernameRequired(null)}
                          onChangeText={text=>setusername(text)} 
                      />
                 </View>
     
                 <View style={{width:'100%'}} >
                     <Label label="Mote de passe"  color="#fff" mga={4} />
                     <TextInput style={{...styles.Input}}   
                         placeholder={"Entrer le mote de passe"}   
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
                    <Text style={styles.ButtonText}>Connexion</Text>
                 </Button>
            </View>

             <View style={{
                          display:"flex",
                          flexDirection:"row",
                          alignItems:'center',
                          }} >
                          <Text style={{color:'#fff',marginRight:16}}>vous n'avez pas de compte ?</Text>
                          <TouchableOpacity onPress={e=>navigation.navigate('REGISTER')} >
                                 <Text style={{color:'#fff',fontWeight:"bold",padding:16}}>s'inscrire  </Text>
                          </TouchableOpacity>
           </View>
             
             <CheckBox 
                 checked={savePasswordLogin} 
                onPress={v=>{
                    setsavePasswordLogin(!savePasswordLogin)
                    toggleSavePassword({savePassword:!savePasswordLogin})
                 }} 
                title="Enrg mote de passe " 
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
        savePassword : state.auth.savePassword ,
        done_Logging : state.auth.done_Logging ,
    }),
    dispatch=>({
       login : dispatch.auth.login,
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
