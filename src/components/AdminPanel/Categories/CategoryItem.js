import React from 'react'
import Image from 'react-native-fast-image'
import Item from '../../Common/Item'
import Button from '../../Common/Button'
import {View,Text,StyleSheet} from 'react-native'

const CategoryItem=({category,navigation})=> {
    return <Item xStyle={styles.categoryItem}  >

    <View style={styles.category} >
        <Text>{category.name}</Text>
        <Image 
         style={styles.image}  
         source={category.image!="NO_IMAGE"
         ?{uri:category.image}
         :require('../../../images/noImage.jpg')
         }  
        />
    </View>
    <Button
      xStyle={{margin:0,borderRadius:12}} 
      color={"BLUE"} 
      clickHandler={e=>{ navigation.navigate('ADMINcategoryPage',{category})}} 
      >
         <Text style={styles.btnText}>Afficher</Text>
    </Button>

</Item>
}

export default CategoryItem

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
    image:{
        height:50,
        width:50,
        borderRadius:50,
        marginLeft:8
    },
    title:{
       fontSize:20,
       marginTop:16,
       color:'#fff'
    },
    btnText:{color:"#fff",textAlign:'center',fontWeight:'bold'}
  });
  
  
  