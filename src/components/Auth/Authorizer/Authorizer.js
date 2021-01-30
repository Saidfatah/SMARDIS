
import React,{useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Logo from '../../Common/Logo'
import BackgroundImage from '../../Common/BackgroundImage'


const  Authorizer=({navigation,authenticated,userType})=> {
    useEffect(() => {
         setTimeout(() => {
            if(authenticated ){
                navigation.navigate(userType+'DashBoard') 
             }else{
                navigation.navigate('LOGIN')
             }
         }, 3000);
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
         borderColor:'#fff',
         borderWidth:2,
         borderRadius:12,
         elevation:12
         }} >
         <Logo width={100} height={100}  />
        </View>
    </View>
    </BackgroundImage>
}

export default connect(
    state=>({
        authenticated : state.auth.authenticated,
        userType : state.auth.userType,
    }),
    null
)(Authorizer)

