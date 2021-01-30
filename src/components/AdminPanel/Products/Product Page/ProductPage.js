import React,{useEffect} from 'react'
import {View,Text,StyleSheet,ScrollView} from 'react-native'
import ProductInfo from '../../../Distrubutor/ClientProductsSelection/Products/ProductInfo'
import Item from '../../../Common/Item'
import Button from '../../../Common/Button'
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

const ProductPage=({navigation,route,removeProduct})=> {
    const {product} = route.params
    //handle update 
    //handle remove 
    useEffect(() => {
        navigation.setParams({PRODUCT_NAME:"product name"})
    }, [])

    if(product == undefined) return <Text>Error</Text>

    return (
        <ScrollView 
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} > 
            <View>
            <ProductInfo  
             product={product}  
             opened={true}
             />
            </View>
            <View style={styles.btns} >
                 <Button
                  xStyle={styles.BtnXstyle} 
                  color={"RED"} 
                  clickHandler={e=>removeProduct({product,navigation})} 
                  >
                     <Text style={styles.ButtonText}>Supprimer le produit</Text>
                     <Icon name="call" size={25} color="#fff" />
                 </Button>
                 <Button
                  xStyle={styles.BtnXstyle} 
                  color={"BLUE"} 
                  clickHandler={e=>navigation.navigate('ADMINupdateProduct',{product,update:true})} 
                  >
                     <Text style={styles.ButtonText}>Modifier Le produit</Text>
                     <Icon name="call" size={25} color="#fff" />
                 </Button>
        </View>
        </ScrollView>
    )
}

export default connect(
     null,
     dispatch =>({
        removeProduct : dispatch.products.removeProduct
     })
)(ProductPage)


const styles = StyleSheet.create({
    clientPage:{
        backgroundColor:"#fff",
        padding:8,
        height:"100%"
    },
    ClientItem: {
        display:'flex',
        flexDirection:'row',
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:12,
        marginRight:8,
        marginBottom:8,
    },
    clientsItemsWrapper: {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    HFlex: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    ButtonText:{color:"#fff",textAlign:'center',fontWeight:'bold'},
    BtnXstyle:{
        margin:0,
        borderRadius:12,
        height:50,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-evenly",
        marginBottom:8
    },
    contentContainer:{ 
        display:'flex', 
        justifyContent:'space-between', 
        flexGrow:1 
    },
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff',
        display:'flex',
    },
    btns:{
        display:'flex',
        marginTop:16,
        justifyContent:'flex-start',
        alignItems:"flex-start"
    }
})


