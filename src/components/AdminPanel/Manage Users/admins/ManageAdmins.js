import React from 'react'
import {ScrollView,View} from 'react-native'
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import AdminItem from './AdminItem'
import Loading from '../../../Common/Loading'


export const ManageAdmin = ({navigation,done_fetching_admins,resetIsDone,done_setting_admin_to_master,setMaster,admins}) => {
    const TITLE = admins.length >0  ? "List des admins"  :"List des admins est vide est vide "

    if(admins.length < 1 && !done_fetching_admins ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>

 
    return (
        <ScrollView style={{flex:1,backgroundColor:'#fff', }} contentContainerStyle={{backgroundColor:'#fff'}} > 
            <View style={{flex:1 ,padding:8}}>
                 <List.Section title={TITLE}>
                    {admins.map((user,i)=> <AdminItem  key={i} {...{user,setMaster,resetIsDone,done_setting_admin_to_master}} /> )}
                 </List.Section>
            </View>
        </ScrollView>
    )
}

 

export default connect(
     state=>({
         admins : state.auth.admins,
         done_fetching_admins : state.auth.done_fetching_admins,
         done_setting_admin_to_master : state.auth.done_setting_admin_to_master,
     }),
     dispatch=>({
         setMaster:dispatch.auth.setMaster,
         resetIsDone:dispatch.auth.resetIsDone,
     }))
(ManageAdmin)
