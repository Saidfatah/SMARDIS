import React,{useState,useEffect,useCallback} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import CategoriesSlider from './CategoriesSlider'
import {connect} from 'react-redux'
import Products from './Products/Products'
import Button from '../../Common/Button'
import Loading from '../../Common/Loading'
import {colors} from '../../Common/Colors'
import BackgroundImage from '../../Common/BackgroundImage'
import  SwipeAbleProductDetails from './Products/SwipeAbleProductDetails'
import SwipeAbleCancelOrder from './SwipeAbleCancelOrder'
import { BackHandler } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'


const ClientDelivry=(props)=> {
    const { route,
        isSelectedCategorySpecial,
        navigation,
        cancelOrder,
        done_canceling_order,
        resetIsDone,
        addCartItem,
        selectedCategorySubCategories,
        selectedCategoryProducts,
        selectedClient
    }=props
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [isCancelPanelActive, setIsCancelPanelActive] = useState(false);
    const [selectedProduct, setselectedProduct] = useState(selectedCategoryProducts[0]);


    const {sector,scheduelId,client,orderId} = route.params;
    const  fromCache = client.fromCache
 
    useEffect(() => {
            navigation.setParams({ clientName: client.name });
    }, [client])
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            setIsPanelActive(false)
            return true;
          };
        
          BackHandler.addEventListener("hardwareBackPress", onBackPress);
        
          return () =>
            BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        
    }, []));


    if(fromCache && !selectedClient  ) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>

    const {name,objectif}=fromCache?selectedClient:client 

    const Header=()=>{
        const COLOR= objectif.progress>=0 ? colors.GREEN : colors.RED
        return <View style={styles.tagParent} >
        <View style={styles.tag} >
            <Text style={styles.clientName}>{name}</Text>
            <View style={styles.FH} >
                <MaterialCommunityIcon name="bullseye-arrow" color={colors.WHITE} size={25} />
                 <Text style={{
                     ...styles.clientName,
                     color:COLOR
                     }}>
                         {objectif.progress >=0 ?"+"+objectif.progress :objectif.progress }DH
                </Text>
            </View>
        </View>
        <Button color="RED"  clickHandler={()=>{
           setIsCancelPanelActive(true)
       }} >
         <Text style={{color:'#fff'}} >Annuler la command </Text>
       </Button>
   </View>
    }


    return <BackgroundImage  >
       <Header />
        <View style={styles.productsPanel} >
             <CategoriesSlider  {...{navigation}} />
             <Products {...{isSelectedCategorySpecial,setIsPanelActive,setselectedProduct,selectedCategoryProducts,selectedCategorySubCategories,client:selectedClient}} />
        </View>
        <SwipeAbleProductDetails {...{
                 scheduelId,
                 selectedProduct,
                 sector,
                 isPanelActive,
                 setIsPanelActive,
                 guest:!fromCache?client:selectedClient,
                 client:!fromCache?client:selectedClient,
                 orderId,
            addCartItem}} 
            />
        <SwipeAbleCancelOrder {...{
                 navigation,
                 cancelOrder,
                 scheduelId,
                 orderId,
                 done_canceling_order,
                 resetIsDone,
                 isPanelActive:isCancelPanelActive,
                 setIsPanelActive :setIsCancelPanelActive
            }}  />
    </BackgroundImage> 
  
}

export default connect(
    state=>({
        selectedCategoryProducts :  state.categories.selectedCategoryProducts,
        selectedCategorySubCategories :  state.categories.selectedCategorySubCategories,
        done_canceling_order :  state.categories.done_canceling_order,
        isSelectedCategorySpecial :  state.categories.isSelectedCategorySpecial,
        selectedClient :  state.client.selectedClient,
    }),
    dispatch=>({
        addCartItem : dispatch.cart.addCartItem,
        cancelOrder: dispatch.scheduel.cancelOrder,
        resetIsDone: dispatch.scheduel.resetIsDone,
    })
)(ClientDelivry)


var styles = StyleSheet.create({
  FH:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:"center",
  },
  tagParent:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:16,
        marginBottom:16
  },
  tag:{
        padding:8,
        borderRadius:25,
        width:200
  },
  clientName:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        color:'#fff'
  },
  productsPanel:{
        backgroundColor:'#fff',
        width:'100%',
        flex:1,
        padding:0,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        overflow:'hidden'

  }
});