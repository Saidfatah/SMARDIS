import React from 'react'
import {StyleSheet,View,Text} from 'react-native' 
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';


const DrawerContent=(props)=> {
    const {user,logout,navigation}=props
    if(!user || user == null || user == undefined)
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                 <View style={styles.drawerContent}>
                    <View style={styles.drawerSection}>

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Information sure l'application"
                            onPress={() => {navigation.navigate('Profile')}}
                        />
    
                    </View>
                 </View>
            </DrawerContentScrollView>
        </View>
    )

    const {type} = user
    if(type == "ADMIN")
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                 <View style={styles.drawerContent}>
                    <View style={styles.drawerSection}>
                        <Text>{"Admin ("+user.name+")"}</Text>
                    </View>
                    <View style={styles.drawerSection}>

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Configuer L'admin"
                            onPress={() => {navigation.navigate('Profile')}}
                        />
    
                    </View>
                 </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                 <DrawerItem 
                     icon={({color, size}) => (
                         <Icon 
                         name="exit-to-app" 
                         color={color}
                         size={size}
                         />
                     )}
                     label="Sign Out"
                     onPress={() => {logout({navigation})}}
                 />
            </View>
        </View>
    )

    if(type == "DISTRUBUTOR")
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                 <View style={styles.drawerContent}>
                    <View style={styles.drawerSection}>
                        <Text>{"Vendeur ("+user.name+")"}</Text>
                    </View>
                    <View style={styles.drawerSection}>

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Configuer L'admin"
                            onPress={() => {navigation.navigate('Profile')}}
                        />
    
                    </View>
                 </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                 <DrawerItem 
                     icon={({color, size}) => (
                         <Icon 
                         name="exit-to-app" 
                         color={color}
                         size={size}
                         />
                     )}
                     label="Sign Out"
                     onPress={() => {logout({navigation})}}
                 />
            </View>
        </View>
    )
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                 <View style={styles.drawerContent}>
                    <View style={styles.drawerSection}>

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Information sure l'application"
                            onPress={() => {navigation.navigate('Profile')}}
                        />
    
                    </View>
                 </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default connect(
    state=>({
        user : state.auth.user
    }),
    dispatch=>({
        logout:dispatch.auth.logout
    })
)(DrawerContent)

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
