import React ,{useState,useEffect} from 'react'
import {View,Text,ScrollView,Dimensions,StatusBar} from 'react-native'
import { connect } from 'react-redux'
import ScheduleItem from './ScheduleItem'
import { List } from 'react-native-paper';
import Loading from '../../../Common/Loading'

const {height}=Dimensions.get('screen')
const HEIGHT = height- StatusBar.currentHeight


export const ListOfSchedules = ({scheduels}) => {
    const [finishedLoading, setfinishedLoading] = useState(false)
    useEffect(() => {
        let mounted =true
        setTimeout(() => {
            if(mounted)
            setfinishedLoading(true)
        }, 10000);
        return ()=>mounted=false
    }, [])

    const TITLE = scheduels.length >0 ? "les order active" :"ilnya pas de emploi du temps"

    if(scheduels.length <1 && !finishedLoading ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>

    return (
        <ScrollView  > 
            <View style={{backgroundColor:'#fff',minHeight:HEIGHT, flex:1 ,padding:8}}>
                 <List.Section title={TITLE}>
                    {scheduels.map((item,i)=> <ScheduleItem scheduel={item} key={i}  />)}
                 </List.Section>
            </View>
        </ScrollView>
    )
}

 

export default connect(
    state=>({
        scheduels: state.scheduel.scheduels 
    }),
    null
)
(ListOfSchedules)
