import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import CategoriesSlider from './CategoriesSlider'
import {connect} from 'react-redux'
import Products from './Products/Products'
import BackgroundImage from '../../Common/BackgroundImage'

const ClientDelivry=({ route, navigation  ,categories,addCartItem,selectedCategory,selectCategory,selectedCategoryProducts})=> {
    const [clientNameHeight, setclientNameHeight] = useState(0)
    const { clientId ,client  } = route.params;
    const {name}=client
    useEffect(() => {
        navigation.setParams({ clientName: name });
    }, [])
  
    const handleHeight= (field,value)=>setheights({...heights,[field]:value})
    
    return <BackgroundImage  >
        <View style={styles.tagParent}  onLayout={e=>{ setclientNameHeight( e.nativeEvent.layout.height)}} >
             <View style={styles.tag} >
                 <Text style={styles.clientName}>{name}</Text>
             </View>
        </View>
        <View style={styles.productsPanel} onLayout={e=>{  setclientNameHeight(e.nativeEvent.layout.y) }}>
             <CategoriesSlider  {...{navigation,handleHeight,categories,selectedCategory,selectCategory}} />
             <Products clientNameHeight={clientNameHeight}  guest={client} addCartItem={addCartItem} selectedCategoryProducts={selectedCategoryProducts} />
        </View>
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
        padding:0,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        overflow:'hidden'
    }
});