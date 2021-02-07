import React,{useEffect} from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'
import { connect } from 'react-redux';
import Button from '../../Common/Button'
import Loading from '../../Common/Loading'
import Item from '../../Common/Item'


const  Sectors=({navigation,sectors,fetchSectors})=> {
    useEffect(() => {
        fetchSectors()
    }, [fetchSectors])

    if( sectors.length <1) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>



    return (
        <View style={{backgroundColor:'#fff',flex: 1}} >
         <FlatList 
         data   = {sectors}
         style  = {{...styles.list}}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         ListFooterComponent={<View style={{ height: 0, marginBottom: 90 }}></View>}
         renderItem   = {({ item ,index}) =><Item key={index} xStyle={{ marginBottom:16}} >
         <View style={{ 
           display:'flex',
           flexDirection:'row-reverse' ,
           justifyContent:'space-between',
           alignItems:'center',
           paddingLeft:16
           }}>
             <Text style={{flex:1,fontWeight:'bold',textAlign:'right'}}>{item.name}</Text>
             <Button
              xStyle={{flex:1,margin:0,borderRadius:12}} 
              color={"BLUE"} 
              clickHandler={()=>navigation.navigate('ADMINsectorPage',{sector:item})} 
              >
                 <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>Afficher</Text>
             </Button>
         </View>
       </Item>}
         keyExtractor = {(item, index) => index.toString()}
        />
        </View>
    )
}

export default connect(
    state=>({
        sectors : state.sector.sectors,
    }),
    dispatch=>({
        fetchSectors: dispatch.sector.fetchSectors,
    })
)(Sectors)

var styles = StyleSheet.create({
    Clientlist:{
        borderColor:'#fff',
        padding:16,
    },
    list:{
      padding:16,
      flex: 1
  },
  flatList:{ 
      alignItems: 'center',
       justifyContent: 'center', 
       flex:1
  },
    title:{
       fontSize:20,
       marginTop:16,
       color:'#fff'
    }
  });
  
  