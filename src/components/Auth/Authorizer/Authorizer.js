
import React,{useEffect} from 'react'
import {View} from 'react-native'
import { connect } from 'react-redux'
import Logo from '../../Common/Logo'
import BackgroundImage from '../../Common/BackgroundImage'
import PushNotification from "react-native-push-notification";

const  Authorizer=({navigation,checkAuthetication})=> {
    useEffect(() => {
         setTimeout(() => {
               checkAuthetication({navigation})
         }, 2000);

         
         
         // Must be outside of any component LifeCycle (such as `componentDidMount`).
         PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
            },
        
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                const {id}=notification
                console.log({id})
                // VALDIATED_COMMANDS
            },
        
            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
            senderID: "YOUR GCM SENDER ID",
        
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
        
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
        
            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: true,
        });
        
        
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
    })
)(Authorizer)

