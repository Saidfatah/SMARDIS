import React from 'react'
import Item from '../../Common/Item'
import {View,Text,FlatList,StyleSheet , TouchableOpacity} from 'react-native'

// import Animated, {useAnimatedStyle} from 'react-native-reanimated';
// import {bin,mix,useTiming} from 'react-native-redash' 
// const {interpolate,not}=Animated


const SectorItem=({sector,clients,index,opened,toggleSector,navigation})=> {
        const navigateToRoute=(clientId,client)=>navigation.navigate('DISTRIBUTORclientDelivery', { clientId ,client });
        const {name}=sector
        const ITEM_HEIGHT = 100
        // const transition = useTiming(opened)
        // const style = useAnimatedStyle(()=>({
        //   height: mix(transition,0,clients.length * ITEM_HEIGHT)
        // }))
      
        //here we wll also have the clients of each sector 
        return <Item xStyle={styles.item}>
                <View>
                    <Text>{name}</Text>
                    <TouchableOpacity onPress={e=>toggleSector(index)}>
                       <Text>open</Text>
                    </TouchableOpacity>
                </View>
                <View style={{display:opened ? 'flex':'none'}}>
                    <FlatList 
                       data   = {clients}
                       style  = {{...styles.Clientlist,display:opened?'flex':'none'}}
                       contentContainerStyle = {props =>(styles.flatList)}
                       showsVerticalScrollIndicator={false}
                       renderItem   = {({ item }) =><Item xStyle={{marginBottom:8}}> 
                         <TouchableOpacity onPress={e=>navigateToRoute(item.id,item)}>
                           {/* redirect to client  */}
                              <Text>{item.name} </Text>
                         </TouchableOpacity>
                       </Item> }
                       keyExtractor = {(item, index) => index.toString()}
                    />
                </View>
        </Item>
   
}

export default SectorItem
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
  