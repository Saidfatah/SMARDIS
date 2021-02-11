import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../Common/Label'
import Button from '../../Common/Button'
import Error from '../../Common/Error'
import Loading from '../../Common/Loading'
import CitiesDropDown from '../../Common/CitiesDropDown'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../Common/Colors'


const ERRORS_INITIAL_CONFIG = {
    nameREQUIRED:false,
    cityREQUIRED:false,
    phoneREQUIRED:false,
    passwordREQUIRED:false,
    ACCESS_CODE_REQUIRED:false,
    updateERROR:false
 
}
const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
export const MyAccount = ({navigation,user,userPassword,resetIsDone,done_updating_acount,updateAccountError,updateAccount}) => {
     const [errors, seterrors] = useState({...ERRORS_INITIAL_CONFIG})
     const [canUpdate, setcanUpdate] = useState(true)
     const [userInfo, setuserInfo] = useState(null)

    useEffect(() => {
        if(user){
            const {type,city,name,phone}=user
            console.log(city)
            const userInofObj={type,city,name,phone,password:userPassword}
            if(type =="ADMIN"){
                const {ACCESS_CODE}=user
                userInofObj.ACCESS_CODE=ACCESS_CODE
            }
            setuserInfo({...userInofObj})
        }
    }, [])

    useEffect(() => {
        console.log({done_updating_acount})
        done_updating_acount && setcanUpdate(true) && resetIsDone("done_updating_acount")
    }, [done_updating_acount])
    useEffect(() => {
        if(updateAccountError != null){ 
            seterrors({...errors,updateERROR:true})
            setcanUpdate(true)
        }
    }, [updateAccountError])

    const handelChange=input=>v=>{ setuserInfo({...userInfo,[input]:v}) }
    const resetErrors=()=>seterrors({...ERRORS_INITIAL_CONFIG})
    const validateFields =()=>{
        let errorsCount=0
        let errorsTemp = {...errors}
        const {name,password,city,phone,type}=userInfo
        if(phone == ""){
            errorsTemp.phoneREQUIRED =true
            errorsCount++
        }
        if(name == ""){
            errorsTemp.nameREQUIRED =true
            errorsCount++
        }
        if(password == ""){
            errorsTemp.passwordREQUIRED =true
            errorsCount++
        }
        if(city == ""){
            errorsTemp.cityREQUIRED =true
            errorsCount++
        }
        
        if(type =="ADMIN" ){
            if(userInfo.ACCESS_CODE == "")
            {
                errorsTemp.ACCESS_CODE_REQUIRED =true
                errorsCount++ 
            }
        }

        if(errorsCount >0) {
            seterrors(errorsTemp)
            return false
         }
         return true
    }
    const dispatchUpdateAccount = ()=>{
        if(!validateFields()) return 
        setcanUpdate(false)
 
        updateAccount(userInfo)
    }

    if(userInfo == null ) 
     return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
         <Loading spacing={50} />   
     </View>

    const {name,password,city,phone,type}=userInfo
    return (
        <KeyboardAwareScrollView   
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} >  
        <View>
            <Error trigger={errors.updateERROR} error={updateAccountError && updateAccountError.message} />
            {
                type =="ADMIN"?
                <View>
                    <Label label="Code d'access"  mga={16} />
                     <Error trigger={errors.ACCESS_CODE_REQUIRED} error={ERRORS_MESSAGES[0].message} />
                     <TextInput style={styles.Input}   
                             placeholder={"entrer le code d'access"}   
                             defaultValue={userInfo.ACCESS_CODE} 
                             onFocus={e=> resetErrors()}
                             keyboardType="default"
                             onChangeText={handelChange('ACCESS_CODE') } 
                     />
                </View>
                :null
            }
            <Label label="Nome"  mga={16} />
            <Error trigger={errors.nameREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"entrer le nom  du vendeur"}   
                    defaultValue={name} 
                    onFocus={e=> resetErrors()}
                    keyboardType="default"
                    onChangeText={text=> setname(text) } 
            />

            <Label label="Ville"  mga={16} />
            <Error trigger={errors.cityREQUIRED} error={ERRORS_MESSAGES[0].message} />
            {city != undefined &&<CitiesDropDown {...{setcity:handelChange('city'),city}} />}

            <Label label="Mote de passe"  mga={16} />
            <Error trigger={errors.passwordREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"entrer l'mode de passe du vendeur"} 
                    secureTextEntry={true}  
                    defaultValue={password} 
                    onFocus={e=> resetErrors()}
                    keyboardType="default"
                    onChangeText={handelChange('password')} 
            />

            <Label label="Téléphone"  mga={16} />
            <Error trigger={errors.passwordREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"entrer votre numero du téléphone"} 
                    secureTextEntry={true}  
                    defaultValue={phone} 
                    onFocus={e=> resetErrors()}
                    keyboardType="phone-pad"
                    onChangeText={handelChange('phone') } 
            />

       

        </View>

        <View style={styles.btns} >
             <Button
              xStyle={{...styles.BtnXstyle,marginRight:16}} 
              color={"BLUE"} 
              disabled={!canUpdate}
              clickHandler={e=>dispatchUpdateAccount()} 
              >
                { 
                canUpdate
                ? <Text style={styles.ButtonText}>Metre a jour</Text>
                :<View style={{display:'flex',alignItems:'center'}} >
                <Loading spacing={25} />   
                 </View>
                }
            </Button>
             <Button
              xStyle={styles.BtnXstyle} 
              color={"RED"} 
              clickHandler={e=>navigation.goBack()} 
              >
                 <Text style={styles.ButtonText}>Annuler</Text>
            </Button>
        </View>
     </KeyboardAwareScrollView>
    )
}
 

export default connect(
    state=>({
        updateAccountError:state.auth.updateAccountError,
        done_updating_acount:state.auth.done_updating_acount,
        user:state.auth.user,
        userPassword:state.auth.userPassword,
    })
    , 
    dispatch=>({
        updateAccount : dispatch.auth.updateAccount,
        resetIsDone : dispatch.auth.resetIsDone,
    })
)
(MyAccount)


var styles = StyleSheet.create({
    Input:{
      padding:8 ,
      color:colors.BLACK,
      backgroundColor:'#fff',
      width:'100%',
      marginBottom:8,
      borderColor:colors.BLACK,
      borderWidth:2,
      borderRadius:12, 
    },
    ButtonText:{
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold'
    },
    BtnXstyle:{
        flex:1,
        margin:0,
        borderRadius:12
    },

    btns:{
        display:'flex',
        flexDirection:'row',
        marginTop:16,
        marginBottom:16,
        justifyContent:'space-between'
    },
    contentContainer:{ 
        display:'flex', 
        justifyContent:'space-between', 
        flexGrow:1 
    },
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff',
        display:'flex',
    },
 });
