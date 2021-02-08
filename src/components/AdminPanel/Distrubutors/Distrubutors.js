import React,{useEffect} from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Item from '../../Common/Item'
import Button from '../../Common/Button'
import Loading from '../../Common/Loading'

const  Distrubutors=({navigation,distrubutors,done_fetching_distrubutors})=> {
 
    const handleLoadMore=()=>{
      
    }


    if(distrubutors.length < 1 && !done_fetching_distrubutors ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>

    return (
        <View style={{backgroundColor:'#fff',flex: 1}}  >
        <FlatList 
           data   = {distrubutors}
           style  = {{...styles.list}}
           contentContainerStyle = {props =>(styles.flatList)}
           showsVerticalScrollIndicator={false}
           onEndReached={e=>handleLoadMore()}
           onEndReachedThreshold={distrubutors.length-2/distrubutors.length}
           ListFooterComponent={<View style={{ height: 0, marginBottom: 90 }}></View>}
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
        distrubutors:state.distrubutor.distrubutors,
        done_fetching_distrubutors:state.distrubutor.done_fetching_distrubutors,
    }),
   null
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
    },
    buttonText:{ 
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold'
    }
  });
  