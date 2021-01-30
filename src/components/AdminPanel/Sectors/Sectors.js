import React,{useState} from 'react'
import {View,Dimensions,StatusBar,ScrollView} from 'react-native'
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
const {height}=Dimensions.get('screen')
const HEIGHT = height- StatusBar.currentHeight
import SectorItem from './SectorItem'

const  Sectors=({navigation,sectors,clients})=> {
    const [expandedIndex, setexpandedIndex] = useState(-1)
    const TITLE = sectors.length >0 ? "les secteurs " :"il nya pas des secteurs"
      
    return (
        <ScrollView  > 
            <View style={{backgroundColor:'#fff',minHeight:HEIGHT, flex:1 ,padding:8}}>
                 <List.Section title={TITLE}>
                    {sectors.map((sector,index)=> <SectorItem 
                    key={index}  
                    {...{
                        expandedIndex,
                        index,
                        setexpandedIndex,
                        sector,
                        navigation,
                        clients
                    }}
                    />)}
                 </List.Section>
            </View>
        </ScrollView>
    )
}

export default connect(
    state=>({
        sectors : state.client.sectors,
        clients : state.client.clients,
    }),
    null
)(Sectors)
