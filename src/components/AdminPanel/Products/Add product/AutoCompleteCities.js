import React,{useState} from 'react'
import {Text,StyleSheet,TouchableOpacity,View} from 'react-native'
import AutoComplete from 'react-native-autocomplete-input'
import Label from '../../../Common/Label'
import {colors} from '../../../Common/Colors'
import FontAweasomeIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons';


const CITIES =["Ouarzazate","Zagora","Marrakech"]
const AutoCompleteCities=({dispatch,selectedCities})=> {
    const [query, setquery] = useState("")

    const findCity=(query)=> {
        if (query === '') {
          return [];
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        return CITIES.filter(city => city.search(regex) >= 0).slice(0,10);
    }
  
    const Item=({ item, i })=>{
      const IS_SELECTED= selectedCities.filter(sc=>sc== item)[0] != undefined

      return <TouchableOpacity key={item + i} onPress={() =>{
        if(selectedCities.indexOf(item)>-1)return setquery("")
            dispatch({type:"SET_SELECTED_CITIES",value:[...selectedCities,item.toLowerCase()]})
            setquery("")
        }}>

       <View style={{
         padding:8,
         display:"flex",
         justifyContent:"flex-start",
         alignItems:"center",
         flexDirection:'row',
       }} >
         {
           IS_SELECTED
           ? <Icon  name={"checkmark-circle"}  size={20}  color={colors.GREEN} />
           : null
         }
        
       <Text style={{color:colors.BLACK}} >{item}</Text>
       </View>
    </TouchableOpacity> 
    }


    const SelectedItem=({ item, i })=>{

      const remove=()=>{
        dispatch({type:"SET_SELECTED_CITIES",value:[...selectedCities.filter(sc=>sc != item )]})
      }
      return <View style={styles.selectedProduct} >
         <Text style={{marginRight:16}} >{item}</Text>
         <TouchableOpacity onPress={remove}>
            <FontAweasomeIcon name="remove" size={20}  color={colors.RED} />
         </TouchableOpacity>
      </View>
    }

    const cities = findCity(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View>
        <Label label="Les regions du produit " mga={16} />
         <AutoComplete
         autoCapitalize="none"
         autoCorrect={false}
         containerStyle={styles.autocompleteContainer}
         data={cities.length === 1 && comp(query, cities[0]) ? [] : cities}
         defaultValue={query}
         placeholder="Chercher une ville"
         onChangeText={text => setquery(text)}
         keyExtractor={(item,i)=>item+i}
         renderItem={({ item, i }) =><Item  key={i+item} {...{ item, i }} />}
         inputContainerStyle={styles.inputStye}
         listContainerStyle={{
           width:'100%',
         }}
         listStyle={{
           width:'100%',
           flex:1,
           margin:0,
         }}
        />


        <View style={{display:'flex',flexDirection:'row',flexWrap:"wrap"}} >
         {
           selectedCities.map((item,i)=><SelectedItem  {...{ item, i,key:i+item }} />)
         }
        </View>
      </View>
    )
}

export default AutoCompleteCities

var styles = StyleSheet.create({
      autocompleteContainer: {
        flex: 1,
      },
      itemText: {
        fontSize: 15,
        margin: 2
      },
      inputStye:{
          borderColor:colors.BLACK,
          borderRadius:12,
          borderWidth:2,
          backgroundColor:'transparent'
      },
      descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 25
      },
      infoText: {
        textAlign: 'center'
      },
      titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
      },
      directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
      },
      openingText: {
        textAlign: 'center'
      },
      selectedProduct: { 
        padding:8 ,
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:'row',
        marginTop:4,
        marginRight:4,
        borderWidth:2,
        borderRadius:12,
        borderColor:colors.BLACK
       }
});
