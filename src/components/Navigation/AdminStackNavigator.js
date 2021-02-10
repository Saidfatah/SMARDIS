import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import AdminCatalogue    from '../AdminPanel/Catalogue/Catalogue'  
import AdminAddCategory  from '../AdminPanel/Categories/Add category/AddCategory'
import AdminCategories  from '../AdminPanel/Categories/Categories'
import AdminCategoryPage  from '../AdminPanel/Categories/Category page/CategoryPage'
import ClientsWaitingList    from '../AdminPanel/Clients/Clients waiting list/ClientsWaitingList'
import AdminClients    from '../AdminPanel/Clients/Clients List/Clients'
import AdminAddClient    from '../AdminPanel/Clients/Add client/AddClient'
import AdminClientPage    from '../AdminPanel/Clients/client Page/ClientPage'
import AdminDashBoard  from '../AdminPanel/DashBoard/AdminDashBoard'
import AdminDistrubutors    from '../AdminPanel/Distrubutors/Distrubutors'
import AdminAddDistrubutor    from '../AdminPanel/Distrubutors/Add distrubutor/AddDistrubutor'
import AdminDistrubutorPage    from '../AdminPanel/Distrubutors/Distrubutor page/DistrubutorPage'
import AdminOrdersValidated  from '../AdminPanel/Schedule/List of orders/ListOfOrdersValidated'
import AdminProducts  from '../AdminPanel/Products/Products'
import AdminAddProduct  from '../AdminPanel/Products/Add product/AddProduct'
import AdminProductPage  from '../AdminPanel/Products/Product Page/ProductPage'
import AdminSales     from '../AdminPanel/Sales/Sales'
import AdminSchedule   from '../AdminPanel/Schedule/Add Scheduel/Schedule'
import AdminListOfSchedules   from '../AdminPanel/Schedule/ListOfSchedules/ListOfSchedules'
import AdminListOfOrders   from '../AdminPanel/Schedule/List of orders/ListOfOrders'
import AdminSectors     from '../AdminPanel/Sectors/Sectors'
import AdminSectorPage     from '../AdminPanel/Sectors/Sector Page/SectorPage'
import AdminAddSector     from '../AdminPanel/Sectors/Add sector/AddSector'
import AdminRegisterDistrubutor   from '../Auth/Admin/RegisterDistrubutor'
import AdminAddNewAdmin     from '../Auth/Admin/AddNewAdmin'
import AdminWaitingList    from '../AdminPanel/Manage Users/waiting list/WaitingList'
import AdminManageAdmins  from '../AdminPanel/Manage Users/admins/ManageAdmins'
import OrdersValidated  from '../AdminPanel/Orders/OrdersValidated'

 

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
                name="ADMINvalidatedExcel" 
                options={{title:"Orders Valider excel"}}
                component={OrdersValidated} 
            />
             <AdminStack.Screen 
                name="ADMINmanageAdmins" 
                options={{title:"Gérer Les admins"}}
                component={AdminManageAdmins} 
            />
             <AdminStack.Screen 
                name="ADMINwaitingList" 
                options={{title:"List d'attendre"}}
                component={AdminWaitingList} 
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
                name="ADMINwaitingClients" 
                options={{title:'List dattendre des clients'}}
                component={ClientsWaitingList} 
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
                name="ADMINupdateSchedule" 
                component={AdminSchedule} 
                options={{title:"Modfier L'emploi du temps"}} 
            />
             <AdminStack.Screen 
                name="ADMINlistOfScheduleS" 
                component={AdminListOfSchedules} 
                options={{title:"List des Emploi du temps"}} 
            />
             <AdminStack.Screen 
                name="ADMINlistOfOrders" 
                component={AdminListOfOrders} 
                options={{title:"List des command"}} 
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
