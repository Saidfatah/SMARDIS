import React,{useEffect,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import { List } from 'react-native-paper';
import { connect } from 'react-redux'
import Button from '../../../Common/Button'
import Item from '../../../Common/Item'
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Image from 'react-native-fast-image'
import ProductInfo from '../../../Distrubutor/ClientProductsSelection/Products/ProductInfo'

export const CategoryPage = ({navigation,route,selectedCategoryProducts,selectCategory,removeCategory}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const {category} = route.params;
       console.log(category.isOther)
    useEffect(() => {
        navigation.setParams({CATEGORY_NAME:category.name})
        selectCategory(category.id)
    }, [])

    if(!category) return <Text>category nexist pas</Text>

    const {name,image}=category
    const ACCORDION_PROPS={
        title:<View style={{
            flex:1,
            display:'flex',
            flexDirection:'row',
            width : '100%',
            justifyContent:'space-between',
            }}>
            <Text>Les Produits</Text>
            <Badge
              status={selectedCategoryProducts.length >0 ?"success":"warning"}
              value={(selectedCategoryProducts.length).toString()}
               textStyle={{
                 fontSize:14
               }}
               containerStyle={{marginLeft:16}}
               badgeStyle={{ 
                  height:24 ,
               }}
            />
        </View>,
        titleStyle: styles.Title,
        style:{
            ...styles.AcordionHeader,
            borderBottomLeftRadius  : !isExpanded?12:0,
            borderBottomRightRadius : !isExpanded?12:0 ,
            marginBottom: isExpanded ?0:16 ,
        },
        expanded:isExpanded,
        onPress:()=>setIsExpanded(!isExpanded)
    }

    return (
        <ScrollView 
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} >  
            <View   >
                <View style={styles.HFlex} >
                    <Label label="Titre :"  mga={16} />
                    <View style={{...styles.productItem,marginBottom:0,marginLeft:8}}>
                         <Text> {name} </Text>
                         
                    </View>
                </View>
             
                <View style={styles.HFlex} >
                    <Label label="Image :"  mga={16} />
                    <View style={{...styles.productItem,marginBottom:0,marginLeft:8}}>
                       <Image 
                          style={{height:50,width:50}}  
                        //   source={image!="NO_IMAGE"
                        //   ?{uri:image}
                        //   :require('../../../../images/noImage.jpg')
                        //   }  
                          source={require('../../../../images/noImage.jpg')}  
                          />
                    </View>
                </View>
             
                <View >
                    <Label label="Les produit :"  mga={16} />
                    <List.Section >
                        <List.Accordion  {...ACCORDION_PROPS} >
                              <View style={styles.accordionContentWrrapper}>
                                {
                                selectedCategoryProducts.map((product,index)=><TouchableOpacity 
                                     key={index} 
                                     onPress={e=>{ navigation.navigate('ADMINproductPage',{product})}}>
                                    <ProductInfo   
                                    product={product} 
                                    opened={false} 
                                    />
                                </TouchableOpacity>)
                                }
                              </View>
                        </List.Accordion>               
                    </List.Section>
                </View>
             
             </View>
 
           <View style={styles.btns} >
               {
               !category.isOther
               ?<Button
                xStyle={{...styles.BtnXstyle}} 
                color={"RED"} 
                disabled={category.isOther}
                clickHandler={e=>{
                    removeCategory({category,admin:0,navigation})
                    navigation.goBack()
                }} 
                >
                     <Text style={styles.ButtonText}>Supprimer La category</Text>
                     <IonIcon name="trash" size={25} color="#fff" />
               </Button>
               :null
               }
               <Button
                xStyle={styles.BtnXstyle} 
                color={"GREEN"} 
                clickHandler={e=>navigation.navigate('ADMINupdateCategory',{category,update:true}) } 
                >
                   <Text style={styles.ButtonText}>Modifier la category</Text>
                   <Icon name="call" size={25} color="#fff" />
               </Button>
        </View>
    </ScrollView>
    )
}

 

export default connect(
    state=>({
       selectedCategoryProducts :  state.products.selectedCategoryProducts,
    }), 
    dispatch =>({
      removeCategory: dispatch.products.removeCategory,
      updateCategory: dispatch.products.updateCategory,
      selectCategory : dispatch.products.selectCategory,

    })
)(CategoryPage)

const styles = StyleSheet.create({
    clientPage:{
        backgroundColor:"#fff",
        padding:8,
        height:"100%"
    },
    productItem: {
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
    ButtonText:{
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold'
    },
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
    btns:{
        display:'flex',
        marginTop:16,
        justifyContent:'flex-start',
        alignItems:"flex-start"
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
    accordionContentWrrapper: {
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        marginBottom:16,
        borderBottomLeftRadius:12,
        borderBottomRightRadius : 12
    },
    AcordionHeader: {
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:12,
       
    },
    Title: {
        color:colors.BLACK,
        fontWeight:'bold'
    },
})

