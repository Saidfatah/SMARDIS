import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {
   AdminAddNewAdmin,
   AdminCategories,
   AdminCatalogue,
   AdminDashBoard,
   AdminClients,
   AdminDistrubutors,
   AdminProducts,
   AdminOrdersValidated,
   AdminRegisterDistrubutor,
   AdminSales,
   AdminSchedule,
   AdminSectors
} from './Screens'

const AdminStack     = createStackNavigator()

const AdminStackNavigator =()=>{
    return <AdminStack.Navigator initialRouteName={'ADMINDashBoard'}>
             <AdminStack.Screen name="ADMINdashBoard" options={{title:"Admin Abdellah"}} component={AdminDashBoard} />
             <AdminStack.Screen name="ADMINcategories" component={AdminCategories} />
             <AdminStack.Screen name="ADMINcatalogue" component={AdminCatalogue} />
             <AdminStack.Screen name="ADMINaddNewAdmin" component={AdminAddNewAdmin} />
             <AdminStack.Screen name="ADMINclients" component={AdminClients} />
             <AdminStack.Screen name="ADMINdistrubutors" component={AdminDistrubutors} />
             <AdminStack.Screen name="ADMINproducts" component={AdminProducts} />
             <AdminStack.Screen name="ADMINordersValidated" component={AdminOrdersValidated} />
             <AdminStack.Screen name="ADMINregisterDistrubutor" component={AdminRegisterDistrubutor} />
             <AdminStack.Screen name="ADMINsales" component={AdminSales} />
             <AdminStack.Screen name="ADMINschedule" component={AdminSchedule} />
             <AdminStack.Screen name="ADMINsectors" component={AdminSectors} />
    </AdminStack.Navigator>
}

export default AdminStackNavigator
