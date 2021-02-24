import React,{useState,useEffect,useCallback} from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Error from '../../../Common/Error'
import ImagePicker from '../../../Common/ImagePicker'
import DropDown from '../../../Common/DropDown'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
const ERRORS_INITIAL_CONFIG = {
    nameREQUIRED:false,
    activePriceREQUIRED:false,
    price1REQUIRED:false,
    price2REQUIRED:false,
    price3REQUIRED:false,
    price4REQUIRED:false,
    activePriceREQUIRED:false,
    refREQUIRED:false,
    stockREQUIRED:false,
    imageREQUIRED:false,
    categoryREQUIRED:false,
    addERROR:false,
}
const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
import NumericInput from 'react-native-numeric-input'



export const AddProduct = (props) => {
    const {
        route,
        navigation,
        updateProduct,
        product_adding_error,
        addProduct,
        selectedCategorySubCategories,
        selectSubCategory,
        categories,
        done_adding_product,
        resetIsDone
    }=props
    const [errors, seterrors] = useState({...ERRORS_INITIAL_CONFIG})
    const [update, setupdate] = useState(false)
    const [canSubmit, setcanSubmit] = useState(true)
    const [hasSubCategory, sethasSubCategory] = useState(true)
    const [productToBeUpdatedId, setproductToBeUpdatedId] = useState(-1)
    const [selectedCategory, setselectedCategory] = useState(categories[0])
    const [selectedSubCategory, setselectedSubCategory] = useState(selectedCategorySubCategories[0])

    
    // const [activePrice, setactivePrice] = useState(PRICES[0])
    const [productData, setproductData] = useState({
        name   : '',
        ref    : '',
        image  : 'NO_IMAGE',
        price1 : 0, 
        price2 : 0 ,
        price3 : 0 ,
        price4 : 0 ,
        category : null ,
        subCategory:"NOT_DEFINED"
    })
    
    useEffect(() => {
        done_adding_product == true && setcanSubmit(true) && resetIsDone("done_adding_product")
    }, [done_adding_product])
    useEffect(() => {
        if(route.params){
            if(route.params.update == undefined) return 
            const {product}=route.params
            const {id,name,ref,image,stock,price1, price2,price3,price4,category}=product
            navigation.setParams({PRODUCT_NAME: name})
            setproductData({
             ...productData,
             name ,
             ref ,
             image ,
             stock ,
             price1 , 
             price2 ,
             price3 ,
             price4 
            })
            setupdate(true)
            setproductToBeUpdatedId(id)
            setselectedCategory(categories.filter(c=>c.id == category)[0])
        } 
    }, [])
    useEffect(() => {
        console.log({product_adding_error})
        setcanSubmit(true)
        product_adding_error != null && seterrors({...errors,addERROR:true}) &&  resetIsDone("product_adding_error")  
    }, [product_adding_error])
    useEffect(() => {
        console.log("dipsatch [selectedCategorySubCategories]")
        if(selectedCategory != undefined){
            selectSubCategory(selectedCategory.id)
        }
    }, [selectedCategory])
    

    const resetErrors=()=>seterrors({...ERRORS_INITIAL_CONFIG})
    const handelChange=input=>v=>{ setproductData({...productData,[input]:v}) }
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
         if(price3 == 0){
             errorsTemp.price3REQUIRED =true
             errorsCount++
         }
         if(price4 == 0){
             errorsTemp.price4REQUIRED =true
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
            seterrors(errorsTemp)
            return false
         }
         return true
    }
    const handleTextChange=(input)=>(text)=>{
    //    let number=text.replace(/[^0-9]/g, '')
       
       let number=text==""?0:text.replace(/^\d+\.\d{0,2}$/, '')
       console.log(number)
       let  value = parseFloat(number)
       if(value == NaN || value.toString().includes('NaN') || value=='NAN') value = 0
       handelChange(input)(value)
    }
    const dispatchAddProduct=()=>{
        if(!validateFields()) return 
         setcanSubmit(false)
        const productObj = {...productData}
        productObj.category= selectedCategory.id

        // productObj.activePrice= activePrice
        if(selectedCategorySubCategories.length > 0 && hasSubCategory){
         productObj.subCategory= selectedSubCategory.id
        }
     
        if(!update) return addProduct({...productObj,navigation})
        updateProduct({...productObj,id:productToBeUpdatedId,navigation})

        
    }
   
 
    const {name,ref,price1, price2,price3,price4}=productData
    
    const CateorySelection=()=>{
        return <View>
        <Label label="Category" mga={16} />
        <Error trigger={errors.categoryREQUIRED} error={ERRORS_MESSAGES[0].message} />
        <DropDown 
            data={categories.filter(c=>c.type == "MAIN").map(c=>({value : c, label :c.name}))} 
            keyExtractor={item=>item.value.id}
            defaultValue={selectedCategory && selectedCategory.name}
            setSelected={setselectedCategory} 
            selected={selectedCategory}
        />

          <TouchableOpacity   onPress={()=>sethasSubCategory(!hasSubCategory)}>
          <View style={styles.planType}>
              <Icon 
                   name={hasSubCategory
                      ?"checkmark-circle"
                      :"checkmark-circle-outline"} 
                   size={20} 
                   color={colors.GREEN} 
              />
              <Text> Sous category  </Text>
          </View>
         </TouchableOpacity>

         
          <DropDown 
              hidden={ selectedCategorySubCategories.length < 1 || !hasSubCategory}
              data={selectedCategorySubCategories.map(c=>({value : c, label :c.name}))} 
              keyExtractor={item=>item.value.id}
              defaultValue={selectedSubCategory && selectedSubCategory.name}
              setSelected={setselectedSubCategory} 
              selected={selectedSubCategory}
          />
       
    </View>

    }
    const Buttons=()=>{
        return <View>
             <Error trigger={errors.addERROR} error={product_adding_error && product_adding_error.message} />
             <View style={styles.btns} >
                  <Button
                   xStyle={{...styles.BtnXstyle,marginRight:16}} 
                   color={"BLUE"} 
                   loadingSize={30}
                   loading={!canSubmit}
                   disabled={!canSubmit}
                   clickHandler={e=>dispatchAddProduct()} 
                   >
                      <Text style={styles.ButtonText}>{update?"Modifier":"Enregistrer"}</Text>
                 </Button>
                  <Button
                   xStyle={styles.BtnXstyle} 
                   color={"RED"} 
                   clickHandler={e=>{
                       navigation.goBack()
                       seterrors({...errors,addERROR:false})
                     }} 
                   >
                      <Text style={styles.ButtonText}>Annuler</Text>
                 </Button>
             </View>
        </View>
  }



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
                        onChangeText={text=>handelChange('name')(text)} 
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
                        onChangeText={text=>handelChange('ref')(text)} 
                /> 
            </View>

            <ImagePicker {...{
                title:'"image de produit"',
                setImage:handelChange('image'),
                errors
            }}/>
            <CateorySelection />
            
            <View>
                <Label label="Prix 1" mga={16}/>
                <Error trigger={errors.price1REQUIRED} error={ERRORS_MESSAGES[0].message} />
            
                 <NumericInput 
                  iconSize={30}
                  minValue={0}
                  step={1}
                  valueType="real"
                  value={price1} 
                  containerStyle={{
                      borderRadius:12,
                      borderColor:colors.BLACK,
                  }}
                  inputStyle={{
                      borderColor:colors.BLACK,
                    }}
                   iconStyle={{
                       color:colors.BLACK,
         
                    }}
                   leftButtonBackgroundColor="transparent"
                   rightButtonBackgroundColor="transparent"
                  
                  onChange={handelChange('price1')} 
                  />
            </View>
            <View>
                <Label label="Prix 2" mga={16}/>
                <Error trigger={errors.price2REQUIRED} error={ERRORS_MESSAGES[0].message} />
                <NumericInput 
                  iconSize={30}
                  minValue={0}
                  step={1}
                  valueType="real"
                  value={price2} 
                  containerStyle={{  borderRadius:12,  borderColor:colors.BLACK,
                  }}
                  inputStyle={{ borderColor:colors.BLACK,  }}
                   iconStyle={{color:colors.BLACK, }}
                  leftButtonBackgroundColor="transparent"
                  rightButtonBackgroundColor="transparent"
                  onChange={handelChange('price2')} 
                  />
            </View>
            <View>
                <Label label="Prix 3" mga={16}/>
                <Error trigger={errors.price3REQUIRED} error={ERRORS_MESSAGES[0].message} />
                <NumericInput 
                  iconSize={30}
                  minValue={0}
                  step={1}
                  valueType="real"
                  value={price3} 
                  containerStyle={{  borderRadius:12,  borderColor:colors.BLACK,
                  }}
                  inputStyle={{ borderColor:colors.BLACK,  }}
                   iconStyle={{color:colors.BLACK, }}
                  leftButtonBackgroundColor="transparent"
                  rightButtonBackgroundColor="transparent"
                  onChange={handelChange('price3')} 
                  />
            </View>
            <View>
                <Label label="Prix 4" mga={16}/>
                <Error trigger={errors.price4REQUIRED} error={ERRORS_MESSAGES[0].message} />
                <NumericInput 
                  iconSize={30}
                  minValue={0}
                  step={1}
                  valueType="real"
                  value={price4} 
                  containerStyle={{  borderRadius:12,  borderColor:colors.BLACK,
                  }}
                  inputStyle={{ borderColor:colors.BLACK,  }}
                   iconStyle={{color:colors.BLACK, }}
                  leftButtonBackgroundColor="transparent"
                  rightButtonBackgroundColor="transparent"
                  onChange={handelChange('price4')} 
                  />
            </View>
        </View>

        <Buttons />

    </KeyboardAwareScrollView>  
}



export default connect(
    state=>({
       categories : state.categories.categories,
       selectedCategorySubCategories : state.categories.selectedCategorySubCategories,
       done_adding_product:state.products.done_adding_product,
       product_adding_error:state.products.product_adding_error,
    })
    , 
    dispatch=>({
        updateProduct : dispatch.products.updateProduct,
        resetIsDone: dispatch.products.resetIsDone,
        addProduct: dispatch.products.addProduct,
        selectSubCategory: dispatch.categories.selectSubCategory,
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
