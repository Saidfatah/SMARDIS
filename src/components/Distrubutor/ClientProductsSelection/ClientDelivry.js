import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import CategoriesSlider from './CategoriesSlider'
import {connect} from 'react-redux'
import Products from './Products/Products'
import BackgroundImage from '../../Common/BackgroundImage'
import  SwipeAbleProductDetails from './Products/SwipeAbleProductDetails'

const ClientDelivry=({ route, navigation  ,categories,addCartItem,selectedCategory,selectCategory,selectedCategoryProducts})=> {
    const [clientNameHeight, setclientNameHeight] = useState(0)
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [selectedProduct, setselectedProduct] = useState(selectedCategoryProducts[0]);


    const { clientId ,client  } = route.params;
    const {name}=client
    useEffect(() => {
        navigation.setParams({ clientName: name });
    }, [])
  
    const handleHeight= (field,value)=>setheights({...heights,[field]:value})
    
    return <BackgroundImage  >
        <View style={styles.tagParent} >
             <View style={styles.tag} >
                 <Text style={styles.clientName}>{name}</Text>
             </View>
        </View>
        <View style={styles.productsPanel} >
             <CategoriesSlider  {...{navigation,handleHeight,categories,selectedCategory,selectCategory}} />
             <Products {...{setIsPanelActive,setselectedProduct,selectedCategoryProducts}} />
        </View>
             <SwipeAbleProductDetails {...{selectedProduct,isPanelActive,setIsPanelActive,guest:client,addCartItem}}  />
    </BackgroundImage> 
}

export default connect(
    state=>({
        categories       : state.products.categories,
        selectedCategory :  state.products.selectedCategory,
        selectedCategoryProducts :  state.products.selectedCategoryProducts,
    }),
    dispatch=>({
        selectCategory : dispatch.products.selectCategory,
        addCartItem : dispatch.cart.addCartItem,
    })
)(ClientDelivry)


  var styles = StyleSheet.create({
    tagParent:{
        display:'flex',
        alignItems:'center',
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