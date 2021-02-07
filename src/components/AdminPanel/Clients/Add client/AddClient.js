import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Error from '../../../Common/Error'
import DropDown from '../../../Common/DropDown'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'


const ERRORS_INITIAL_CONFIG = {
    phoneREQUIRED:false,
    cityREQUIRED:false,
    refREQUIRED:false,
    nameREQUIRED:false,
    addressREQUIRED:false,
    secteurREQUIRED:false,
    objectifREQUIRED:false,
    priceREQUIRED:false,
}
const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
const PRICES=[
    1000,
    2000,
    3000
]

export const AddClient = ({route,navigation,updateClient,addClient,sectors}) => {
    const [errors, seterrors] = useState({...ERRORS_INITIAL_CONFIG})
    const [update, setupdate] = useState(false)
    const [clientToBeUpdatedId, setclientToBeUpdatedId] = useState(-1)
    const [selectedPrice, setselectedPrice] = useState(PRICES[0])
    const [selectedSector, setselectedSector] = useState(sectors[0] || {name:"SECTOR",city:"Ouarzazate",id:-1})
    const [clientData, setclientData] = useState({
        phone:'0645789541',
        city:'zzerzer',
        ref:'zerzer',
        name:'said fatah',
        address:'zaea',
        objectif:9000,
    })
    
 
    
    useEffect(() => {
        if(route.params){
            if(route.params.update == undefined) return 
            const {client}=route.params
            const {phone,city,ref,name,address,objectif,price,sectorId }=client
            navigation.setParams({CLIENT_NAME:client.name})
            setclientData({
             ...clientData,
              client,
              phone,
              city,
              ref,
              name,
              address,
              objectif
            })
            setupdate(true)
            setclientToBeUpdatedId(client.id)
            setselectedSector(sectors.filter(s=>s.id == sectorId)[0])
            // setselectedPrice(PRICES.filter(p=>p == price)[0])
        } 
    }, [])

    const resetErrors=()=>seterrors({...ERRORS_INITIAL_CONFIG})
    const handelChange=input=>v=>{ setclientData({...clientData,[input]:v}) }
    const validateFields =()=>{
         let errorsCount=0
         const {ref,name,phone,address,city,objectif}=clientData
         let errorsTemp = {...errors}
         if(objectif == 0){
             errorsTemp.objectifREQUIRED =true
             errorsCount++
         }
         if(name == ''){
             errorsTemp.nameREQUIRED =true
             errorsCount++
         }
         if(phone == ''){
             errorsTemp.phoneREQUIRED =true
             errorsCount++
         }
         if(address == ''){
             errorsTemp.addressREQUIRED =true
             errorsCount++
         }
         if(city == ''){
             errorsTemp.cityREQUIRED =true
             errorsCount++
         }
         if(ref == ''){
             errorsTemp.refREQUIRED =true
             errorsCount++
         }
         if(selectedSector.id == -1){
             errorsTemp.secteurREQUIRED =true
             errorsCount++
         }

         if(errorsCount >0) {
            seterrors(errorsTemp)
            return false
         }
         return true
    }
    const dispatchAddClient=()=>{
        if(!validateFields()) return 

        const clientObj = {...clientData}
        clientObj.price= selectedPrice
        clientObj.sectorId= selectedSector.id
        if(!update) return addClient({...clientObj})
        updateClient({...clientObj,id:clientToBeUpdatedId,navigation})
    }


    const {ref,name,phone,address,city,objectif}=clientData
    return  <KeyboardAwareScrollView   contentContainerStyle={{ display:'flex',  flexGrow:1 }}  style={styles.container} >
        <View style={{flex:1}} >
            <Label label="Référence"  mga={16} />
            <Error trigger={errors.refREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"entrer La Référence du client"}   
                    defaultValue={ref} 
                    onFocus={e=> resetErrors()}
                    keyboardType="default"
                    onChangeText={text=>handelChange('ref')(text)} 
            />
    
            <Label label="Secteurs" mga={16} />
            <Error trigger={errors.secteurREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <DropDown 
                data={sectors.map(s=>({value : s, label :s.name}))} 
                setSelected={setselectedSector} 
                selected={selectedSector}
            />
    
            <Label label="Montant objectif DH" mga={16}/>
            <Error trigger={errors.objectifREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer l'objectif du client"}   
                    defaultValue={objectif.toString()} 
                    keyboardType="decimal-pad"
                    onFocus={e=> resetErrors()}
                    onChangeText={text=>{
                        let  value = parseFloat(text)
                        console.log(value)
                        if(value == NaN || text.includes('NaN')) value = 0
                        handelChange('objectif')(value)
                    }} 
            />
            
            <Label label="Nom Client" mga={16} />
            <Error trigger={errors.nameREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer Le nom du client"}   
                    defaultValue={name} 
                    keyboardType="default"
                    onFocus={e=> resetErrors()}
                    onChangeText={text=>handelChange('name')(text)} 
            /> 
           
    
            <Label label="Prix" />
            <Error trigger={errors.priceREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <DropDown 
                data={PRICES.map(p=>({value : p, label :p.toString()}))} 
                setSelected={setselectedPrice} 
                selected={selectedPrice}
            />
    
            <Label label="Ville" mga={16} />
            <Error trigger={errors.cityREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer Le nom de la ville"}   
                    defaultValue={city} 
                    keyboardType="default"
                    onFocus={e=> resetErrors()}
                    onChangeText={text=>handelChange('city')(text)} 
            />
    
            <Label label="Téléphone" mga={16} />
            <Error trigger={errors.phoneREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer le n° de téléphone"}   
                    defaultValue={phone} 
                    keyboardType="phone-pad"
                    onFocus={e=> resetErrors()}
                    onChangeText={text=>handelChange('phone')(text)} 
            />
    
            <Label label="Adresse" mga={16} />
            <Error trigger={errors.addressREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={{...styles.Input,paddingTop:0}}   
                    placeholder={"Entrer l'addresse"}   
                    defaultValue={address} 
                    keyboardType="default"
                    multiline = {true}
                    numberOfLines = {6}
                    onFocus={e=> resetErrors()}
                    onChangeText={text=>handelChange('address')(text)} 
            />
        </View>
        <View style={styles.btns} >
             <Button
              xStyle={{...styles.BtnXstyle,marginRight:16}} 
              color={"BLUE"} 
              clickHandler={e=>dispatchAddClient()} 
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
}



export default connect(
    state=>({
       sectors : state.sector.sectors
    })
    , 
    dispatch=>({
        addClient: dispatch.client.addClient,
        updateClient: dispatch.client.updateClient,
    })
)(AddClient)

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
        height:'100%',
        padding:8,
        backgroundColor:'#fff'
    },
    btns:{flex:1,display:'flex',flexDirection:'row',marginTop:16,marginBottom:16,justifyContent:'space-between'}
 });
