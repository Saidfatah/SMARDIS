import React,{useEffect} from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Image from 'react-native-fast-image'
import Item from '../../Common/Item'
import Button from '../../Common/Button'
import Loading from '../../Common/Loading'

const  Categories=({navigation,categories,fetchCategories})=> {
    useEffect(() => {
      fetchCategories()
    }, [fetchCategories])

    if(categories.length < 1 ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>


    return (
      <View style={{backgroundColor:'#fff'}}  >
        <FlatList 
           data   = {categories}
           style  = {{...styles.list}}
           contentContainerStyle = {props =>(styles.flatList)}
           showsVerticalScrollIndicator={false}
           renderItem   = {({ item ,index}) =><Item xStyle={styles.categoryItem}  >

                    <View style={styles.category} >
                        <Text>{item.name}</Text>
                        <Image 
                         style={{height:50,width:50,borderRadius:50,marginLeft:8}}  
                         source={item.image!="NO_IMAGE"
                         ?{uri:item.image}
                         :require('../../../images/noImage.jpg')
                         }  
                        />
                    </View>
                    <Button
                      xStyle={{margin:0,borderRadius:12}} 
                      color={"BLUE"} 
                      clickHandler={e=>{ navigation.navigate('ADMINcategoryPage',{category:item})}} 
                      >
                         <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>Afficher</Text>
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
    categories:state.products.categories
  }),
  dispatch=>({
    fetchCategories:dispatch.products.fetchCategories
  })
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


