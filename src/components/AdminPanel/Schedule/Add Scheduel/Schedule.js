import React,{useState,useEffect,useReducer} from 'react'
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




const initalState=(sectors,start_date)=>({
    canSubmit:true,
    enableScroll:true,
    update:true,
    scheduelToBeUpdated:"",
    start_date ,
    showDate:false,
    selectedSectorClients:[],
    selectedSector:sectors[0],
    selectedDistrubutor:null,
    orderListOfClients:null,
    error:null,
})
const reducer=(state,action)=>{
       switch (action.type) {
           case "SET_CAN_SUBMIT":
                return {...state,canSubmit:action.value}
           break;
           case "SET_SCROLL_ENABLE":
                return {...state,enableScroll:action.value}
           break;
           case "SET_UPDATE":
                return {...state,update:action.value}
           break;
           case "SET_SCHEDUEL_TO_UPDATE":
                return {...state,scheduelToBeUpdated:action.value}
           break;
           case "SET_START_DATE":
                return {...state,start_date:action.value}
           break;
           case "SET_SHOW_DATE":
                return {...state,showDate:action.value}
           break;
           case "SET_SELECTED_SECTOR_CLIENTS":
                return {...state,selectedSectorClients:action.value}
           break;
           case "SET_SELECTED_SECTOR":
                return {...state,selectedSector:action.value}
           break;
           case "SET_SELECTED_DISTRUBUTOR":
                return {...state,selectedDistrubutor:action.value}
           break;
           case "SET_ORDERD_LIST_OF_CLIENTS":
                return {...state,orderListOfClients:action.value}
           break;
           case "SET_ERROR":
                return {...state,error:action.value}
           break;
       
           default: return state
              
       }
}
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
    const [state, dispatch] = useReducer(reducer, initalState(sectors,new Date()))

     if(!sectors.length || !clients.length || !distrubutors.length ) return <Loading />

     const {
        canSubmit ,
        enableScroll,
        update,
        scheduelToBeUpdated ,
        start_date  ,
        showDate,
        selectedSectorClients ,
        selectedSector ,
        selectedDistrubutor,
        orderListOfClients,
        error,
    }=state

    useEffect(() => {
        if(done_adding_scheduel){
            //  setcanSubmit(true) 
            dispatch({type:"SET_CAN_SUBMIT",value:true}) 
             resetIsDone("done_adding_scheduel")
        }
    }, [done_adding_scheduel])
    useEffect(() => {
        dispatch({type:"SET_CAN_SUBMIT",value:true}) 

        if(schedule_add_error){
           seterror({...schedule_add_error}) 
           dispatch({type:"SET_ERROR",value:schedule_add_error}) 
           resetError('schedule_add_error')
        }
    }, [schedule_add_error])

    useEffect(() => {
         if(!update && sectors.length >0 && clients.length>0 && distrubutors.length>0)
         dispatch({type:"SET_SELECTED_SECTOR_CLIENTS",value:[...clients].filter(cl=> cl.sectorId == selectedSector.id)}) 
        //  setselectedSectorClients()

         if(route.params){
           
            if(route.params.update == undefined) return 
            const {scheduel}=route.params
            const { distrubutor,distination ,id}=scheduel
            dispatch({type:"SET_UPDATE",value:true}) 
            dispatch({type:"SET_SCHEDUEL_TO_UPDATE",value:id}) 
            dispatch({type:"SET_START_DATE",value:scheduel.start_date}) 
            dispatch({type:"SET_SELECTED_SECTOR_CLIENTS",value:distination.clients}) 
            dispatch({type:"SET_ORDERD_LIST_OF_CLIENTS",value:distination.clients}) 
            dispatch({type:"SET_SELECTED_DISTRUBUTOR",value:distrubutors.filter(d=>d.id == distrubutor.id)[0]}) 
            dispatch({type:"SET_SELECTED_SECTOR",value:sectors.filter(s=>s.id == distination.sector.id)[0]}) 

            // setupdate(true)
            // setscheduelToBeUpdated(id)
            // setstart_date(scheduel.start_date)
            // setselectedSectorClients([...distination.clients])
            // setorderListOfClients([...distination.clients])
            // setselectedDistrubutor(distrubutors.filter(d=>d.id == distrubutor.id)[0])
            // setselectedSector(sectors.filter(s=>s.id == distination.sector.id)[0])
           
         } 
    }, [])
 
    useEffect(() => {
         if(sectors.length >0 && clients.length>0 && distrubutors.length>0)
         {
             const sectorClients = [...clients].filter(cl=> cl.sectorId == selectedSector.id)
             dispatch({type:"SET_SELECTED_SECTOR_CLIENTS",value:sectorClients}) 
             dispatch({type:"SET_ORDERD_LIST_OF_CLIENTS",value:sectorClients}) 
             
            //  setselectedSectorClients(sectorClients)
            //  setorderListOfClients(sectorClients)
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
            // seterror(null)
            dispatch({type:"SET_CAN_SUBMIT",value:false}) 
            dispatch({type:"SET_ERROR",value:true}) 

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
        // setshowDate(false)
        dispatch({type:"SET_SHOW_DATE",value:false}) 

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
        //   setstart_date(start_date)
        dispatch({type:"SET_START_DATE",value:start_date}) 

        }else if(event.type === 'set') {
        //   setstart_date(currentDate)
        dispatch({type:"SET_START_DATE",value:currentDate}) 
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
    
    const DatePickerFactored=()=>{
        return <View>
            <Button 
        color="WHITE" 
        clickHandler={e=>dispatch({type:"SET_SHOW_DATE",value:true}) } 
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
               <Text>{start_date && start_date.toLocaleDateString('en-US')}</Text>
               <FontistoIcon 
                    name="date" 
                    color={colors.BLACK} 
                    size={25}
               />
            </View>
        </Button>    
         { showDate && <DatePicker {...pickerProps} />}
        </View>
    }
    return <ScrollView scrollEnabled={enableScroll} contentContainerStyle={{padding:8}} style={{backgroundColor:'#fff',flex:1}}>
        
        <DistrubutorsDopDown {...{distrubutors,selectedDistrubutor, dispatch}} />
        <Error mga={8} trigger={error && error.id =="DISTRUBUTOR"} error={error && error.message} />
        <SectorsDropDown {...{sectors,selectedSector, dispatch}} />
        <DatePickerFactored/>
        
        <Label mgl={8} mgb={0} label={"List des clients du secteur "+ selectedSector.name} />
        <SafeAreaView style={{paddingTop:0 }}>
            <ClientsOrdering   sectorClients={selectedSectorClients} dispatch={dispatch} />
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

