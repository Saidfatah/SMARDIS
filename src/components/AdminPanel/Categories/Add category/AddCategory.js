import React,{useReducer,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet ,LogBox} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Error from '../../../Common/Error'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'
import ImagePicker from '../../../Common/ImagePicker'
import ProductsMultiSelect from './ProductsMultiSelect'
import SubCategoryChoice from './SubCategoryChoice'



const ERRORS_INITIAL_CONFIG = {
    nameREQUIRED:false,
    imageREQUIRED:false,
    addERROR:false
}
const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
const CATEGORY_TYPES=[
    {value:"MAIN",label:"category"},
    {value:"SUB",label:"sous category"}
]
const initialState=(selectedCategory)=>({
    errors:{...ERRORS_INITIAL_CONFIG},
    canSubmit:true,
    selectedCategory,
    type:CATEGORY_TYPES[0].value,
    name:"",
    image:"NO_IMAGE",
    categoryToBeUpdated:-1,
    update:false,
    selectedProducts:[],
    items:[],
})
const reducer=(state,action)=>{
    switch (action.type) {
        case "SET_CAN_SUBMIT":
             return {...state,canSubmit:action.value}
        break;
        case "SET_UPDATE":
             return {...state,update:action.value}
        break;
        case "SET_SELECTED_CATEGORY":
             return {...state,selectedCategory:action.value}
        break;
        case "SET_SELECTED_PRODUCTS":
             return {...state,selectedProducts:action.value}
        break;
        case "SET_TYPE":
             return {...state,type:action.value}
        break;
        case "SET_IMAGE":
             return {...state,image:action.value}
        break;
        case "SET_NAME":
             return {...state,name:action.value}
        break;
        case "SET_CATEGORY_TO_BE_UPDATED":
             return {...state,categoryToBeUpdated:action.value}
        break;
        case "SET_ERRORS":
             return {...state,errors:action.value}
        break;
        case "SET_ITEMS":
             return {...state,items:action.value}
        break;
    
        default: return state
           
    }
}



