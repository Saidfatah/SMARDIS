import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Error from '../../../Common/Error'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'

export const AddSector = ({navigation,route,addSector,updateSector}) => {
    const [name, setname] = useState("")
    const [city, setcity] = useState("")
    const [update, setupdate] = useState(false)
    const [sectorToBeUpdatedId, setsectorToBeUpdatedId] = useState(null)
    const [cityREQUIRED, setcityREQUIRED] = useState(null)
    const [nameREQUIRED, setnameREQUIRED] = useState(null)
 
    useEffect(() => {
        if(route.params){
            if(route.params.update == undefined) return
            setupdate(true)
            const {sector}=route.params
            navigation.setParams({SECTOR_NAME:sector.name})
            setname(sector.name)
            setcity(sector.city)
            setsectorToBeUpdatedId(sector.id)
        }
    }, [])
    
    const dispatchAddSector=()=>{
        if(name == "") return setnameREQUIRED({message:'Le nom du scteur est obligatioir !'})
        if(city == "") return setcityREQUIRED({message:'la ville  est obligatioir !'})
        //check if sector name exists 
        if(!update) return  addSector({navigation,name,city})
         updateSector({navigation,name,id:sectorToBeUpdatedId,city})
    }

    const Errors = ()=>{
        if(nameREQUIRED != null)
          return <Error trigger={nameREQUIRED != null}  error={nameREQUIRED.message} />
      
        if(cityREQUIRED != null)
          return <Error trigger={cityREQUIRED != null}  error={cityREQUIRED.message} />
       return <View />
    }


    return  <KeyboardAwareScrollView   contentContainerStyle={{ display:'flex',  flexGrow:1 }}  style={styles.container} >
        <View style={{flex:1}} >
            <Errors />
            <Label label="Nom du Secteur" mga={16} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer Le nom du secteur"}   
                    defaultValue={name} 
                    keyboardType="default"
                    onFocus={e=> setnameREQUIRED(null)}
                    onChangeText={text=>setname(text)} 
            /> 

            <Label label="Ville" mga={16} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer Le nom de la ville"}   
                    defaultValue={city} 
                    keyboardType="default"
                    onFocus={e=> setcityREQUIRED(null)}
                    onChangeText={text=>setcity(text)} 
            />
        </View>
        <View style={styles.btns} >
             <Button
              xStyle={{...styles.BtnXstyle,marginRight:16}} 
              color={"BLUE"} 
              clickHandler={e=>dispatchAddSector()} 
              >
                 <Text style={styles.ButtonText}>{update?"Modifier":"Ajouter"}</Text>
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
}



export default connect(
    null
    , 
    dispatch=>({
       addSector: dispatch.client.addSector,
       updateSector: dispatch.client.updateSector,
    })
)(AddSector)

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
    ButtonText:{color:"#fff",textAlign:'center',fontWeight:'bold'},
    BtnXstyle:{flex:1,margin:0,borderRadius:12},
    container:{
        padding:8,
        backgroundColor:'#fff'
    },
    btns:{
        display:'flex',
        flexDirection:'row',
        marginTop:16,
        marginBottom:16,
        justifyContent:'space-between'
    }
});
