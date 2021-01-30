import React from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Item from '../../Common/Item'
import Button from '../../Common/Button'

const  Distrubutors=({navigation,distrubutors})=> {
    return (
        <View style={{backgroundColor:'#fff'}}  >
        <FlatList 
           data   = {distrubutors}
           style  = {{...styles.list}}
           contentContainerStyle = {props =>(styles.flatList)}
           showsVerticalScrollIndicator={false}
           onEndReached={e=> {
             console.log('reached end')
            //  setTimeout(()=>fetchMore(),2000)
           }}
           renderItem   = {({ item ,index}) =><Item xStyle={styles.distrubutorItem}  >
               <View style={styles.distrubutor} >
                   <Text>{item.name}</Text>     
               </View>
               <Button
                 xStyle={{margin:0,borderRadius:12}} 
                 color={"BLUE"} 
                 clickHandler={e=>{ navigation.navigate('ADMINdistrubutorPage',{distrubutor:item})}} 
                 >
                    <Text style={styles.buttonText}>Afficher</Text>
               </Button>
           </Item>
           }
           keyExtractor = {(item, index) => index.toString()}
        />
      </View>
    )
}

export default connect(
    state=>({
        distrubutors:state.distrubutor.distrubutors
    })
)(Distrubutors)

var styles = StyleSheet.create({
    distrubutorItem:{
        display:'flex',
        flexDirection:'row-reverse' ,
        justifyContent:'space-between',
        paddingLeft:16,
        marginBottom:8,
        alignItems:'center',
    },
    distrubutor:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:8,
    },
    list:{
        borderColor:'#fff',
        padding:16,
    },
    Clientlist:{
        borderColor:'#fff',
        padding:16,
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
    },
    buttonText:{ 
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold'
    }
  });
  