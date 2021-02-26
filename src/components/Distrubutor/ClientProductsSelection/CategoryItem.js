import React from 'react'
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'
import {colors} from '../../Common/Colors'
import FontWeasomeIcon from 'react-native-vector-icons/FontAwesome'
const width= Dimensions.get('screen').width
const IMAGE_HEIGHT= (width- (16*4))/4


const CategoryItem=({category,selectedCategory,selectCategory,selectSubCategory})=> {
    const {id , name, image ,isSpecial } = category
    const isSelected= selectedCategory == id
   
    const BORDER_COLOR=  isSpecial?colors.GOLD:"#fff"
    const BORDER_COLOR_SELECTED=  isSpecial?colors.GOLD:colors.BLUE
    return (
        <TouchableOpacity onPress={e=> {
            selectCategory({
                selectedCategory:id,
                isSub:category.type=="SUB",
                fromClientPanel :true
            })
            selectSubCategory(id)
            }}>
            <View style={{...styles.category }}>
                {
                    isSpecial
                    ?<Text 
                    style={{
                        position:'absolute',
                        backgroundColor:colors.GOLD,
                        color:colors.BLACK,
                        fontWeight:'bold',
                        top:0,
                        right:0,
                        zIndex:99,
                        padding:6,
                        borderRadius:12
                    }}
                    >
                        Special
                    </Text>
                    :null
                }
                <FastImage style={{
                    ...styles.image,
                    borderColor:isSelected ? BORDER_COLOR_SELECTED : BORDER_COLOR,
                    height:isSelected?IMAGE_HEIGHT+5:IMAGE_HEIGHT,
                    width:isSelected?IMAGE_HEIGHT +5:IMAGE_HEIGHT, 
                    borderWidth:isSelected?3:2
                }}  
                    source={image !="NO_IMAGE"?{uri:image}:require('../../../images/noImage.jpg')} 
                />
                <Text style={{
                    fontWeight:isSelected?'bold':'normal',
                    color: colors.BLACK
                 }} >
                 {name}
                </Text>
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
    