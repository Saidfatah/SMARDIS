import React,{useState,useEffect,useMemo} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import CategoriesSlider from './CategoriesSlider'
import {connect} from 'react-redux'
import Products from './Products/Products'
import BackgroundImage from '../../Common/BackgroundImage'
import Button from '../../Common/Button'
import  SwipeAbleProductDetails from './Products/SwipeAbleProductDetails'
import SwipeAbleCancelOrder from './SwipeAbleCancelOrder'

const ClientDelivry=({ route, navigation,cancelOrder,done_canceling_order,resetIsDone,done_fetching_categories  ,categories,addCartItem,selectedCategory,selectCategory,selectedCategoryProducts})=> {
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [isCancelPanelActive, setIsCancelPanelActive] = useState(false);
    const [selectedProduct, setselectedProduct] = useState(selectedCategoryProducts[0]);


    const { clientId ,client,sector,orderId  } = route.params;
   
    const {name,id}=client
 
    useEffect(() => {
        selectCategory("0hxbmFxnEtU05QcWbaxv")
        navigation.setParams({ clientName: name });
    }, [id])
  
    const handleHeight= (field,value)=>setheights({...heights,[field]:value})
    
 
        return <BackgroundImage  >
        <View style={styles.tagParent} >
             <View style={styles.tag} >
                 <Text style={styles.clientName}>{name}</Text>
             </View>
             <Button color="RED"  clickHandler={( )=>{
                setIsCancelPanelActive(true)
            }} >
              <Text style={{color:'#fff'}} >Annuler la command </Text>
            </Button>
        </View>
        <View style={styles.productsPanel} >
             <CategoriesSlider  {...{done_fetching_categories,navigation,handleHeight,categories,selectedCategory,selectCategory}} />
             <Products {...{setIsPanelActive,setselectedProduct,selectedCategoryProducts}} />
        </View>
             <SwipeAbleProductDetails {...{selectedProduct,sector,isPanelActive,setIsPanelActive,guest:client,client,orderId,addCartItem}}  />
             <SwipeAbleCancelOrder {...{
                 navigation,
                 cancelOrder,
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
        categories       : state.categories.categories,
        selectedCategory :  state.categories.selectedCategory,
        done_fetching_categories : state.categories.done_fetching_categories,
        selectedCategoryProducts :  state.categories.selectedCategoryProducts,
        done_canceling_order :  state.categories.done_canceling_order,
    }),
    dispatch=>({
        selectCategory : dispatch.categories.selectCategory,
        addCartItem : dispatch.cart.addCartItem,
        cancelOrder: dispatch.scheduel.cancelOrder,
        resetIsDone: dispatch.scheduel.resetIsDone,
    })
)(ClientDelivry)


var styles = StyleSheet.create({
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