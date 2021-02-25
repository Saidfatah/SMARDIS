
import React,{useEffect} from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import Logo from '../../Common/Logo'
import BackgroundImage from '../../Common/BackgroundImage'


const  Authorizer=({navigation,logout,checkAuthetication})=> {
    useEffect(() => {
    // logout({navigation})
           setTimeout(() => {
                 checkAuthetication({navigation})
           }, 2000);
       
    }, [])


    return<BackgroundImage>
     <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        height:'100%',
    }}>
         <View style={{
         elevation:12
         }} >
         <Logo width={120} height={120}   />
        </View>
    </View>
    </BackgroundImage>
}

export default connect(
    state=>({
        authenticated : state.auth.authenticated,
        userType : state.auth.userType,
    }),
    dispatch=>({
         checkAuthetication:dispatch.auth.checkAuthetication,
         logout:dispatch.auth.logout,
    })
)(Authorizer)

