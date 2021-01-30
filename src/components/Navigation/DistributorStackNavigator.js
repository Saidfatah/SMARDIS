import React from 'react'
import {createStackNavigator,HeaderBackButton} from '@react-navigation/stack'
import {
    DistrubutorCart,
    DistrubutorCatalogue,
    DistrubutorClientDelivry,
    DistrubutorSectors,
    DistrubutorTodaysOrders,
    DistrubutorDashBoard,
    DistrubutorBillTable,
    DistrubutorValidatedCommands,
    
} from './Screens'
import {View,Text} from 'react-native'
import {  Badge, Icon,Avatar } from 'react-native-elements'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import {colors} from '../Common/Colors'
import {TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import Button from '../Common/Button'


const DistributorStack = createStackNavigator()

const CustomHeaderTitle = (props)=>{
   const {clientName}=props.route.params
   if(clientName) return <Text>panel des produits pour {clientName}</Text>
   return <Text>panel des produits</Text>
   
}
const CustomHeaderRight = ({cartGuests,navigation})=>{
   const COUNT=[...cartGuests].filter(cartGuest=>cartGuest.status != "VALIDATED").length || 0


   return <View style={{marginRight:12,display:'flex',flexDirection:'row'}} >
          <TouchableOpacity onPress={()=>{navigation.navigate('DISTRIBUTORcart')}} >
             <View style={{marginRight:16}}>
                <Icon type="ionicon" name="md-cart" size={30} />
                <Badge
                  status="error"
                  value={COUNT.toString()}
                   textStyle={{
                     fontSize:14
                   }}
                   badgeStyle={{ 
                      height:24 ,
                      width:COUNT.toString().split('').length >= 2 ? 25 : 20
                   }}
                  containerStyle={{
                      position: 'absolute', 
                      top: -10, 
                      right: -10 ,
                   }}
                />
             </View>
         </TouchableOpacity>
          <Avatar
            rounded
            source={require('../../images/logo.png')}
            size="small"
          />
       </View>
}

const DistributorStackNavigator =({cartGuests})=>{
    return <DistributorStack.Navigator initialRouteName={'DISTRIBUTORDashBoard'}>
             <DistributorStack.Screen 
                name="DISTRIBUTORDashBoard" 
                options={{headerTitle:'DashBoard'}} 
                component={DistrubutorDashBoard} 
            />
             <DistributorStack.Screen 
                name="DISTRIBUTORtodaysOrders" 
                options={{headerTitle:"Les misson d'aujourdhui"}}
                component={DistrubutorTodaysOrders} 
            />
             <DistributorStack.Screen 
                name="DISTRIBUTORsectors" 
                options={{headerTitle:"Les secteurs"}}
                component={DistrubutorSectors} 
            />
             <DistributorStack.Screen 
                name="DISTRIBUTORclientDelivery" 
                options={({route, navigation}) => ({
                  headerTitle:() => (
                     <CustomHeaderTitle {...{route, navigation}}  />
                  ),
                  headerRight: () => (
                     <CustomHeaderRight {...{route, navigation}} cartGuests={cartGuests} />
                  ),
        
                 })}
                component={DistrubutorClientDelivry} 
             />
             <DistributorStack.Screen 
                name="DISTRIBUTORcatalogue" 
                options={{headerTitle:"Le catalogue"}}
                component={DistrubutorCatalogue} 
             />
             <DistributorStack.Screen 
                name="DISTRIBUTORcart" 
                options={{headerTitle:"Le panier"}}
                component={DistrubutorCart} 
             />
             <DistributorStack.Screen 
                name="DISTRIBUTORvalidtedCommands" 
                options={({route, navigation})=>(
                   {
                   headerTitle:"Les commands valider",
                   headerLeft :()=><HeaderBackButton 
                   label="Secteurs d'aujordhui" 
                   onPress={()=>navigation.navigate('DISTRIBUTORtodaysOrders')} 
                   />
                  })}
                component={DistrubutorValidatedCommands} 
             />
             <DistributorStack.Screen 
                name="DISTRIBUTOOrderBill" 
                options={{headerTitle:"Bon de command"}}
                component={DistrubutorBillTable} 
             />
    </DistributorStack.Navigator>
}

export default connect(
   state=>({
      cartGuests : state.cart.cartGuests
   }),
   null
)(DistributorStackNavigator)
