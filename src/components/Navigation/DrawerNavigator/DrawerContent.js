import React from 'react'
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native' 
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {colors} from '../../Common/Colors'
import Badge from '../../Common/Badge'
import TodaysOrders from '../../Distrubutor/TodaysOrders/TodaysOrders';

const DrawerContent=(props)=> {
    const {user,distrubutor_todays_valide_orders_count,logout,navigation,distrubutor_todays_canceled_orders_count}=props
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
                       <View style={styles.drawerItem}>
                           <Icon 
                             name="clipboard-check-outline" 
                             color={colors.BLACK}
                             style={{margin:0}}
                             size={20}
                             />
                            <TouchableOpacity  onPress={() => {navigation.navigate('DISTRIBUTORvalidtedCommands')}}>
                               <View style={{ 
                                   display :'flex',
                                   flexDirection:'row',
                                   alignItems:'center',
                                   justifyContent:"space-between",}} >
                                   <Text style={{color:colors.BLACK}} >Configurer mon compte</Text>
                                
                               </View>
                            </TouchableOpacity>
                        </View>
                       <View style={styles.drawerItem}>
                            <Icon 
                             name="clipboard-check-outline" 
                             color={colors.BLACK}
                             style={{margin:0}}
                             size={20}
                             />
                            <TouchableOpacity  onPress={() => {navigation.navigate('ADMINmanageAdmins')}}>
                               <View style={{ 
                                   display :'flex',
                                   flexDirection:'row',
                                   alignItems:'center',
                                   justifyContent:"space-between",}} >
                                   <Text style={{color:colors.BLACK}} >Gérer les admins </Text>
                               </View>
                            </TouchableOpacity>
                        </View>
        
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
                    {
                        user.confirmed == "VALIDATED"
                        ? <View style={styles.drawerSection}>
                            <View style={styles.drawerItem}>
                              <Icon 
                                 name="clipboard-check-outline" 
                                 color={colors.BLACK}
                                 style={{margin:0}}
                                 size={20}
                                 />
                            <TouchableOpacity  onPress={() => {navigation.navigate('DISTRIBUTORvalidtedCommands')}}>
                               <View style={{ 
                                   display :'flex',
                                   flexDirection:'row',
                                   alignItems:'center',
                                   justifyContent:"space-between",}} >
                                   <Text style={{color:colors.BLACK}} >Les command valider </Text>
                                   <Badge status="success" value={distrubutor_todays_valide_orders_count} />
                               </View>
                            </TouchableOpacity>
                        </View>
        
                            <View style={styles.drawerItem}>
                              <Icon 
                                 name="clipboard-check-outline" 
                                 color={colors.BLACK}
                                 style={{margin:0}}
                                 size={20}
                                 />
                            <TouchableOpacity  onPress={() => {navigation.navigate('DISTRIBUTORcanceledCommands')}}>
                               <View style={{ 
                                   display :'flex',
                                   flexDirection:'row',
                                   alignItems:'center',
                                   justifyContent:"space-between",}} >
                                   <Text style={{color:colors.BLACK}} >Les command anuller </Text>
                                   <Badge status="error" value={distrubutor_todays_canceled_orders_count} />
                               </View>
                            </TouchableOpacity>
                        </View>
                        </View>
                        :null
                    }
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
        user : state.auth.user,
        distrubutor_todays_valide_orders_count : state.scheduel.distrubutor_todays_valide_orders_count,
        distrubutor_todays_canceled_orders_count : state.scheduel.distrubutor_todays_canceled_orders_count,
    }),
    dispatch=>({
        logout:dispatch.auth.logout
    })
)(DrawerContent)

const styles = StyleSheet.create({
    drawerItem: {
        display :'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        padding:16,
        elevation:12,
        backgroundColor:'#fff',
        borderRadius:12,
        marginBottom:16
    },
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
      padding:8
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
