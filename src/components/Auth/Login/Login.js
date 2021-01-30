
import React,{useEffect,useState} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import BackgroundImage from '../../Common/BackgroundImage'
import Logo from '../../Common/Logo'
import {colors} from '../../Common/Colors'
import  Button from '../../Common/Button'
import  Error from '../../Common/Error'
import  Label from '../../Common/Label'
import { connect } from 'react-redux'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import {CheckBox} from 'react-native-elements'

const  Login=({navigation,authError,login})=> {
    const [username, setusername] = useState("vendeur1@vendeur.com")
    const [password, setPassword] = useState("123456")
    const [savePassword, setsavePassword] = useState(false)
    const [errors, seterrors] = useState([])
    const [passwordRequired, setpasswordRequired] = useState(null)
    const [usernameRequired, setusernameRequired] = useState(null)
    const [authErrorLocal, setauthErrorLocal] = useState(null)

    useEffect(() => {
          if(authError!= null){
            setauthErrorLocal(authError)
          }
    }, [authError!= null])

    const handleLogin=()=>{
         if(password == '') return setpasswordRequired({message:"Inserer votre mote de passe !"})
         if(username == '') return setusernameRequired({message:"Inserer votre numero du Téléphone !"})
       
         login({password,username,savePassword,navigation})
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
            <View style={{borderColor:'#fff',
        borderWidth:2,
        borderRadius:12}} >
             <Logo width={100} height={100}  />

            </View>
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
                          keyboardType="phone-pad"
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
                     clickHandler={e=>handleLogin()} >
                     <Text style={styles.ButtonText}>Connexion</Text>
                 </Button>
            </View>
           <CheckBox 
           checked={savePassword} 
           onPress={v=>setsavePassword(!savePassword)} 
           title="Enrg more de passe " 
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
    }),
    dispatch=>({
       login : dispatch.auth.login,
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
