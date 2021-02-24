import React from 'react'
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native' 
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {colors} from '../../Common/Colors'
import {buttonTexts} from '../../Common/GlobalStrings'
import Badge from '../../Common/Badge'


const DrawerContent=(props)=> {
    const {user,valide_orders_count,logout,cartItems,navigation,admins_count,waitingList_count,waiting_clients_count,distrubutor_todays_canceled_orders_count}=props
  
    const Link=({route,icon,label,hasBadge,badgeValue,badgeStatus})=>{
        const IconToUse=()=>{
            if(!icon ) return null
            if(icon == "md-cart"){
                 return <IonIcon name="md-cart" color={colors.BLACK} style={{margin:0}} size={20}/>
            }
            if(icon == "account-settings-outline"){
                 return <Icon name="account-settings-outline" color={colors.BLACK}style={{margin:0}}size={20}/>
            }
            if(icon == "format-list-bulleted-triangle"){
                 return <Icon name="format-list-bulleted-triangle" color={colors.BLACK}style={{margin:0}}size={20}/>
            }
            if(icon == "clipboard-check-outline"){
                 return <Icon name="clipboard-check-outline" color={colors.BLACK}style={{margin:0}}size={20}/>
            }
            if(icon == "person-add-sharp"){
             return <IonIcon  name="person-add-sharp"  color={colors.BLACK} style={{margin:0}} size={20}/>
            }
            return null
        }

        return   <TouchableOpacity  onPress={() =>{navigation.navigate(route)}}>
             <View style={styles.drawerItem}> 
                     <IconToUse /> 
                     {
                         hasBadge
                         ?<View style={styles.FlexSR} >
                              <Text style={{color:colors.BLACK}} >{label}</Text>
                              <Badge status={badgeStatus} value={badgeValue} />
                         </View>
                         : <Text style={{color:colors.BLACK}} >{label}</Text>
                     }
            </View>
         </TouchableOpacity>
    
    }


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
             
                      <Link 
                          route={"UPDATE_ACCOUNT"}
                          icon="account-settings-outline"
                          label="Configurer mon compte"
                          hasBadge={false}
                       />
                      <Link 
                          route={"ADMINmanageAdmins"}
                          icon="format-list-bulleted-triangle"
                          label="Gérer les admins"
                          hasBadge={true}
                          badgeValue={admins_count}
                          badgeStatus="success"
                       />
                      <Link 
                          route={"ADMINwaitingList"}
                          icon="format-list-bulleted-triangle"
                          label="List d'attendre"
                          hasBadge={true}
                          badgeValue={waitingList_count}
                          badgeStatus="success"
                       />
                      <Link 
                          route={"ADMINwaitingClients"}
                          icon="format-list-bulleted-triangle"
                          label="List d'attendre des clients"
                          hasBadge={true}
                          badgeValue={waiting_clients_count}
                          badgeStatus="success"
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
                     label={buttonTexts.LOGOUT}
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
                           <Link 
                             route={"DISTRIBUTORcart"}
                             icon="md-cart"
                             label="La command active"
                             hasBadge={true}
                             badgeValue={cartItems.length}
                             badgeStatus="success"
                           />
                           <Link 
                             route={"DISTRIBUTORvalidtedCommands"}
                             icon="clipboard-check-outline"
                             label="Les commands valider"
                             hasBadge={true}
                             badgeValue={valide_orders_count}
                             badgeStatus="success"
                           />
                           <Link 
                             route={"DISTRIBUTORcanceledCommands"}
                             icon="clipboard-check-outline"
                             label="Les commands anuller"
                             hasBadge={true}
                             badgeValue={distrubutor_todays_canceled_orders_count}
                             badgeStatus="error"
                           />
                           <Link 
                             route={"ADMINaddClient"}
                             icon="person-add-sharp"
                             label="Ajouter Un Client"
                             hasBadge={false}
                           />
                       
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
                     label={buttonTexts.LOGOUT}
                     onPress={() => {logout({navigation})}}
                 />
            </View>
        </View>
    )

    //if no user is logged we will dsplay drawer with one link witch redirect to an "about" screen , where we can put our license
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
        admins_count : state.auth.admins_count,
        valide_orders_count : state.scheduel.valide_orders_count,
        distrubutor_todays_canceled_orders_count : state.scheduel.distrubutor_todays_canceled_orders_count,
        waitingList_count : state.auth.waitingList_count,
        waiting_clients_count : state.client.waiting_clients_count,
        cartItems : state.cart.cartItems
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
        marginBottom:16,
        flex:1
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
    FlexSR:{ 
        display :'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between"}
  });
