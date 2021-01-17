import React from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import CategoryItem from './CategoryItem'


const CategoriesSlider=({categories,selectedCategory,selectCategory})=> {
     
  console.log(categories)
    return (
        <View>
            <FlatList 
            decelerationRate={'fast'}
             horizontal={true}
             data   = {categories}
             style  = {{...styles.list}}
             contentContainerStyle = {props =>(styles.flatList)}
             showsVerticalScrollIndicator={false}
             renderItem   = {({ item }) =><CategoryItem category={item} {...{selectedCategory,selectCategory}} />}
             keyExtractor = {(item, index) => index.toString()}
            />
        </View>
    )
}

export default  CategoriesSlider
  
  

var styles = StyleSheet.create({
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
     height:200,
     flex:1
},
item:{
    marginBottom:8
}
});
