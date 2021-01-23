import React,{useState,useEffect} from 'react'
import {View,Text,ScrollView,SafeAreaView} from 'react-native'
import { connect } from 'react-redux'
import ClientsOrdering from './ClientsOrdering'
import SectorsDropDown from './SectorsDropDown'
import DistrubutorsDopDown from './DistrubutorsDopDown'
import Button from '../../Common/Button'
import Label from '../../Common/Label'


const Schedule = ({addOrder,clients,sectors,distrubutors,adminId})=> {
    const [selectedSectorClients, setselectedSectorClients] = useState([])
    const [selectedSector, setselectedSector] = useState(sectors[0] || {name:"SECTOR",city:"Ouarzazate",id:-1})
    const [selectedDistrubutor, setselectedDistrubutor] = useState(distrubutors[0] || {name:"ali",id:-1})
    const [orderListOfClients, setorderListOfClients] = useState([])

    useEffect(() => {
         if(sectors.length >0 && clients.length>0 && distrubutors.length>0)
         setselectedSectorClients([...clients].map(cl=> cl.sectorId == 0))
    }, [])
    useEffect(() => {
         if(sectors.length >0 && clients.length>0 && distrubutors.length>0)
         {
             console.log(selectedSector.id)
             const sectorClients = [...clients].filter(cl=> cl.sectorId == selectedSector.id)
             setselectedSectorClients(sectorClients)
         }
    }, [selectedSector.id])
    
    const createNewSchdule=e=>{
        if(adminId != undefined && selectedDistrubutor.id && selectedSector.id && orderListOfClients.length>0 ){
            addOrder({
                adminId,
                distrubutorId:selectedDistrubutor.id,
                distination:{
                    sector  : selectedSector ,
                    clients : orderListOfClients 
                }
            })
        }else{
            console.log('handle thjis erro  in error flash message')
        }
    }

    if(sectors.length >0 && clients.length>0 && distrubutors.length>0)
    {
        return <ScrollView style={{backgroundColor:'#fff',flex:1}}>
            <DistrubutorsDopDown {...{distrubutors,selectedDistrubutor, setselectedDistrubutor}} />
            <SectorsDropDown {...{sectors,selectedSector, setselectedSector}} />
            
            <Label mgl={8} mgb={0} label={"List des clients du secteur "+ selectedSector.name} />
            <SafeAreaView style={{padding: 8,paddingTop:0 }}>
                <ClientsOrdering sectorClients={selectedSectorClients} setorderListOfClients={setorderListOfClients} />
            </SafeAreaView>

            <Button color={"BLUE"} clickHandler={createNewSchdule}>
                <Text style={{color:"#fff",textAlign:'center'}}>Ajouter Le trajet</Text>
            </Button>
        </ScrollView>
    }else{
        return <Text>Loading ...</Text>
    }
    

}

export default connect(
    state=>({
       clients : state.client.clients,
       sectors : state.client.sectors,
       distrubutors : state.distrubutor.distrubutors,
       adminId : state.auth.adminId,
    }),
    dispatch=>({
        addOrder:dispatch.order.addOrder
    })
)(Schedule)

