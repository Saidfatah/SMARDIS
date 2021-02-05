import React from 'react'
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'
const width= Dimensions.get('screen').width
const IMAGE_HEIGHT= (width- (16*4))/4


const CategoryItem=({category,selectedCategory,selectCategory})=> {
    const {id , name, image , count } = category
    const isSelected= selectedCategory == id
   
 
    return (
        <TouchableOpacity onPress={e=> selectCategory(id)}>
            <View style={{...styles.category }}>
                <FastImage style={{
                    ...styles.image,
                    borderColor:isSelected ?'#00bbee':'#fff',
                    height:isSelected?IMAGE_HEIGHT+5:IMAGE_HEIGHT,
                    width:isSelected?IMAGE_HEIGHT +5:IMAGE_HEIGHT, 
                    borderWidth:isSelected?3:2
                }}  
                    source={{uri:image}} 
                />
                <Text style={{fontWeight:isSelected?'bold':'normal'}} >{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryItem

var styles = StyleSheet.create({
    category:{
        borderColor:'#fff',
        
        marginRight:8,
        display:'flex',
        alignItems:'center'
    },
    image:{
        height:IMAGE_HEIGHT,
        width:IMAGE_HEIGHT , 
        borderRadius:50,
        borderWidth:2
    }
    
});
    