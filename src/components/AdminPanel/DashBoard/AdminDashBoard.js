import React,{useEffect} from 'react'
import { ScrollView} from 'react-native'
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import DashBoardItem from './DashBoardItem'
 



const  AdminDashBoard=(props)=> {
    const {
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
        valide_orders_count,
        fetchScheduels ,
        fetchDistrubutors,
        fetchOrders ,
        fetchTodaysValideOrders ,
        scheduelsCount ,
        fetchProducts ,
        fetchWaitingList,
        fetchAdmins,
        fetchWaitingClients,
        user
    }=props
    useEffect(() => {
          fetchOrders()
          fetchTodaysValideOrders("ADMIN")
          fetchProducts()
          fetchAdmins()
          fetchWaitingList()
          fetchCategories()
          fetchSectors()
          fetchDistrubutors()
          fetchClients()
          fetchWaitingClients()
          fetchScheduels()
          fetchTodaysSales()
    }, [])
    useEffect(() => {
          if(user)  navigation.setParams({ADMIN_NAME:user.name})
    }, [user])
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

   

  
    return <ScrollView style={{backgroundColor:'#fff'}}>
         <List.Section  >
         {
             ROUTES.filter(r=>r.subMenu).map((route,index)=><DashBoardItem 
                 navigation={navigation} 
                 key={index} 
                 ROUTE={route} 
                 last={index === ROUTES.length-1}
                 {...{sectorsCount,salesCount ,scheduelsCount,clientsCount ,salesCount,ordersCount,productsCount,categoriesCount,distrubutorsCount,valide_orders_count}}
             />)
         }
         </List.Section>
         
    </ScrollView>
}

export default connect(
    state=>({
        user  : state.auth.user, 
        sectorsCount  : state.sector.sectorsCount, 
        clientsCount  : state.client.clientsCount,
        salesCount    : state.scheduel.todaysSalesCount,
        ordersCount   : state.scheduel.ordersCount,
        scheduelsCount   : state.scheduel.scheduelsCount,
        productsCount   : state.products.productsCount,
        categoriesCount : state.categories.categoriesCount,
        distrubutorsCount    : state.distrubutor.distrubutorsCount,
        valide_orders_count : state.scheduel.valide_orders_count,
    }),
    dispatch =>({
        fetchWaitingList  : dispatch.auth.fetchWaitingList,
        fetchAdmins  : dispatch.auth.fetchAdmins,
        fetchSectors  : dispatch.sector.fetchSectors,
        fetchClients  : dispatch.client.fetchClients,
        fetchWaitingClients  : dispatch.client.fetchWaitingClients,
        fetchCategories  : dispatch.categories.fetchCategories,
        fetchDistrubutors  : dispatch.distrubutor.fetchDistrubutors ,
        fetchOrders : dispatch.scheduel.fetchOrders,
        fetchScheduels : dispatch.scheduel.fetchScheduels,
        fetchTodaysSales : dispatch.scheduel.fetchTodaysSales,
        fetchTodaysValideOrders : dispatch.scheduel.fetchTodaysValideOrders,
        fetchProducts   : dispatch.products.fetchProducts,
    })
)(AdminDashBoard)
