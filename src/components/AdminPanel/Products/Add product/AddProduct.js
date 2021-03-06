import React,{useEffect,useReducer} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Loading from '../../../Common/Loading'
import Error from '../../../Common/Error'
import ImagePicker from '../../../Common/ImagePicker'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'
import CategorySelection from './CategorySelection'
import CitiesCheckBox from '../../../Common/CitiesCheckBox'
import DiscountInput from './DiscountInput'
import Prices from './Prices'

const CITIES=["ouarzazate","zagora","marrakech"]
const ERRORS_INITIAL_CONFIG = {
    nameREQUIRED:false,
    activePriceREQUIRED:false,
    price1REQUIRED:false,
    price2REQUIRED:false,
    activePriceREQUIRED:false,
    refREQUIRED:false,
    stockREQUIRED:false,
    imageREQUIRED:false,
    categoryREQUIRED:false,
    addERROR:false,
}
const ERRORS_MESSAGES= [
    {type:'REQUIRED',message:'ce champ est obligatoir'},
]
const initialState=(categories,selectedCategorySubCategories)=>({
    errors:{...ERRORS_INITIAL_CONFIG},
    update:false,
    canSubmit:true,
    hasSubCategory:false,
    productToBeUpdatedId: -1,
    hasDiscount:false,
    discount:0,
    selectedCategory:categories[1],
    selectedSubCategory:selectedCategorySubCategories[0],
    selectedCities:[],
    add_error:null,
    productData:{
        name   : '',
        ref    : '',
        image  : 'NO_IMAGE',
        price1 : 0, 
        price2 : 0 ,
        price3 : 0 ,
        price4 : 0 ,
        category : null ,
        subCategory:"NOT_DEFINED",
    }
})
const reducer=(state,action)=>{
    switch (action.type) {
        case "SET_CAN_SUBMIT":
             return {...state,canSubmit:action.value}
        break;
        case "SET_UPDATE":
             return {...state,update:action.value}
        break;
        case "SET_DISCOUNT":
             return {...state,discount:action.value}
        break;
        case "SET_HAS_DISCOUNT":
             return {...state,hasDiscount:action.value}
        break;
        case "SET_PRODUCT_DATA":
             return {...state,productData:action.value}
        break;
        case "SET_SELECTED_CATEGORY":
             return {...state,selectedCategory:action.value}
             break;
        case "SET_SELECTED_CITIES":
             return {...state,selectedCities:action.value}
        break;
        case "SET_SELECTED_SUBCATEGORY":
             return {...state,selectedSubCategory:action.value}
        break;
        case "SET_HAS_SUBCATEGORY":
             return {...state,hasSubCategory:action.value}
        break;
        case "SET_PRODUCT_TO_BE_UPDATED":
             return {...state,productToBeUpdatedId:action.value}
        break;
        case "SET_ERRORS":
             return {...state,errors:action.value}
        break;
        case "SET_ADD_ERROR":
             return {...state,add_error:action.value}
        break;
        default: return state
           
    }
}

 

