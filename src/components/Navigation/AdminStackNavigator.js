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
   AdminProductPage,
   AdminOrdersValidated,
   AdminRegisterDistrubutor,
   AdminSales,
   AdminSchedule,
   AdminSectors,
   AdminListOfSchedules,
   AdminAddClient,
   AdminClientPage,
   AdminAddSector,
   AdminAddProduct,
   AdminAddCategory,
   AdminCategoryPage,
   AdminDistrubutorPage,
   AdminAddDistrubutor,
   AdminSectorPage
} from './Screens'

const AdminStack     = createStackNavigator()

const AdminStackNavigator =()=>{
    return <AdminStack.Navigator initialRouteName={'ADMINdashBoard'}>
             <AdminStack.Screen 
                name="ADMINdashBoard" 
                options={({route, navigation})=>{
                    if(route.params){
                      if(route.params.ADMIN_NAME)
                      return{title:"Admin "+route.params.ADMIN_NAME}  
                    }
                    return {title:"Admin"}
                }} 
                component={AdminDashBoard} 
            />
             <AdminStack.Screen 
                name="ADMINcategories" 
                options={{title:"List des categories"}}
                component={AdminCategories} 
            />
             <AdminStack.Screen 
                name="ADMINaddCategory" 
                options={{title:"Ajoute une category"}}
                component={AdminAddCategory} 
            />
             <AdminStack.Screen 
                name="ADMINupdateCategory" 
                options={{title:"Modifier une category"}}
                component={AdminAddCategory} 
            />
             <AdminStack.Screen 
                name="ADMINcategoryPage" 
                options={({route, navigation})=>{
                    if(route.params){
                      if(route.params.CATEGORY_NAME)
                      return{title:"Category ("+route.params.CATEGORY_NAME+")"}  
                    }
                    return {title:"Category page"}
                }}
                component={AdminCategoryPage} 
            />
             <AdminStack.Screen 
                name="ADMINcatalogue" 
                component={AdminCatalogue} 
            />
             <AdminStack.Screen 
                name="ADMINaddNewAdmin" 
                component={AdminAddNewAdmin} 
            />
             <AdminStack.Screen 
                name="ADMINclients" 
                options={{title:'List des clients'}}
                component={AdminClients} 
            />
             <AdminStack.Screen 
                name="ADMINclientProfile" 
                options={{title:'Profile du client'}}
                component={AdminClientPage} 
            />
             <AdminStack.Screen 
                name="ADMINaddClient" 
                options={{title:'Ajouter un client'}}
                component={AdminAddClient} 
            />
             <AdminStack.Screen 
                name="ADMINupdateClient" 
                options={({route, navigation})=>{
                    if(route.params){
                      if(route.params.CLIENT_NAME)
                      return{title:"Modifier Le client ("+route.params.CLIENT_NAME+")"}  
                    }
                    return {title:"Modifier Le client"}
                }}
                component={AdminAddClient} 
            />
             <AdminStack.Screen 
                name="ADMINdistrubutors" 
                options={{title:'Les vendeurs'}}
                component={AdminDistrubutors} 
            />
             <AdminStack.Screen 
                name="ADMINaddDistrubutor" 
                options={{title:'Ajouter un vendeur'}}
                component={AdminAddDistrubutor} 
            />
             <AdminStack.Screen 
                name="ADMINupdateDistrubutor" 
                options={{title:'Modifier un vendeur'}}
                component={AdminAddDistrubutor} 
            />
             <AdminStack.Screen 
                name="ADMINdistrubutorPage" 
                options={({route, navigation})=>{
                    if(route.params){
                      if(route.params.CLIENT_NAME)
                      return{title:"Vendeur ("+route.params.DISTRUBUTOR_NAME+")"}  
                    }
                    return {title:"Page de Vendeur "}
                }}
                component={AdminDistrubutorPage} 
            />
             <AdminStack.Screen 
                name="ADMINproducts" 
                component={AdminProducts} 
            />
             <AdminStack.Screen 
                name="ADMINproductPage" 
                component={AdminProductPage} 
            />
             <AdminStack.Screen 
                name="ADMINaddProduct" 
                component={AdminAddProduct} 
            />
             <AdminStack.Screen 
                name="ADMINupdateProduct" 
                component={AdminAddProduct} 
            />
             <AdminStack.Screen 
                name="ADMINordersValidated" 
                component={AdminOrdersValidated} 
            />
             <AdminStack.Screen 
                name="ADMINregisterDistrubutor" 
                component={AdminRegisterDistrubutor} 
            />
             <AdminStack.Screen 
                name="ADMINsales" 
                component={AdminSales} 
            />
             <AdminStack.Screen 
                name="ADMINschedule" 
                component={AdminSchedule} 
                options={{title:"Emploi du temps"}} 
            />
             <AdminStack.Screen 
                name="ADMINlistOfScheduleS" 
                component={AdminListOfSchedules} 
                options={{title:"List des Emploi du temps"}} 
            />
             <AdminStack.Screen 
                name="ADMINsectors" 
                options={{title:"List des secteurs"}}
                component={AdminSectors} 
            />
             <AdminStack.Screen 
                name="ADMINsectorPage" 
                options={({route, navigation})=>{
                    if(route.params){
                      if(route.params.SECTOR_NAME)
                      return{title:"Secteur ("+route.params.SECTOR_NAME+")"}  
                    }
                    return {title:"Page de Secteur "}
                }}
                component={AdminSectorPage} 
            />
             <AdminStack.Screen 
                name="ADMINaddSector" 
                options={{title:"Ajouter un secteur"}}
                component={AdminAddSector} 
            />
             <AdminStack.Screen 
                name="ADMINupdateSector" 
                options={({route, navigation})=>{
                    if(route.params){
                      if(route.params.SECTOR_NAME)
                      return{title:"Modifier Le secteur ("+route.params.SECTOR_NAME+")"}  
                    }
                    return {title:"Modifier Le secteur"}
                }} 
                component={AdminAddSector} 
            />
    </AdminStack.Navigator>
}

export default AdminStackNavigator
