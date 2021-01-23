import React from 'react'
import {  Badge as BadgeComponent } from 'react-native-elements'

const Badge=({status,value})=> {

    return  <BadgeComponent
         status={status}
         value={(value).toString()}
         textStyle={{
           fontSize:14
         }}
         containerStyle={{marginLeft:16}}
         badgeStyle={{ 
            height:24 ,
         }}
     />
 
}

export default Badge
