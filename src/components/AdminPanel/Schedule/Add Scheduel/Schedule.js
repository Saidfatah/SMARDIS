import React,{useState,useEffect} from 'react'
import {View,Text,ScrollView,SafeAreaView} from 'react-native'
import { connect } from 'react-redux'
import ClientsOrdering from './ClientsOrdering'
import SectorsDropDown from './SectorsDropDown'
import DistrubutorsDopDown from './DistrubutorsDopDown'
import Button from '../../../Common/Button'
import Label from '../../../Common/Label'
import Loading from '../../../Common/Loading'

const Schedule = ({addScheduel,clients,done_adding_scheduel,resetIsDone,sectors,distrubutors,adminId})=> {
    const [canSubmit, setcanSubmit] = useState(true)
    const [selectedSectorClients, setselectedSectorClients] = useState([])
    const [selectedSector, setselectedSector] = useState(sectors[0])
    const [selectedDistrubutor, setselectedDistrubutor] = useState(distrubutors[0])
    const [orderListOfClients, setorderListOfClients] = useState([])

    useEffect(() => {
        done_setting_admin_to_master == true && setcanSubmit(true) && resetIsDone("done_adding_scheduel")
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
                }
            })
        }else{
            console.log('handle thjis erro  in error flash message')
        }
    }

 
        return <ScrollView style={{backgroundColor:'#fff',flex:1}}>
            <DistrubutorsDopDown {...{distrubutors,selectedDistrubutor, setselectedDistrubutor}} />
            <SectorsDropDown {...{sectors,selectedSector, setselectedSector}} />
            
            <Label mgl={8} mgb={0} label={"List des clients du secteur "+ selectedSector.name} />
            <SafeAreaView style={{padding: 8,paddingTop:0 }}>
                <ClientsOrdering sectorClients={selectedSectorClients} setorderListOfClients={setorderListOfClients} />
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

