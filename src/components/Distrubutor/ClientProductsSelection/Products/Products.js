import React,{useState,useEffect} from 'react'
import {View,StyleSheet,FlatList} from 'react-native'
import ProductItem from './ProductItem'
import _ from 'lodash'


const Products=({isSelectedCategorySpecial,selectedCategoryProducts,setIsPanelActive,setselectedProduct,client,selectedCategorySubCategories})=> {
    const [productsList, setproductsList] = useState([])
  
    useEffect(() => {
        //filter out products with category defined 
        let productsListTemp=selectedCategoryProducts.filter(p=>p.subCategory == "NOT_DEFINED").map(p=>({...p,subs:[]}))
        let  groupedDash=[]
        if(isSelectedCategorySpecial){
            setproductsList(selectedCategoryProducts.map(sp=>({
                ...sp,
                name:sp.name,
                subs:[]
            })))
        }else{
             groupedDash= _.groupBy(selectedCategoryProducts.filter(p=>p.subCategory != "NOT_DEFINED"),"subCategory")
             const SectionListData = Object.keys(groupedDash).map(key=>({
                title:isSelectedCategorySpecial ?"is special":selectedCategorySubCategories.filter(c=>c.id ==key)[0].name,
                data:groupedDash[key] 
            }))
    
            SectionListData.forEach((group,index)=>{
                const firstProduct=group.data[0]
                productsListTemp.push(({
                    ...firstProduct,
                    name:group.title,
                    subs:group.data
                }))
            })
    
            setproductsList(productsListTemp)
         }
      
        
      
     
        
    }, [selectedCategoryProducts])
 
  
  
 
     
    return (
    <View  style={{flex:1}}> 
        <FlatList 
         decelerationRate={'fast'}
         data   = {productsList}
         style  = {styles.list}
         contentContainerStyle = {props =>(styles.flatList)}
         showsVerticalScrollIndicator={false}
         renderItem   = {({ item,index }) =><ProductItem
         index={index}
         product={item}  
         isSub={item.subs.length >0}
         client={client}
         setIsPanelActive={setIsPanelActive} 
         setselectedProduct={setselectedProduct} 
         />}
         keyExtractor = {(item, index) => index.toString()}
        />
       
    </View>
    )
}

export default Products
var styles = StyleSheet.create({
    list:{
        flex:1
    },
    flatList:{ 
        justifyContent: "center",
        alignItems: "center",
        flex:1
    },
    container: {
        flex: 1,
       
        marginHorizontal: 16
      },
      item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
      },
      header: {
        fontSize: 32,
        backgroundColor: "#fff"
      },
      title: {
        fontSize: 24,
        color:"#000"
      },
      product:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        borderColor:'#fff',
        borderBottomColor:'#000',
        borderBottomWidth:1,
        paddingTop:8,
        paddingBottom:8,
        flex: 1,
    },
});
    