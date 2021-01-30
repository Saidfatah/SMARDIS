import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import DrawerNavigator from './DrawerNavigator/DrawerNavigator'
import {Login,Authorizer} from './Screens'

const AuthorizeStack     = createStackNavigator()

const AuthorizeStackNavigator =()=>{
    return <AuthorizeStack.Navigator initialRouteName={'AUTHORIZER'}>
             <AuthorizeStack.Screen name="LOGIN" component={Login} />
             <AuthorizeStack.Screen name="AUTHORIZER" component={Authorizer} />
             <AuthorizeStack.Screen  name="drawer"  component={DrawerNavigator} />
      </AuthorizeStack.Navigator >
}

export default AuthorizeStackNavigator

