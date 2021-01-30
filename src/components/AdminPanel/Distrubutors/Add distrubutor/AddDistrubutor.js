import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Error from '../../../Common/Error'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'


const ERRORS_INITIAL_CONFIG = {
    nameREQUIRED:false,
 
}
const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
export const AddDistrubutor = ({navigation,route,updateDistrubutor,addDistrubutor}) => {
     const [errors, seterrors] = useState({...ERRORS_INITIAL_CONFIG})
     const [name, setname] = useState("")
     const [city, setcity] = useState("")
     const [ref, setref] = useState("")
     const [distrubutorToBeUpdated, setdistrubutorToBeUpdated] = useState(-1)
     const [update, setupdate] = useState(false)


    useEffect(() => {
        if(route.params){
            if(route.params.update == undefined) return 
            const {distrubutor}=route.params
            const { id }=distrubutor
            navigation.setParams({DISTRUBUTOR_NAME:distrubutor.name})
            setname(distrubutor.name)
            setref(distrubutor.ref)
            setcity(distrubutor.city)
            setupdate(true)
            setdistrubutorToBeUpdated(id)
        } 
    }, [])

    const resetErrors=()=>seterrors({...ERRORS_INITIAL_CONFIG})
    const validateFields =()=>{
        let errorsCount=0
        let errorsTemp = {...errors}
        if(name == ""){
            errorsTemp.nameREQUIRED =true
            errorsCount++
        }

        if(errorsCount >0) {
            seterrors(errorsTemp)
            return false
         }
         return true
    }
    const dispatchAddDistrubutor=()=>{
        if(!validateFields()) return 

        const distrubutorObj = {name,city,ref}
      
        if(!update) return addDistrubutor({...distrubutorObj,navigation})
        updateDistrubutor({...distrubutorObj,id:distrubutorToBeUpdated,navigation})
    }


    return (
        <KeyboardAwareScrollView   
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} >  
        <View>
            <Label label="Nome"  mga={16} />
            <Error trigger={errors.nameREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"entrer le nom  du vendeur"}   
                    defaultValue={name} 
                    onFocus={e=> resetErrors()}
                    keyboardType="default"
                    onChangeText={text=> setname(text) } 
            />

            <Label label="Ref"  mga={16} />
            <Error trigger={errors.refREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"entrer le Ref  du vendeur"}   
                    defaultValue={ref} 
                    onFocus={e=> resetErrors()}
                    keyboardType="default"
                    onChangeText={text=> setref(text) } 
            />

            <Label label="Ville"  mga={16} />
            <Error trigger={errors.cityREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"entrer la ville du vendeur"}   
                    defaultValue={city} 
                    onFocus={e=> resetErrors()}
                    keyboardType="default"
                    onChangeText={text=> setcity(text) } 
            />
        </View>

        <View style={styles.btns} >
             <Button
              xStyle={{...styles.BtnXstyle,marginRight:16}} 
              color={"BLUE"} 
              clickHandler={e=>dispatchAddDistrubutor()} 
              >
                 <Text style={styles.ButtonText}>{update?"Modifier":"Enregistrer"}</Text>
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
    null
    , 
    dispatch=>({
        addDistrubutor    : dispatch.distrubutor.addDistrubutor,
        updateDistrubutor : dispatch.distrubutor.updateDistrubutor,
    })
)
(AddDistrubutor)


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
