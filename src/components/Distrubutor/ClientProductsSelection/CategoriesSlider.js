import React from 'react'
import {View,Text,FlatList,StyleSheet,Dimensions} from 'react-native'
import CategoryItem from './CategoryItem'


const width= Dimensions.get('screen').width
const IMAGE_HEIGHT= (width- (16*4))/4

const CategoriesSlider=({categories,selectedCategory,selectCategory})=> {
    return (
        <View  >
            <FlatList 
             decelerationRate={'fast'}
             snapToInterval={IMAGE_HEIGHT}
             showsHorizontalScrollIndicator={false}
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
