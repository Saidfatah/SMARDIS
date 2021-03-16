import React,{useState} from 'react'
import {colors} from '../../Common/Colors'
import {View,Text,TouchableOpacity} from 'react-native'
import { List } from 'react-native-paper';
import {  Badge, Icon } from 'react-native-elements'

const DashBoardItem=(props)=> {
        const {
            ROUTE,
            expanded,
            expand,
            last,
            navigation,
            sectorsCount ,
            clientsCount,
            scheduelsCount ,
            salesCount,
            productsCount,
            categoriesCount,
            distrubutorsCount,
            valide_orders_count
        }=props

        const {title,subMenu}=ROUTE
        const navigateToRoute=r=>e=>navigation.navigate(r)

        let ICON ={type:"ionicon", name:"md-cart"}
        let COUNT = 0
        let STATUS = "primary"
        

        switch (ROUTE.title.toUpperCase()) {
            case "CLIENTS":
                 ICON= {type:'ionicon',name:'person'}
                 COUNT = clientsCount
                break;
            case "PRODUITS":
                ICON= {type:"ionicon", name:"md-cart"}
                COUNT = productsCount
                break;
            case "EMPLOI DU TEMPS":
                ICON= {type:'material',name:'schedule'}
                COUNT = scheduelsCount
                STATUS="error"
                break;
            case "VENTES":
                ICON= {type:'font-awesome',name:'pie-chart'}
                COUNT= salesCount
                STATUS="success"
                break;
        
            case "VENDEURS":
                ICON= {type:'fontisto',name:'persons'}
                COUNT = distrubutorsCount
                break;
            case "SECTEURS":
                ICON  = {type:'font-awesome',name:'map-marker'}
                COUNT = sectorsCount
                break;
            case "COMMANDE VALIDER":
                ICON  = {type:'font-awesome',name:'map-marker'}
                COUNT = valide_orders_count
                STATUS="error"
                break;
        
            default:
                break;
        }
            
        if(ROUTE.title  == "Catégories"){ 
            ICON= {type:'material',name:'category'}
            COUNT= categoriesCount
        }

        const SubMenuItem = ({item})=>{
            const {title , route} = item
            return <TouchableOpacity onPress={navigateToRoute(route)}  > 
               <View style={{
                padding:8,
                marginBottom:16,
                display:"flex",
                flexDirection:"row",
                alignItems:'center',
                paddingLeft:24
                }}>
                   <View style={{
                       width:15,
                       height:15,
                       borderColor:colors.DARKGREY,
                       borderRadius:25,
                       borderWidth:1 , 
                       marginRight:32
                    }}>
                    </View>
                  <Text style={{
                      color:colors.DARKGREY,
                      fontSize:16
                      }} >
                     {title}
                  </Text>
               </View>
             </TouchableOpacity>
        }
        
        const ACCORDION_PROPS={
            title:<View style={{
                flex:1,
                display:'flex',
                flexDirection:'row',
                width : '100%',
                justifyContent:'space-between',
                }}>
                <Text>{title}</Text>
                <Badge
                  status={STATUS}
                  value={(COUNT).toString()}
                   textStyle={{
                     fontSize:14
                   }}
                   containerStyle={{marginLeft:16}}
                   badgeStyle={{ 
                      height:24 ,
                   }}
                />
            </View>,
            left:props =><View style={{width:50}}><Icon {...ICON} size={30} /></View>,
            titleStyle:{
             display:"flex"
            }, 
            style:{
                borderBottomColor:colors.BLACK,
                borderBottomWidth:!last?1:0,
                width:"100%"
            },
            expanded:expanded,
            onPress:e=>expand()
        }
        if(ROUTE.title.toUpperCase() == "AJOUTER CATALOGUE"){
            ACCORDION_PROPS.onPress=()=>{
           }
        }

        return <View>
            <List.Accordion   {...ACCORDION_PROPS}>
                {subMenu.map((item,i)=><SubMenuItem item={item} key={i}/>) }
            </List.Accordion>
        </View>
 
}

export default DashBoardItem
