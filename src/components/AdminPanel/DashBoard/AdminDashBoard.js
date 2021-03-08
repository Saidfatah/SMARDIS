import React,{useEffect,useCallback,useState} from 'react'
import { ScrollView,InteractionManager} from 'react-native'
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import DashBoardItem from './DashBoardItem'
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler ,Alert} from 'react-native';



const  AdminDashBoard=(props)=> {
    const {
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
        fetchWaitingClients,
        user,
        fetchUsers
    }=props
    const [enabledList, setenabledList] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ])
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
                 if(user && user.type =="DISTRUBUTOR") 
                     navigation.navigate('DISTRIBUTORDashBoard')
                fetchOrders()
               
                fetchProducts()
                fetchTodaysValideOrders("ADMIN")
                fetchUsers()
                fetchCategories()
                fetchSectors()
                fetchDistrubutors()
                fetchClients()
                fetchWaitingClients()
                fetchScheduels()
          
       });
    }, [])
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if(user)  navigation.setParams({ADMIN_NAME:user.name})
       });
    }, [user])


    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            Alert.alert("Attention!", "Êtes-vous sûr de vouloir quitter?", [
              {
                text: "Annuler",
                onPress: () => null,
                style: "cancel"
              },
              { text: "OUI", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
        
          BackHandler.addEventListener("hardwareBackPress", onBackPress);
        
          return () =>
            BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        
    }, []));

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
        }
    ]

   const expand=(index)=>()=>{
     console.log({index})
     let temp_expaneded_List = [...enabledList]
     const prevEnabledIndex = temp_expaneded_List.indexOf(temp_expaneded_List.filter(v=>v==true)[0])
     temp_expaneded_List=temp_expaneded_List.map(v=>false)
     if(prevEnabledIndex != index){
         temp_expaneded_List[index]=true
     }
     
     setenabledList([...temp_expaneded_List])
   }

  
    return <ScrollView style={{backgroundColor:'#fff'}}>
         <List.Section  >
         {
             ROUTES.filter(r=>r.subMenu).map((route,index)=><DashBoardItem 
                 navigation={navigation} 
                 key={index} 
                 expanded={enabledList[index]}
                 expand={expand(index)}
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
        fetchUsers  : dispatch.auth.fetchUsers,
        fetchSectors  : dispatch.sector.fetchSectors,
        fetchClients  : dispatch.client.fetchClients,
        fetchWaitingClients  : dispatch.client.fetchWaitingClients,
        fetchCategories  : dispatch.categories.fetchCategories,
        fetchDistrubutors  : dispatch.distrubutor.fetchDistrubutors ,
        fetchOrders : dispatch.scheduel.fetchOrders,
        fetchScheduels : dispatch.scheduel.fetchScheduels,
        fetchTodaysValideOrders : dispatch.scheduel.fetchTodaysValideOrders,
        fetchProducts   : dispatch.products.fetchProducts,
    })
)(AdminDashBoard)
