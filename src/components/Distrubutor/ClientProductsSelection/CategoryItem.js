import React from 'react'
import {View,Text,Image} from 'react-native'


const CategoryItem=({category})=> {
    const {id , name, image , count } = category


    return (
        <View>
            <Text>{name}</Text>
            <Image style={{height:100,width:100}}  source={{uri:image}} />
        </View>
    )
}

export default CategoryItem
