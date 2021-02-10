import React,{useState,useEffect} from 'react'
import {View,Text,ScrollView,SafeAreaView} from 'react-native'
import { connect } from 'react-redux'
import ClientsOrdering from './ClientsOrdering'
import SectorsDropDown from './SectorsDropDown'
import DistrubutorsDopDown from './DistrubutorsDopDown'
import {colors} from '../../../Common/Colors'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Loading from '../../../Common/Loading'
import DatePicker from '@react-native-community/datetimepicker';
import FontistoIcon from 'react-native-vector-icons/Fontisto'


const Schedule = ({addScheduel,clients,done_adding_scheduel,resetIsDone,sectors,distrubutors,adminId})=> {
    const [canSubmit, setcanSubmit] = useState(true)
    const [enableScroll, setenableScroll] = useState(true)
    const [start_date, setstart_date] = useState(new Date())
    const [showDate, setshowDate] = useState(false)
    const [selectedSectorClients, setselectedSectorClients] = useState([])
    const [selectedSector, setselectedSector] = useState(sectors[0])
    const [selectedDistrubutor, setselectedDistrubutor] = useState(distrubutors[0])
    const [orderListOfClients, setorderListOfClients] = useState([])

    useEffect(() => {
        done_adding_scheduel == true && setcanSubmit(true) && resetIsDone("done_adding_scheduel")
    }, [done_adding_scheduel])

    useEffect(() => {
         if(sectors.length >0 && clients.length>0 && distrubutors.length>0)
         setselectedSectorClients([...clients].filter(cl=> cl.sectorId == selectedSector.id))
    }, [])

    useEffect(() => {
         if(sectors.length >0 && clients.length>0 && distrubutors.length>0)
         {
             const sectorClients = [...clients].filter(cl=> cl.sectorId == selectedSector.id)
             setselectedSectorClients(sectorClients)
             setorderListOfClients(sectorClients)

         }
    }, [selectedSector.id])
    
    if(clients.length < 1 || sectors.length <1 || distrubutors.length <1 ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>


    const createNewSchdule=e=>{
         
        if(adminId != undefined && selectedDistrubutor &&  selectedSector && orderListOfClients.length>0 ){
            setcanSubmit(false)
            addScheduel({
                distrubutor   :selectedDistrubutor,
                distination:{
                    sector  : selectedSector ,
                    clients : orderListOfClients 
                },
                start_date
            })
        }else{
            console.log('handle thjis erro  in error flash message')
        }
    }


    const onChangeHnadler = (event, selectedDate) => {
        const currentDate = selectedDate || start_date;
        setshowDate(false)
        console.log(currentDate)
        if (event.type === 'dismissed') {
          setstart_date(new Date(0))
        } 
        else if(event.type === 'set') {
          setstart_date(currentDate)
        }
        
    };
    const pickerProps = {
        testID:"dateTimePicker",
        value:start_date,
        collapsable:true,
        mode:"date",
        placeholder:start_date.toString(),
        dateFormat:"dayofweek day month",
        minimumDate:new Date(1950, 0, 1),
        maximumDate:new Date(2300, 10, 20),
        is24Hour:true,
        onChange:onChangeHnadler,
    }
  
    return <ScrollView scrollEnabled={enableScroll} style={{backgroundColor:'#fff',flex:1}}>
        <DistrubutorsDopDown {...{distrubutors,selectedDistrubutor, setselectedDistrubutor}} />
        <SectorsDropDown {...{sectors,selectedSector, setselectedSector}} />
        
        
   
        <Button 
        color="WHITE" 
        clickHandler={e=>setshowDate(true)} 
        xStyle={{
            borderColor:colors.BLACK,
            borderWidth:2,
            borderRadius:12, 
        }}
        > 
            <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
                }} >
               <Text>{start_date.toLocaleDateString('en-US')||"Date de debut"}</Text>
               <FontistoIcon 
                    name="date" 
                    color={colors.BLACK} 
                    size={25}
               />
            </View>
        </Button>    
         { showDate && <DatePicker {...pickerProps} />}

        <Label mgl={8} mgb={0} label={"List des clients du secteur "+ selectedSector.name} />
        <SafeAreaView style={{padding: 8,paddingTop:0 }}>
            <ClientsOrdering setenableScroll={setenableScroll} sectorClients={selectedSectorClients} setorderListOfClients={setorderListOfClients} />
        </SafeAreaView>
  
        <Button color={"BLUE"}  disabled={!canSubmit} clickHandler={createNewSchdule}>
            <Text style={{color:"#fff",textAlign:'center'}}>Ajouter Le trajet</Text>
        </Button>
    </ScrollView>
 

}

export default connect(
    state=>({
       clients : state.client.clients,
       sectors : state.sector.sectors,
       distrubutors : state.distrubutor.distrubutors,
       adminId : state.auth.adminId,
       done_adding_scheduel : state.scheduel.done_adding_scheduel,
    }),
    dispatch=>({
        addScheduel:dispatch.scheduel.addScheduel,
        resetIsDone:dispatch.scheduel.resetIsDone,
    })
)(Schedule)

