import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { connect } from 'react-redux'
import DistributorStackNavigator from './DistributorStackNavigator'
import AdminStackNavigator from './AdminStackNavigator'
import Login       from '../Auth/Login/Login'
import Authorizer  from '../Auth/Authorizer/Authorizer'
import WaitingRoom from '../Auth/Register/WaitingRoom'
import Register    from '../Auth/Register/Register'
import MyAccount    from '../Auth/Account/MyAccount'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerNavigator/DrawerContent'
import DistrubutorBillTable   from '../Distrubutor/validatedCommands/BillTable'

const Drawer = createDrawerNavigator();
const Navigator =({authenticated,userType})=>{
    return <NavigationContainer >
       <Drawer.Navigator 
       screenOptions={{headerShown:false}} 
       initialRouteName="AUTHORIZER"
       drawerContent={props => <DrawerContent {...props} />}
       >
             <Drawer.Screen name="ADMINDashBoard"  component={AdminStackNavigator} />
             <Drawer.Screen name="DISTRUBUTORDashBoard" component={DistributorStackNavigator} />
             <Drawer.Screen name="LOGIN" component={Login} />
             <Drawer.Screen name="REGISTER" component={Register} />
             <Drawer.Screen name="AUTHORIZER" component={Authorizer} />
             <Drawer.Screen name="UPDATE_ACCOUNT" component={MyAccount} />
             <Drawer.Screen name="WAIT_ROOM" component={WaitingRoom} />
             <Drawer.Screen 
                name="BillTable" 
                options={{
                    headerTitle:"Bon de command",
                    headerShown:true
                }}
                component={DistrubutorBillTable} 
             />
       </Drawer.Navigator>
    </NavigationContainer>
}

export default connect(
    state=>({
        authenticated:state.auth.authenticated,
        userType:state.auth.userType,
    }),
    null
)(Navigator)
