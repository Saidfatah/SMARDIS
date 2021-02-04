import React,{useEffect} from 'react'
import {View,Text,ScrollView,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import DashBoardItem from './DashBoardItem'
import {colors} from '../../Common/Colors'
import {  Badge, Icon } from 'react-native-elements'



const  AdminDashBoard=(props)=> {
    const {
        route,
        fetchTodaysSales,
        fetchCategories,
        navigation,
        sectorsCount ,
        fetchClients,
        fetchSectors,
        clientsCount ,
        salesCount,
        ordersCount,
        productsCount,
        categoriesCount,
        distrubutorsCount,
        validatedOrdersCount,
        fetchScheduels ,
        fetchDistrubutors,
        fetchOrders ,
        fetchValidatedOrders ,
        fetchCategoriesCount ,
        scheduelsCount ,
        fetchProductsCount ,
        user
    }=props

    const ROUTES =[
        {
             title:"Clients",
             subMenu:[
                 {title:"List de clients", route :"ADMINclients"},
                 {title:"Ajouter un client", route :"ADMINaddClient"},
             ]
        },
        {
             title:"Produits",
             subMenu:[
                 {title:"List Of Products",route :"ADMINproducts"},
                 {title:"Add product",route :"ADMINaddProduct"}
             ]
        },
        {
             title:"Ventes",
             subMenu:[
                {title:"List de ventes", route :"ADMINsales"},
            ]
        },
        {
             route :"ADMINschedule",
             title:"Emploi du temps",
             subMenu:[
                {title:"List des emploi du temps",route :"ADMINlistOfScheduleS"},
                {title:"List des command ",route :"ADMINlistOfOrders"},
                {title:"Ajouter un Emploi du temp",route :"ADMINschedule"}
            ]
        },
        {
             route :"ADMINcategories",
             title:"Catégories",
             subMenu:[
                {title:"List des category",route :"ADMINcategories"},
                {title:"Ajouter une category",route :"ADMINaddCategory"}
            ]
        },
        {
             route :"ADMINdistrubutors",
             title:"Vendeurs",
             subMenu:[
                {title:"List des Vendeurs",route :"ADMINdistrubutors"},
                {title:"Ajouter une vendeur",route :"ADMINaddDistrubutor"}
            ]
        },
        {
             route :"ADMINsectors",
             title:"Secteurs",
             subMenu:[
                {title:"List des Secteurs",  route :"ADMINsectors"},
                {title:"Ajouter un secteur",route :"ADMINaddSector"}
            ]
        },
        {
             route :"ADMINordersValidated",
             title:"Commande valider",
             subMenu:[
                {title:"List des commandes valider",  route :"ADMINordersValidated"},
            ]
        },
        {
             route :"ADMINcatalogue",
             title:"Ajouter Catalogue",
             subMenu:[
                {title:"Ajouter Catalogue",  route :"ADMINcatalogue"},
            ]
        }
    ]

    useEffect(() => {
          fetchValidatedOrders()
          fetchProductsCount()
          fetchCategoriesCount()
           
          fetchCategories()
          fetchSectors()
          fetchDistrubutors()
          fetchClients()
          fetchOrders()
          fetchScheduels()
          fetchTodaysSales()
          if(user)  navigation.setParams({ADMIN_NAME:user.name})
    }, [])

    const navigateToRoute=(r)=>navigation.navigate(r)
  
    return <ScrollView style={{backgroundColor:'#fff'}}>
         <List.Section  >
         {
             ROUTES.filter(r=>r.subMenu).map((route,index)=><DashBoardItem 
                 navigation={navigation} 
                 key={index} 
                 ROUTE={route} 
                 last={index === ROUTES.length-1}
                 {...{sectorsCount,salesCount ,clientsCount ,salesCount,ordersCount,productsCount,categoriesCount,distrubutorsCount,validatedOrdersCount}}
             />)
         }
         </List.Section>
         
    </ScrollView>
}

export default connect(
    state=>({
        user  : state.auth.user, 
        sectorsCount  : state.client.sectorsCount, 
        clientsCount  : state.client.clientsCount,
        salesCount    : state.scheduel.todaysSalesCount,
        ordersCount   : state.scheduel.ordersCount,
        scheduelsCount   : state.scheduel.scheduelsCount,
        productsCount   : state.products.productsCount,
        categoriesCount : state.products.categoriesCount,
        distrubutorsCount    : state.distrubutor.distrubutorsCount,
        validatedOrdersCount : state.scheduel.validatedOrdersCount,
    }),
    dispatch =>({
        fetchSectors  : dispatch.client.fetchSectors,
        fetchClients  : dispatch.client.fetchClients,
        fetchCategories  : dispatch.products.fetchCategories,
        fetchDistrubutors  : dispatch.distrubutor.fetchDistrubutors ,
        fetchOrders : dispatch.scheduel.fetchOrders,
        fetchScheduels : dispatch.scheduel.fetchScheduels,
        fetchTodaysSales : dispatch.scheduel.fetchTodaysSales,
        fetchValidatedOrders : dispatch.cart.fetchValidatedOrders,
        fetchCategoriesCount : dispatch.products.fetchCategoriesCount,
        fetchProductsCount   : dispatch.products.fetchProductsCount,
    })
)(AdminDashBoard)
