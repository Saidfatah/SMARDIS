import React,{useRef,useEffect} from 'react'
import {View,Text,FlatList,StyleSheet,Dimensions} from 'react-native'
import CategoryItem from './CategoryItem'
import Loading from '../../Common/Loading'
import { connect } from 'react-redux'

const width= Dimensions.get('screen').width
const IMAGE_HEIGHT= (width- (16*4))/4

const CategoriesSlider=({categories,done_fetching_categories,selectedCategory,selectCategory,selectSubCategory})=> {
    const ref = useRef()
    if(categories.length <1 && !done_fetching_categories)return <Loading spacing={30} />
    
    useEffect(() => {
        selectCategory({selectedCategory:"0hxbmFxnEtU05QcWbaxv",isSub:false,fromClientPanel:true})
        selectSubCategory("0hxbmFxnEtU05QcWbaxv")
    }, [])
   
    
    return (
        <View  >
            <FlatList 
             ref={ref}
             decelerationRate={'fast'}
             initialScrollIndex={0}
             onScrollToIndexFailed={info => {
                 ref.current?.scrollToIndex({ 
                     index:0, 
                     animated: true,
                     viewOffset: Dimensions.get('window').width / 2.5
                    });
              }}
             snapToInterval={IMAGE_HEIGHT}
             showsHorizontalScrollIndicator={false}
             horizontal={true}
             data   = {categories.filter(category=>category.type =="MAIN")}
             style  = {{...styles.list}}
             contentContainerStyle = {props =>(styles.flatList)}
             showsVerticalScrollIndicator={false}
             renderItem   = {({ item }) =><CategoryItem category={item} {...{selectSubCategory,selectedCategory,selectCategory}} />}
             keyExtractor = {(item, index) => index.toString()}
            />
        </View>
    )
}

  
  
export default connect(
    state=>({
        categories       : state.categories.categories,
        selectedCategory :  state.categories.selectedCategory,
        done_fetching_categories : state.categories.done_fetching_categories,
    }),
    dispatch=>({
        selectCategory : dispatch.categories.selectCategory,
        selectSubCategory : dispatch.categories.selectSubCategory,
    })
)(CategoriesSlider)

var styles = StyleSheet.create({
list:{
    borderColor:'#fff',
    padding:16,
},
Clientlist:{
    borderColor:'#fff',
    padding:16,
},
flatList:{ 
    alignItems: 'center',
     justifyContent: 'center', 
     height:200,
     flex:1
},
item:{
    marginBottom:8
}
});