export const AddProduct = (props) => {
    const {
        route,
        user,
        navigation,
        updateProduct,
        product_adding_error,
        addProduct,
        selectedCategorySubCategories,
        selectSubCategory,
        categories,
        done_adding_product,
        resetIsDone,
        resetError
    }=props
    const [state, dispatch] = useReducer(reducer, initialState(categories,selectedCategorySubCategories))
   
    const {
        errors ,
        update,
        canSubmit,
        hasSubCategory ,
        productToBeUpdatedId ,
        selectedCategory ,
        selectedSubCategory ,
        productData,
        selectedCities,
        discount,
        hasDiscount,
        add_error
    }=state
     
 
    useEffect(() => {
            if(route.params){
                if(route.params.update == undefined) return 
                const {product}=route.params
                const {id,name,ref,image,stock,price1,regions,subCategory,discount, price2,price3,price4,category}=product
                navigation.setParams({PRODUCT_NAME: name})
                
                dispatch({type:"SET_SELECTED_CITIES",value:regions})
                dispatch({type:"SET_UPDATE",value:true})
                dispatch({type:"SET_DISCOUNT",value:discount >0 ? discount:0})
                dispatch({type:"SET_PRODUCT_DATA",value:{ ...productData,name,ref,image,stock,price1,price2,price3,price4}})
                dispatch({type:"SET_PRODUCT_TO_BE_UPDATED",value:id})
                // if(subCategory != "NOT_DEFINED"){
                //     dispatch({value:true,type:"SET_HAS_SUBCATEGORY"})
                // }
                dispatch({
                    type:"SET_SELECTED_CATEGORY",
                    value:categories.filter(c=> category[0] == c.id   )[0]})
                } 
    }, [])
    useEffect(() => {
            if(done_adding_product){
                 dispatch({type:"SET_CAN_SUBMIT",value:true})
                 resetIsDone("done_adding_product")
            }
            if(product_adding_error != null  && product_adding_error != undefined){
                console.log({product_adding_error})
                dispatch({type:"SET_ADD_ERROR",value:{...product_adding_error}})
                resetError("product_adding_error") 
            }
            dispatch({type:"SET_CAN_SUBMIT",value:true})
    }, [done_adding_product,product_adding_error])
     useEffect(() => {
         if(!update)dispatch({type:"SET_SELECTED_CITIES",value:[user.city.toLowerCase()]})
     }, [user])

    const resetErrors=()=>dispatch({type:"SET_ERRORS",value:{...ERRORS_INITIAL_CONFIG}})
    const handelChange=input=>v=>{dispatch({type:"SET_PRODUCT_DATA",value:{...productData,[input]:v}}) }
    const validateFields =()=>{
         let errorsCount=0
         const {name,ref,image,stock,activePrice,price1, price2,price3,price4}=productData
         let errorsTemp = {...errors}

         if(stock == 0   ){
             errorsTemp.stockREQUIRED =true
             errorsCount++
         }
         if(name == ''){
             errorsTemp.nameREQUIRED =true
             errorsCount++
         }
         if(activePrice == ''){
             errorsTemp.activePriceREQUIRED =true
             errorsCount++
         }
         if(price1 == 0){
             errorsTemp.price1REQUIRED =true
             errorsCount++
         }
         if(price2 == 0){
             errorsTemp.price2REQUIRED =true
             errorsCount++
         }
         if(ref == ''){
             errorsTemp.refREQUIRED =true
             errorsCount++
         }
         if(selectedCategory == undefined){
             errorsTemp.categoryREQUIRED =true
             errorsCount++
         }
     

         if(errorsCount >0) {
            dispatch({type:"SET_ERRORS",value:errorsTemp})
            return false
         }
         return true
    }
    const dispatchAddProduct=()=>{
      
        if(!validateFields()) return 

        dispatch({type:"SET_CAN_SUBMIT",value:false})
        dispatch({type:"SET_ADD_ERROR",value:null})
        const productObj = {...productData,regions:selectedCities}
        productObj.category= selectedCategory.id
        productObj.discount= discount

 
        productObj.subCategory= "NOT_DEFINED"
        if(selectedCategorySubCategories.length > 0 && hasSubCategory && selectedSubCategory){
         productObj.subCategory= selectedSubCategory.id
        } 
     
        if(!update) return addProduct({...productObj,navigation})
        updateProduct({...productObj,id:productToBeUpdatedId,navigation})

        
    }
   
 
    const {name,ref,price1, price2,price3,price4,image}=productData
    return  <KeyboardAwareScrollView   
    contentContainerStyle={{display:'flex',flexGrow:1 }}  
    style={styles.container} 
    >
        <View style={{flex:1}} >
            <View>
                <Label label="Titre " mga={16} />
                <Error trigger={errors.nameREQUIRED} error={ERRORS_MESSAGES[0].message} />
                <TextInput style={styles.Input}   
                        placeholder={"Entrer Le titre du produit"}   
                        defaultValue={name} 
                        keyboardType="default"
                        onFocus={e=> resetErrors()}
                        onChangeText={text=>handelChange('name')(text.trim())} 
                /> 
            </View>

            <View>
                <Label label="Référence"  mga={16} />
                <Error trigger={errors.refREQUIRED} error={ERRORS_MESSAGES[0].message} />
                <TextInput style={styles.Input}   
                        placeholder={"Entrer Le refrence du produit"}   
                        defaultValue={ref} 
                        editable={!update}
                        keyboardType="default"
                        onFocus={e=> resetErrors()}
                        onChangeText={text=>handelChange('ref')(text.trim())} 
                /> 
            </View>
            
            <ImagePicker {...{title:'"image de produit"',setImage:handelChange('image'),image}}/>
          
           <Label label="Les regions du produit " mga={16} />
            {
                selectedCities.length
                ?<CitiesCheckBox 
                setSelected={(value)=>dispatch({type:"SET_SELECTED_CITIES",value})} 
                isMultiple={true}
                selected={selectedCities}
                data={CITIES.map((c,i)=>({
                    value:c,
                    checked:  selectedCities.indexOf(c)>=0
                  }))}
               />  
               :null
            }
            <CategorySelection {...{selectSubCategory,dispatch,errors,ERRORS_MESSAGES,selectedCategory,selectedSubCategory,selectedCategorySubCategories,categories,hasSubCategory}} />
            <DiscountInput {...{discount,hasDiscount,dispatch}} />
            <Prices {...{price1, price2,price3,price4,handelChange,errors,ERRORS_MESSAGES}} />
          
        </View>

        <View style={{marginTop:8}}>
             <Error trigger={add_error} error={add_error && add_error.message} />
             <View style={styles.btns} >
                  <Button
                   xStyle={{...styles.BtnXstyle,marginRight:16}} 
                   color={"BLUE"} 
                   loadingSize={30}
                   loading={!canSubmit}
                   disabled={!canSubmit}
                   clickHandler={e=>dispatchAddProduct()} 
                   >
                       {
                           canSubmit
                           ? <Text style={styles.ButtonText}>{update?"Modifier":"Enregistrer"}</Text>
                           :<Loading spacing={25} />
                       }
                     
                 </Button>
                  <Button
                   xStyle={styles.BtnXstyle} 
                   color={"RED"} 
                   clickHandler={e=>{
                       navigation.goBack()

                       dispatch({type:"SET_ERRORS",value:{...errors,addERROR:false}})
                     }} 
                   >
                      <Text style={styles.ButtonText}>Annuler</Text>
                 </Button>
             </View>
        </View>

    </KeyboardAwareScrollView>  
}



export default connect(
    state=>({
       categories : state.categories.categories,
       selectedCategorySubCategories : state.categories.selectedCategorySubCategories,
       done_adding_product:state.products.done_adding_product,
       product_adding_error:state.products.product_adding_error,
       user:state.auth.user,
    })
    , 
    dispatch=>({
        updateProduct : dispatch.products.updateProduct,
        resetIsDone: dispatch.products.resetIsDone,
        addProduct: dispatch.products.addProduct,
        selectSubCategory: dispatch.categories.selectSubCategory,
        resetError: dispatch.products.resetError,
    })
)(AddProduct)

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
    ButtonText:{color:"#fff",textAlign:'center',fontWeight:'bold'},
    BtnXstyle:{
        flex:1,
        margin:0,
        borderRadius:12,
        display:'flex',
        flexDirection:'row',
        justifyContent:('center'),
        alignItems:'center'
    },
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff'
    },
    btns:{flex:1,display:'flex',flexDirection:'row',marginTop:16,marginBottom:16,justifyContent:'space-between'}
    ,planType:{
        backgroundColor:'#fff',
        borderRadius:50,
        flexDirection:'row',
        padding:4,
        margin:4,
    },
     
});
