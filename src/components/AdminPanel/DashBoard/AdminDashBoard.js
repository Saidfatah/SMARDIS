import React,{useEffect} from 'react'
import {View,Text,ScrollView,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import DashBoardItem from './DashBoardItem'
import {colors} from '../../Common/Colors'
import {  Badge, Icon } from 'react-native-elements'



const  AdminDashBoard=({ navigation,sectorsCount ,clientsCount ,salesCount,ordersCount,productsCount,categoriesCount,distrubutorsCount,validatedOrdersCount,fetchSectors,fetchClientsCount   ,fetchDistrubutors ,fetchOrders ,fetchValidatedOrders ,fetchCategories  ,fetchProducts })=> {
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
                 {title:"Add product",route :"ADMINproducts"}
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
                {title:"Ajouter un Emploi du temp",route :"ADMINschedule"}
            ]
        },
        {
             route :"ADMINcategories",
             title:"Catégories",
             subMenu:[
                {title:"List des category",route :"ADMINcategories"},
                {title:"Ajouter une category",route :"ADMINcategories"}
            ]
        },
        {
             route :"ADMINdistrubutors",
             title:"Vendeurs",
             subMenu:[
                {title:"List des Vendeurs",route :"ADMINdistrubutors"},
                {title:"Ajouter une vendeur",route :"ADMINdistrubutors"}
            ]
        },
        {
             route :"ADMINsectors",
             title:"Secteurs",
             subMenu:[
                {title:"List des Secteurs",  route :"ADMINsectors"},
                {title:"Ajouter une secteur",route :"ADMINsectors"}
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
          fetchSectors()
          fetchClientsCount()
          fetchDistrubutors()
          fetchOrders ()
          fetchValidatedOrders()
          fetchCategories()
          fetchProducts()
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
                 {...{sectorsCount ,clientsCount ,salesCount,ordersCount,productsCount,categoriesCount,distrubutorsCount,validatedOrdersCount}}
             />)
         }
         </List.Section>
         
    </ScrollView>
}

export default connect(
    state=>({
        sectorsCount  : state.client.sectorsCount, 
        clientsCount  : state.client.clientsCount,
        salesCount    : state.cart.salesCount,
        ordersCount   : state.order.ordersCount,
        productsCount   : state.products.productsCount,
        categoriesCount : state.products.categoriesCount,
        distrubutorsCount    : state.distrubutor.distrubutorsCount,
        validatedOrdersCount : state.cart.validatedOrdersCount,
    }),
    dispatch =>({
        //fetch products , clients , categories 
        fetchSectors  : dispatch.client.fetchSectors,
        fetchClientsCount  : dispatch.client.fetchClientsCount,
        fetchDistrubutors : dispatch.distrubutor.fetchDistrubutors,
        fetchOrders : dispatch.order.fetchOrders,
        fetchValidatedOrders : dispatch.cart.fetchValidatedOrders,
        fetchCategories : dispatch.products.fetchCategories,
        fetchProducts   : dispatch.products.fetchProducts,
    })
)(AdminDashBoard)
