
import React,{useEffect} from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import Logo from '../../Common/Logo'
import BackgroundImage from '../../Common/BackgroundImage'


const  Authorizer=({navigation,authenticated,userType,addDistrubutorsList,checkAuthetication})=> {
    useEffect(() => {
        setTimeout(() => {
            checkAuthetication({navigation})
        }, 4000);
    }, [])


    return<BackgroundImage>
        {/* <TouchableOpacity onPress={e=>addDistrubutorsList()}>
               <Text>Add distrubutors array</Text>
        </TouchableOpacity> */}
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
    dispatch=>({
         checkAuthetication:dispatch.auth.checkAuthetication,
         addDistrubutorsList:dispatch.auth.addDistrubutorsList,
    })
)(Authorizer)

