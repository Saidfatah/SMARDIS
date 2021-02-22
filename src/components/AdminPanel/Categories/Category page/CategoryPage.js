import React,{useEffect,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import { List } from 'react-native-paper';
import { connect } from 'react-redux'
import Button from '../../../Common/Button'
import Item from '../../../Common/Item'
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'
import CategoryItem from '../CategoryItem'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Image from 'react-native-fast-image'
import ProductInfo from '../../../Distrubutor/ClientProductsSelection/Products/ProductInfo'
import Loading from '../../../Common/Loading'

export const CategoryPage = (props) => {
    const {
        navigation,
        selectedCategorySubCategories,
        route,
        selectedCategoryProducts,
        resetIsDone,
        done_removing_category,
        selectCategory,
        category_has_products,
        selectSubCategory,
        removeCategory
    } = props
    const [isExpanded, setIsExpanded] = useState(false)
    const [isExpandedSubCategories, setIsExpandedSubCategories] = useState(false)
    const [canRemove, setcanRemove] = useState(true)
    const {category} = route.params;

    useEffect(() => {
        done_removing_category == true && setcanRemove(true) && resetIsDone("done_removing_category")
    }, [done_removing_category])
    useEffect(() => {
        navigation.setParams({CATEGORY_NAME:category.name})
        selectSubCategory(category.id)
        selectCategory({selectedCategory:category.id,isSub:category.type=="SUB",fromClientPanel:false})
    }, [category])

    if(!category) return <Text>category nexist pas</Text>



    const {name,image}=category
    const ACCORDION_PROPS=(count,title,expandedType,setExpandedType)=>({
        title:<View style={styles.accordionTitle}>
            <Text>{title}</Text>
            <Badge
              status={count >0 ?"success":"warning"}
              value={(count).toString()} 
              textStyle={{ fontSize:14 }} containerStyle={{marginLeft:16}} badgeStyle={{   height:24  }}
            />
        </View>,
        titleStyle: styles.Title,
        style:{
            ...styles.AcordionHeader,
            borderBottomLeftRadius  : !expandedType?12:0,
            borderBottomRightRadius : !expandedType?12:0 ,
            marginBottom: expandedType ?0:16 ,
        },
        expanded:expandedType,
        onPress:()=>setExpandedType(!expandedType)
    })
    
    const CategoryProducts=()=>{
        if(selectedCategoryProducts.length > 0  ){
        return  <View >
        <Label label="Les produit :"  mga={16} />
        <List.Section >
            <List.Accordion  {...ACCORDION_PROPS(selectedCategoryProducts.length,"Produits",isExpanded,setIsExpanded)} >
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
    }
    return null
    }
    const CategorySubCategoryies=()=>{
        if(selectedCategorySubCategories && selectedCategorySubCategories.length >0){
         return  <View >
        <Label label="Les Sous category :"  mga={16} />
        <List.Section >
            <List.Accordion  {...ACCORDION_PROPS(selectedCategorySubCategories.length,"Sous categories",isExpandedSubCategories,setIsExpandedSubCategories)} >
                  <View style={styles.accordionContentWrrapper}>
                    {
                     selectedCategorySubCategories.map((category,index)=><CategoryItem key={index} category={category} navigation={navigation} />)
                    }
                  </View>
            </List.Accordion>               
         </List.Section>
        </View>
       }
        return null
    }
    const CategoryInfo=()=>{
        return <View>
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
              style={{height:70,width:70,borderRadius:70,marginLeft:8}}  
              source={image!="NO_IMAGE"
              ?{uri:image}
              :require('../../../../images/noImage.jpg')
              }  
              />
        </View>
    </View>
        </View>
    }
    const CategoryPageActions=()=>{
        return <View style={styles.btns} >
        {
        !category.isOther
        ?<Button
         xStyle={{...styles.BtnXstyle}} 
         color={"RED"} 
         disabled={!canRemove}
         clickHandler={e=>{
             Alert.alert("Suppression!", "Etes-vous sûr que vous voulez supprimer? ", [
                 {
                   text: "Annuler",
                   onPress: () => null,
                   style: "cancel"
                 },
                 { text: "OUI", onPress: () =>{
                     setcanRemove(false)
                     removeCategory({category,admin:0,navigation})
                     navigation.goBack()
                 }
                }
               ]);
             
         }} 
         >
              <Text style={styles.ButtonText}>Supprimer La category</Text>
              <IonIcon name="trash" size={25} color="#fff" />
        </Button>
        :null
        }
        <Button
         xStyle={styles.BtnXstyle} 
         color={"BLUE"} 
         clickHandler={e=>navigation.navigate('ADMINupdateCategory',{category,update:true}) } 
         >
            <Text style={styles.ButtonText}>Modifier la category</Text>
            <IonIcon name="ios-settings-sharp" size={25} color="#fff" />
        </Button>
 </View>
    }
    return (
        <ScrollView 
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} >  
            <View>
               <CategoryInfo />
               <CategorySubCategoryies />
               <CategoryProducts />
           </View>
           <CategoryPageActions />
    </ScrollView>
    )
}

 

export default connect(
    state=>({
       selectedCategorySubCategories : state.categories.selectedCategorySubCategories,
       selectedCategoryProducts :  state.categories.selectedCategoryProducts,
       category_has_products :  state.categories.category_has_products,
       done_removing_category :  state.categories.done_removing_category,
    }), 
    dispatch =>({
      removeCategory: dispatch.categories.removeCategory,
      selectCategory : dispatch.categories.selectCategory,
      resetIsDone : dispatch.categories.resetIsDone,
      selectSubCategory: dispatch.categories.selectSubCategory,
    })
)(CategoryPage)

const styles = StyleSheet.create({
    accordionTitle:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        width : '100%',
        justifyContent:'space-between',
    },
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

