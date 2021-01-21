import React,{useState} from 'react'
import {colors} from '../../Common/Colors'
import {View,Text} from 'react-native'
import { List } from 'react-native-paper';
import {  Badge, Icon } from 'react-native-elements'

const DashBoardItem=({ROUTE,last,navigation,sectorsCount ,clientsCount ,salesCount,ordersCount,productsCount,categoriesCount,distrubutorsCount,validatedOrdersCount})=> {
        const [expanded, setExpanded] = useState(false);
        const {title,subMenu}=ROUTE
        const navigateToRoute=(r)=>navigation.navigate(r)

        let  ICON ={type:"ionicon", name:"md-cart"}
        let COUNT = 0
        let STATUS = "primary"
        

        if(ROUTE.title.toUpperCase() == "CLIENTS"){
            ICON= {type:'ionicon',name:'person'}
            COUNT = clientsCount
        }
        if(ROUTE.title.toUpperCase() == "PRODUITS"){
            ICON= {type:"ionicon", name:"md-cart"}
            COUNT = productsCount
        }
        if(ROUTE.title.toUpperCase() == "EMPLOI DU TEMPS"){
            ICON= {type:'material',name:'schedule'}
            COUNT = 0
            STATUS="error"
        }
        if(ROUTE.title  == "Catégories"){ 
            ICON= {type:'material',name:'category'}
            COUNT= categoriesCount
        }
        if(ROUTE.title.toUpperCase()  == "VENTES"){ 
            ICON= {type:'font-awesome',name:'pie-chart'}
            COUNT= categoriesCount
            STATUS="success"
        }
        if(ROUTE.title.toUpperCase() == "VENDEURS"){
            ICON= {type:'fontisto',name:'persons'}
            COUNT = distrubutorsCount
        }
        if(ROUTE.title.toUpperCase() == "SECTEURS"){
            ICON  = {type:'font-awesome',name:'map-marker'}
            COUNT = sectorsCount
        }
        if(ROUTE.title.toUpperCase() == "COMMANDE VALIDER"){
            ICON  = {type:'font-awesome',name:'map-marker'}
            COUNT = sectorsCount
            STATUS="error"
        }
        

        const SubMenuItem = ({item})=>{
            const {title} = item
            return <View > 
               <Text>{title}</Text>
             </View>
        }
        
        const ACCORDION_PROPS={
            title:<View style={{
                display:'flex',
                flexDirection:'row',
              
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
                color:colors.BLACK,
                fontWeight:'bold',
                fontSize:18,
            },
            style:{
                borderBottomColor:colors.BLACK,
                borderBottomWidth:!last?1:0,
                width:"100%"
            },
            expanded:expanded,
            onPress:e=>setExpanded(ROUTE.title.toUpperCase() == "AJOUTER CATALOGUE"?false:!expanded)
        }
        if(ROUTE.title.toUpperCase() == "AJOUTER CATALOGUE"){
            ACCORDION_PROPS.onPress=()=>{
                console.log("ajouter catalogue")
           }
        }

        return <View>
            <List.Accordion   {...ACCORDION_PROPS}>
                {subMenu.map((item,i)=><SubMenuItem item={item} key={i}/>) }
            </List.Accordion>
        </View>
 
}

export default DashBoardItem
