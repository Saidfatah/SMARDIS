import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import CitiesCheckBox from '../../../Common/CitiesCheckBox'
import Error from '../../../Common/Error'
import DropDown from '../../../Common/DropDown'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'
import NumericInput from 'react-native-numeric-input'

const ERRORS_INITIAL_CONFIG = {
    phoneREQUIRED:false,
    cityREQUIRED:false,
    refREQUIRED:false,
    nameREQUIRED:false,
    addressREQUIRED:false,
    secteurREQUIRED:false,
    objectifREQUIRED:false,
    priceREQUIRED:false,
    addERROR:false
}
const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
const PRICES=[
    "prix1",
    "prix2",
    "prix3",
    "prix4"
]

export const AddClient = ({route,navigation,userType,resetIsDone,client_adding_error,done_adding_client,updateClient,addClient,sectors}) => {
    const [errors, seterrors] = useState({...ERRORS_INITIAL_CONFIG})
    const [canSubmit, setcanSubmit] = useState(true)
    const [update, setupdate] = useState(false)
    const [clientToBeUpdatedId, setclientToBeUpdatedId] = useState(-1)
    const [selectedPrice, setselectedPrice] = useState(PRICES[0])
    const [selectedSector, setselectedSector] = useState(sectors[0])
    const [clientData, setclientData] = useState({
        phone:'',
        city:'Ouarzazate',
        ref:'',
        name:'',
        address:'',
        objectif:0,
    })
    
 
    useEffect(() => {
        done_adding_client==true &&  setcanSubmit(done_adding_client) && resetIsDone('done_adding_client')
    }, [done_adding_client])
    useEffect(() => {

        if(route.params){
            if(route.params.update == undefined) return 
            const {client}=route.params
            const {phone,city,ref,name,address,objectif,price,sectorId,id }=client
            console.log({sectorId,id:client.id})
            navigation.setParams({CLIENT_NAME:client.name})
            setclientData({
             ...clientData,
              client,
              phone,
              city,
              ref,
              name,
              address,
              objectif :objectif.initial
            })
            setupdate(true)
            setclientToBeUpdatedId(client.id)
            console.log('set selected sector on start ')
            const targetsector = sectors.filter(s=>s.id == sectorId)[0]
            setselectedSector(targetsector)
           setselectedPrice(PRICES.filter(p=>p == price)[0])
        } 
    }, [])
    useEffect(() => {
        client_adding_error != null && seterrors({...errors,addERROR:true})
    }, [client_adding_error])

  
    const resetErrors=()=>seterrors({...ERRORS_INITIAL_CONFIG})
    const handelChange=input=>v=>{ setclientData({...clientData,[input]:v}) }
    const validateFields =()=>{
         let errorsCount=0
         const {ref,name,phone,address,city,objectif}=clientData
         let errorsTemp = {...errors}
         if(ref == "" && userType =="ADMIN"){
             errorsTemp.refREQUIRED =true
             errorsCount++
         }
         if(objectif == 0 && userType =="ADMIN"){
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
        
        setcanSubmit(false)
        const clientObj = {...clientData}
        clientObj.price= selectedPrice
        clientObj.sectorId= selectedSector.id
        if(!update) return addClient({...clientObj,navigation})
        updateClient({...clientObj,id:clientToBeUpdatedId,navigation})
    }

     
    const {ref,name,phone,address,city,objectif}=clientData
    const Sectors=()=>{
       return <View>
           <Label label="Secteurs" mga={16} />
       <Error trigger={errors.secteurREQUIRED} error={ERRORS_MESSAGES[0].message} />
       <DropDown 
           data={sectors.map(sector=>({
               value:sector,
               label:sector.name,
               selected: sector.id==selectedSector.id
           }))}
           keyExtractor={(item) => item.value.id}
           setSelected={setselectedSector} 
           selected={selectedSector}
           defaultValue={selectedSector.name}
       />
       </View>

    }
    const Price= ()=>{
        return <View>
            {
             userType =="ADMIN"
             ?  <View>
                <Label label="Prix" />
                <Error trigger={errors.priceREQUIRED} error={ERRORS_MESSAGES[0].message} />
                <DropDown 
                    data={PRICES.map(p=>({value : p, label :p.toString()}))} 
                    setSelected={setselectedPrice} 
                    selected={selectedPrice}
                    defaultValue={selectedPrice}
                    keyExtractor={(item) => item.value}
                />
            </View>
            :null
            }
        </View>
    }
  
    const Cities =()=>{
        return <View>
            <Label label="Ville" mga={16} />
            <Error trigger={errors.cityREQUIRED} error={ERRORS_MESSAGES[0].message} />
           <CitiesCheckBox 
           setSelected={handelChange('city')} 
           selected={city}
           data={["Ouarzazate","Zagora","Marakesh"].map(c=>({value:c,checked:c==city}))}
           />  

            {/* <CitiesDropDown {...{setcity:handelChange('city'),city}} /> */}
        </View>
    }
    
    return  <KeyboardAwareScrollView   contentContainerStyle={{ display:'flex',  flexGrow:1 }}  style={styles.container} >
        <View style={{flex:1}} >
            
            {
                userType =="ADMIN"
                ?<View>
                      <Label label="Référence"  mga={16} />
                      <Error trigger={errors.refREQUIRED} error={ERRORS_MESSAGES[0].message} />
                      <TextInput style={styles.Input}   
                              placeholder={"entrer La Référence du client"}   
                              defaultValue={ref} 
                              onFocus={e=> resetErrors()}
                              keyboardType="default"
                              onChangeText={text=>handelChange('ref')(text.trim())} 
                      />
                </View>
                :null
            }
    
            <Sectors />
           
            {
                userType =="ADMIN"
                ? <View>
                <Label label="Montant objectif DH" mga={16}/>
                <Error trigger={errors.objectifREQUIRED} error={ERRORS_MESSAGES[0].message} />
                <NumericInput 
                 iconSize={30}
                 minValue={0}
                 step={1}
                 valueType="real"
                 value={objectif} 
                 initValue={objectif} 
                 containerStyle={{  
                     borderRadius:12,  
                     borderColor:colors.BLACK,
                 }}
                 inputStyle={{ borderColor:colors.BLACK }}
                 iconStyle={{color:colors.BLACK, }}
                 leftButtonBackgroundColor="transparent"
                 rightButtonBackgroundColor="transparent"
                 onChange={value=>handelChange('objectif')(value)} 
                 />
           
           </View>
                :null
           }

            
            
            <Label label="Nom Client" mga={16} />
            <Error trigger={errors.nameREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer Le nom du client"}   
                    defaultValue={name} 
                    keyboardType="default"
                    onFocus={e=> resetErrors()}
                    onChangeText={text=>handelChange('name')(text.trim())} 
            /> 
           
            <Price />
    
            <Cities />
            
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
            <TextInput style={{
                    ...styles.Input,
                  
                  }}   
                    placeholder={"Entrer l'addresse"}   
                    defaultValue={address} 
                    keyboardType="default"
                    multiline = {true}
                    textAlignVertical="top"
                    numberOfLines = {6}
                    onFocus={e=> resetErrors()}
                    onChangeText={text=>handelChange('address')(text)} 
            />
        </View>

        <Error trigger={errors.addERROR} error={client_adding_error && client_adding_error.message} />
        <View style={styles.btns} >
             <Button
              xStyle={{...styles.BtnXstyle,marginRight:16}} 
              color={"BLUE"} 
              disabled={!canSubmit}
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
       sectors : state.sector.sectors,
       userType : state.auth.userType,
       done_adding_client : state.client.done_adding_client,
       client_adding_error : state.client.client_adding_error,
    })
    , 
    dispatch=>({
        addClient: dispatch.client.addClient,
        updateClient: dispatch.client.updateClient,
        resetIsDone: dispatch.client.resetIsDone,
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
