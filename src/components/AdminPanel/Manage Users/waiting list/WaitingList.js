import React from 'react'
import {ScrollView,View} from 'react-native'
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import WaitingItem from './WaitingItem'
import Loading from '../../../Common/Loading'

export const WaitingList = ({navigation,rejectUser,approveUser,waitingList,resetIsDone,done_rejecting_client,done_approving_client,done_fetching_waiting_list}) => {
    
    const TITLE = waitingList.length >0  ? "List d'attendre"  :"List d'attendre est vide "

    if(waitingList.length < 1  && !done_fetching_waiting_list) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>

 
    return (
        <ScrollView  contentContainerStyle={{flex:1}}  > 
            <View style={{backgroundColor:'#fff',minHeight:"100%", flex:1 ,padding:8}}>
                 <List.Section title={TITLE}>
                    {waitingList.map((user,i)=> <WaitingItem  key={i} {...{user,approveUser,rejectUser,resetIsDone,done_rejecting_client,done_approving_client}} /> )}
                 </List.Section>
            </View>
        </ScrollView>
    )
}

 

export default connect(
     state=>({
         waitingList : state.auth.waitingList,
         done_fetching_waiting_list : state.auth.done_fetching_waiting_list,
         done_approving_client: state.auth.done_approving_client,
         done_rejecting_client: state.auth.done_rejecting_client,
     }),
     dispatch=>({
         resetIsDone:dispatch.auth.resetIsDone,
         rejectUser:dispatch.auth.rejectUser,
         approveUser:dispatch.auth.approveUser,
     }))
(WaitingList)
