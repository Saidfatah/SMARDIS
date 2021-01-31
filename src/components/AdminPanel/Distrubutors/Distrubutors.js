import React,{useEffect} from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Item from '../../Common/Item'
import Button from '../../Common/Button'

const  Distrubutors=({navigation,distrubutors,fetchMoreDistrubutors,fetchDistrubutors})=> {
    useEffect(() => {
        fetchDistrubutors()
    }, [])
    
    const handleLoadMore=()=>{
        console.log('laodmore')
        fetchMoreDistrubutors()
    }

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
        distrubutors:state.distrubutor.distrubutors
    }),
    dispatch=>({
        fetchDistrubutors     : dispatch.distrubutor.fetchDistrubutors,
        fetchMoreDistrubutors : dispatch.distrubutor.fetchMoreDistrubutors,
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
        padding:16,
        flex: 1
    },
    Clientlist:{
        borderColor:'#fff',
        padding:16,
    },
    flatList:{ 

         paddingBottom: 20 
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
  