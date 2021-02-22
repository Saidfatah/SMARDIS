import React from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Loading from '../../Common/Loading'
import CategoryItem from './CategoryItem'

const  Categories=({navigation,categories,done_fetching_categories})=> {


    if(categories.length < 1 && !done_fetching_categories ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>


    return (
      <View style={{backgroundColor:'#fff'}}  >
        <FlatList 
           data   = {categories.filter(category=>category.type=="MAIN")}
           style  = {{...styles.list}}
           contentContainerStyle = {props =>(styles.flatList)}
           showsVerticalScrollIndicator={false}
           renderItem   = {({ item ,index}) =><CategoryItem navigation={navigation} category={item} /> }
           keyExtractor = {(item, index) => index.toString()}
        />
      </View>
    )
}
export default connect(
  state=>({
    categories:state.categories.categories,
    done_fetching_categories:state.categories.done_fetching_categories,
  }),
  null
)(Categories)

var styles = StyleSheet.create({
  categoryItem:{
      display:'flex',
      flexDirection:'row-reverse' ,
      justifyContent:'space-between',
      paddingLeft:16,
      marginBottom:8,
      alignItems:'center',
  },
  category:{
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
  }
});


