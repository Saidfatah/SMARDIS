import React,{useRef,useEffect} from 'react'
import {View,Text,FlatList,StyleSheet,Dimensions} from 'react-native'
import CategoryItem from './CategoryItem'
import Loading from '../../Common/Loading'

const width= Dimensions.get('screen').width
const IMAGE_HEIGHT= (width- (16*4))/4

const CategoriesSlider=({categories,done_fetching_categories,selectedCategory,selectCategory})=> {
    const ref = useRef()
    if(categories.length <1 && !done_fetching_categories)return <Loading spacing={30} />

    useEffect(() => {
        if(!selectedCategory) return
        const targetCategory= categories.filter(c=>c.id == selectedCategory)[0]
        const index= categories.indexOf(targetCategory)

        
        if(index < 0 || index == undefined || !index) return console.log({index})
        else ref.current && ref.current.scrollToIndex({
            index ,
            animated: true,
            viewOffset: Dimensions.get('window').width / 2.5,
        })
    }, [selectedCategory])
    
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
             data   = {categories}
             style  = {{...styles.list}}
             contentContainerStyle = {props =>(styles.flatList)}
             showsVerticalScrollIndicator={false}
             renderItem   = {({ item }) =><CategoryItem category={item} {...{selectedCategory,selectCategory}} />}
             keyExtractor = {(item, index) => index.toString()}
            />
        </View>
    )
}

export default  CategoriesSlider
  
  

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
