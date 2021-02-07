import React,{useEffect,useState} from 'react'
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

const ProductPage=({navigation,route,removeProduct,done_removing_product,resetIsDone})=> {
    const [canRemove, setcanRemove] = useState(false)
    const {product} = route.params
    //handle update 
    //handle remove 
    useEffect(() => {
        done_removing_product == true && setcanRemove(true) && resetIsDone("done_removing_product")
    }, [done_removing_product])
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
                  disabled={!canRemove}
                  clickHandler={e=>{
                      setcanRemove(false)
                      removeProduct({product,navigation})
                    }} 
                  >
                     <Text style={styles.ButtonText}>Supprimer le produit</Text>
                     <IonIcon name="trash" size={25} color="#fff" />
                 </Button>
                 <Button
                  xStyle={styles.BtnXstyle} 
                  color={"BLUE"} 
                  clickHandler={e=>navigation.navigate('ADMINupdateProduct',{product,update:true})} 
                  >
                     <Text style={styles.ButtonText}>Modifier Le produit</Text>
                     <IonIcon name="ios-settings-sharp" size={25} color="#fff" />
                 </Button>
        </View>
        </ScrollView>
    )
}

export default connect(
     state=>({
        done_removing_product:state.products.done_removing_product
     }),
     dispatch =>({
        removeProduct : dispatch.products.removeProduct,
        resetIsDone : dispatch.products.resetIsDone,
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


