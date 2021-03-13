import React from 'react'
import {createStackNavigator,HeaderBackButton} from '@react-navigation/stack'

import DistrubutorDashBoard from '../Distrubutor/DashBoard/DistrubutorDashBoard'
import DistrubutorSectors  from '../Distrubutor/sectors/sectors'
import DistrubutorTodaysOrders   from '../Distrubutor/TodaysOrders/TodaysOrders'
import DistrubutorCatalogue  from '../Distrubutor/Catalogue/Catalogue'
import DistrubutorClientDelivry     from '../Distrubutor/ClientProductsSelection/ClientDelivry'
import DistrubutorCart   from '../Cart/Cart'
import DistrubutorValidatedCommands   from '../Distrubutor/validatedCommands/ValidatedCommands'
import DistrubutorCanceledOrders  from '../Distrubutor/CanceledOrders/CanceledOrders'
import Logo from '../Common/Logo'

import {View,Text} from 'react-native'
import {  Badge, Icon,Avatar } from 'react-native-elements'
import {TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
 


const DistributorStack = createStackNavigator()

const CustomHeaderTitle = (props)=>{
   const {clientName}=props.route.params
   return <Text>Panel des produits</Text>
   
}
const CustomHeaderRight = ({cartItems,navigation})=>{
   const COUNT=cartItems.length || 0


   return <View style={{
      marginRight:12,
      display:'flex',
      flexDirection:'row',
      alignItems:'center'
      }} >
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
         
         <Logo height={30} width={30}  />
      
       </View>
}

const DistributorStackNavigator =({cartItems})=>{
    return <DistributorStack.Navigator initialRouteName={'DISTRIBUTORDashBoard'}>
             <DistributorStack.Screen 
                name="DISTRIBUTORDashBoard" 
                options={{headerTitle:'SMARDIS'}} 
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
                     <CustomHeaderRight {...{route, navigation}} cartItems={cartItems} />
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
                name="DISTRIBUTORcanceledCommands" 
                options={({route, navigation})=>(
                   {
                   headerTitle:"Les commands annuler",
                   headerLeft :()=><HeaderBackButton 
                   label="Secteurs d'aujordhui" 
                   onPress={()=>navigation.navigate('DISTRIBUTORtodaysOrders')} 
                   />
                  })}
                component={DistrubutorCanceledOrders} 
             />
        
    </DistributorStack.Navigator>
}

export default connect(
   state=>({
      cartItems : state.cart.cartItems
   }),
   null
)(DistributorStackNavigator)
