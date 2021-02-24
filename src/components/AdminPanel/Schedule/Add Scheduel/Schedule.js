import React,{useState,useEffect} from 'react'
import {View,Text,ScrollView,SafeAreaView,Alert} from 'react-native'
import { connect } from 'react-redux'
import ClientsOrdering from './ClientsOrdering'
import SectorsDropDown from './SectorsDropDown'
import DistrubutorsDopDown from './DistrubutorsDopDown'
import {colors} from '../../../Common/Colors'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Error from '../../../Common/Error'
import Loading from '../../../Common/Loading'
import DatePicker from '@react-native-community/datetimepicker';
import FontistoIcon from 'react-native-vector-icons/Fontisto'


const Schedule = (props)=> {
    const {
        navigation,
        route,
        addScheduel,
        clients,
        updateScheduel,
        done_adding_scheduel,
        schedule_add_error,
        resetIsDone,
        resetError,
        sectors,
        distrubutors,
        adminId
    }=props
    const [canSubmit, setcanSubmit] = useState(true)
    const [enableScroll, setenableScroll] = useState(true)
    const [update, setupdate] = useState(false)
    const [scheduelToBeUpdated, setscheduelToBeUpdated] = useState("")
    const [start_date, setstart_date] = useState(new Date())
    const [showDate, setshowDate] = useState(false)
    const [selectedSectorClients, setselectedSectorClients] = useState([])
    const [selectedSector, setselectedSector] = useState(sectors[0])
    const [selectedDistrubutor, setselectedDistrubutor] = useState(null)
    const [orderListOfClients, setorderListOfClients] = useState([])
    const [error, seterror] = useState(null)

     if(!sectors.length || !clients.length || !distrubutors.length ) return <Loading />

    useEffect(() => {
        done_adding_scheduel == true && setcanSubmit(true) && resetIsDone("done_adding_scheduel")
    }, [done_adding_scheduel])
    useEffect(() => {
        console.log({schedule_add_error})
        setcanSubmit(true) 
        schedule_add_error  &&  seterror({...schedule_add_error}) && resetError('schedule_add_error')
    }, [schedule_add_error])

    useEffect(() => {
         if(!update && sectors.length >0 && clients.length>0 && distrubutors.length>0)
         setselectedSectorClients([...clients].filter(cl=> cl.sectorId == selectedSector.id))

         if(route.params){
           
            if(route.params.update == undefined) return 
            const {scheduel}=route.params
            const { distrubutor,distination ,id}=scheduel
            setupdate(true)
            setscheduelToBeUpdated(id)
            setstart_date(scheduel.start_date)
            setselectedSectorClients([...distination.clients])
            setorderListOfClients([...distination.clients])
            setselectedDistrubutor(distrubutors.filter(d=>d.id == distrubutor.id)[0])
            setselectedSector(sectors.filter(s=>s.id == distination.sector.id)[0])
            return console.log(  scheduel.start_date )
         } 
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
        
        if(!selectedDistrubutor) 
           return seterror({id:"DISTRUBUTOR",message:"ce champ est obligatoire"})
        if(adminId != undefined && selectedDistrubutor &&  selectedSector && orderListOfClients.length>0 ){
            // setcanSubmit(false)
            seterror(null)
            if(update) return updateScheduel({ 
                id:scheduelToBeUpdated,
                distrubutor   :selectedDistrubutor,
                distination:{
                    sector  : selectedSector ,
                    clients : orderListOfClients 
                },
                start_date,
                navigation
            })

            addScheduel({
                distrubutor   :selectedDistrubutor,
                distination:{
                    sector  : selectedSector ,
                    clients : orderListOfClients 
                },
                start_date,
                navigation
            })
        }
    }


    const onChangeHnadler = (event, selectedDate) => {
        const currentDate = selectedDate || start_date;
        setshowDate(false)
        //chechk if date is smaller than todays date 
        const now = new Date() 
        const nowString = now.toLocaleDateString('en','USA')
        const currentString = currentDate.toLocaleDateString('en','USA')
        const isBeforeToday= (nowString != currentString) &&  now.getTime() > currentDate.getTime()
        
        if(isBeforeToday){
            Alert.alert("Attention!", "la date de debut ne peut pas etre inferior a la date d'aujordhui", [
                {
                  text: "Fermer",
                  onPress: () => null,
                  style: "cancel"
                }
              ]);
        }
       
        // if(now< new Date(currentDate).now())
        if (event.type === 'dismissed' || isBeforeToday) {
          setstart_date(start_date)
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
  
    return <ScrollView scrollEnabled={enableScroll} contentContainerStyle={{padding:8}} style={{backgroundColor:'#fff',flex:1}}>
        
        <DistrubutorsDopDown {...{distrubutors,selectedDistrubutor, setselectedDistrubutor}} />
        <Error mga={8} trigger={error && error.id =="DISTRUBUTOR"} error={error && error.message} />
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
        <SafeAreaView style={{paddingTop:0 }}>
            <ClientsOrdering setenableScroll={setenableScroll} sectorClients={selectedSectorClients} setorderListOfClients={setorderListOfClients} />
        </SafeAreaView>
        
        <Error mga={8} trigger={error && error.id =="ALREACY_ASIGNED"} error={error && error.message} />
        <Button color={"BLUE"}  padding={0} disabled={!canSubmit} clickHandler={createNewSchdule}>
            <Text style={{color:"#fff",textAlign:'center'}}>{update?"Modifier le trajet":"Ajouter Le trajet"}</Text>
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
       schedule_add_error : state.scheduel.schedule_add_error,
    }),
    dispatch=>({
        addScheduel:dispatch.scheduel.addScheduel,
        updateScheduel:dispatch.scheduel.updateScheduel,
        resetIsDone:dispatch.scheduel.resetIsDone,
        resetError:dispatch.scheduel.resetError,
    })
)(Schedule)