export const AddCategory = (props) => {
     const {
        navigation,
        route,
        categories,
        updateCategory,
        addCategory,
        resetIsDone,
        category_add_error,
        done_adding_category,
        products
     }=props
     const [state, dispatch] = useReducer(reducer, initialState(categories[0]))
     
     const {
        errors ,
        canSubmit ,
        selectedCategory,
        type ,
        name ,
        image ,
        categoryToBeUpdated ,
        update ,
        selectedProducts,
        items
     }=state
  
   
   
  
    useEffect(() => {
        if(done_adding_category){
          dispatch({type:"SET_CAN_SUBMIT",value:true})
           resetIsDone("done_adding_category")
        }
    }, [done_adding_category])
    useEffect(() => {
        //set multi select items 
        LogBox.ignoreLogs(['VirtualizedLists'])
        dispatch({type:"SET_ITEMS",value:products.map(p=>({id:p.id,name:p.name}))})

        //if were were using this compoent for the updating then whe need to set state
        //to the hosted category ro be updated 
        if(route.params){
            if(route.params.update == undefined) return 
            const {category}=route.params
            const { id }=category
            navigation.setParams({CATEGORY_NAME:category.name})
          
            const categoriesProducts = products.filter(p=> p.category.indexOf(id) > -1)
            
            dispatch({
                type:"SET_SELECTED_PRODUCTS",
                value:categoriesProducts.map(p=>p.id)
            })
            dispatch({
                type:"SET_NAME",
                value:category.name
            })
            dispatch({
                type:"SET_IMAGE",
                value:category.image
            })
            dispatch({
                type:"SET_UPDATE",
                value:true
            })
            dispatch({
                type:"SET_CATEGORY_TO_BE_UPDATED",
                value:id
            })
        } 
    }, [])
    useEffect(() => {
        if(category_add_error){
            dispatch({type:"SET_ERRORS",value:{...errors,addERROR:true}})
            //reset category_add_error in redux 
        }
    }, [category_add_error])

 

   
    const resetErrors=()=>dispatch({type:"SET_ERRORS",value:{...ERRORS_INITIAL_CONFIG}})
    const validateFields =()=>{
        let errorsCount=0
        let errorsTemp = {...errors}
        if(name == ""){
            errorsTemp.nameREQUIRED =true
            errorsCount++
        }
   
        if(errorsCount >0) {
            dispatch({type:"SET_ERRORS",value:errorsTemp})
            return false
         }
         return true
    }
    const dispatchAddCategory=()=>{
        if(!validateFields()) return 
        dispatch({type:"SET_CAN_SUBMIT",value:false})
        let categoryObj = {name,image,type,selectedProducts}
        if(type =="SUB"){
            categoryObj.parent={
                id:selectedCategory.id,
                name:selectedCategory.name
            }
        }
       
        if(!update) return addCategory({...categoryObj,navigation})
        updateCategory({...categoryObj,id:categoryToBeUpdated,navigation})
    }
  
    const Buttons=()=>{
        return <View style={styles.btns} >
        <Error  trigger={errors.addERROR} error={category_add_error && category_add_error.message} />

        <Button
         xStyle={{...styles.BtnXstyle,marginRight:16}} 
         color={"BLUE"}
         disabled={!canSubmit} 
         clickHandler={e=>dispatchAddCategory()} 
         >
            <Text style={styles.ButtonText}>{update?"Modifier":"Enregistrer"}</Text>
       </Button>
        <Button
         xStyle={styles.BtnXstyle} 
         color={"RED"} 
         clickHandler={e=>navigation.goBack()} 
         >
            <Text style={styles.ButtonText}>Annuler</Text>
       </Button>
   </View>
    }
   


    return (
        <KeyboardAwareScrollView   
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} >  
        <View>
            <View>
                <Label label="Titre"  mga={16} />
                <Error trigger={errors.nameREQUIRED} error={ERRORS_MESSAGES[0].message} />
                <TextInput style={styles.Input}   
                    placeholder={"entrer le titre  du category"}   
                    defaultValue={name} 
                    onFocus={e=> resetErrors()}
                    keyboardType="default"
                    onChangeText={value=> dispatch({type:'SET_NAME',value:value.trim()}) } 
                />
            </View>
       
            <SubCategoryChoice  {...{CATEGORY_TYPES,type,dispatch,categories,selectedCategory,update}} />
            <ProductsMultiSelect {...{dispatch, selectedProducts,items}} />
            <ImagePicker {...{
                errors,
                title:'"image de category"',
                setImage:value=>{
                    dispatch({type:'SET_IMAGE',value})
                },
            }}/> 
            
          
        </View>
        <Buttons/>
     </KeyboardAwareScrollView>
    )
}
 

export default connect(
    state=>({
        done_adding_category    : state.categories.done_adding_category,
        category_add_error    : state.categories.category_add_error,
        categories    : state.categories.categories,
        products    : state.products.products,
    }),
    dispatch=>({
        addCategory    : dispatch.categories.addCategory,
        updateCategory : dispatch.categories.updateCategory,
        resetIsDone : dispatch.categories.resetIsDone,
    })
    
)
(AddCategory)


var styles = StyleSheet.create({
    Input:{
      padding:8 ,
      color:colors.BLACK,
      backgroundColor:'#fff',
      width:'100%',
      marginBottom:8,
      borderColor:colors.BLACK,
      borderWidth:2,
      borderRadius:12, 
    },
    ButtonText:{
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold'
    },
    BtnXstyle:{
        flex:1,
        margin:0,
        borderRadius:12
    },

    btns:{
        display:'flex',
        flexDirection:'row',
        marginTop:16,
        marginBottom:16,
        justifyContent:'space-between'
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
 });
