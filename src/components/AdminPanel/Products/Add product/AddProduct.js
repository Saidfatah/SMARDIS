import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Loading from '../../../Common/Loading'
import Error from '../../../Common/Error'
import ImagePicker from '../../../Common/ImagePicker'
import DropDown from '../../../Common/DropDown'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'


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
}
const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
// const PRICES=["price1","price2","price3","price4"]



export const AddProduct = ({route,navigation,updateProduct,addProduct,categories,done_adding_product,resetIsDone,uploadedProductImageUri,uploadProductImage}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [errors, seterrors] = useState({...ERRORS_INITIAL_CONFIG})
    const [update, setupdate] = useState(false)
    const [canSubmit, setcanSubmit] = useState(true)
    const [productToBeUpdatedId, setproductToBeUpdatedId] = useState(-1)
    const [selectedCategory, setselectedCategory] = useState(categories[0])
    // const [activePrice, setactivePrice] = useState(PRICES[0])
    const [productData, setproductData] = useState({
        name   : 'Dove',
        ref    : 'REF',
        image  : 'NO_IMAGE',
        price1 : 90, 
        price2 : 50 ,
        price3 : 45 ,
        price4 : 54 ,
        category : null ,
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
        if(uploadedProductImageUri != null) handelChange('image')(uploadedProductImageUri)
    }, [uploadedProductImageUri])

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
         if(image == 'NO_IMAGE'){
             errorsTemp.imageREQUIRED =true
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

        if(!update) return addProduct({...productObj,navigation})
        updateProduct({...productObj,id:productToBeUpdatedId,navigation})
    }


    const {name,ref,price1, price2,price3,price4}=productData
    return  <KeyboardAwareScrollView   
    contentContainerStyle={{ display:'flex',  flexGrow:1 }}  
    style={styles.container} >

        <View style={{flex:1}} >
            <Label label="Titre " mga={16} />
            <Error trigger={errors.nameREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer Le titre du produit"}   
                    defaultValue={name} 
                    keyboardType="default"
                    onFocus={e=> resetErrors()}
                    onChangeText={text=>handelChange('name')(text)} 
            /> 

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

            <Label label="Image" mga={16} />
            <Error trigger={errors.imageREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <Button
              xStyle={{...styles.BtnXstyle,marginRight:16}} 
              color={"LIGHTGREY"} 
              clickHandler={e=>{
                  if(name == "")return seterrors({...errors,nameREQUIRED:true})
                  setModalVisible(true)
                 
               }} 
              >
                 <Text style={styles.ButtonText}>Ajouter Une Image</Text>
            </Button>
            <ImagePicker {...{
                setModalVisible,
                modalVisible,
                model:'PRODUCT',
                imageUploadHandler:uploadProductImage,
                name
            }}/>
    

            <Label label="Category" mga={16} />
            <Error trigger={errors.categoryREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <DropDown 
                data={categories.map(c=>({value : c, label :c.name}))} 
                setSelected={setselectedCategory} 
                selected={selectedCategory}
            />
    
            <Label label="Prix 1" mga={16}/>
            <Error trigger={errors.price1REQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer le prix1"}   
                    defaultValue={price1.toString()} 
                    keyboardType="decimal-pad"
                    onFocus={e=> resetErrors()}
                    onChangeText={handleTextChange('price1')} 
            />
            <Label label="Prix 2" mga={16}/>
            <Error trigger={errors.price2REQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer le prix2"}   
                    defaultValue={price2.toString()} 
                    keyboardType="decimal-pad"
                    onFocus={e=> resetErrors()}
                    onChangeText={handleTextChange('price2')} 
            />
            <Label label="Prix 3" mga={16}/>
            <Error trigger={errors.price3REQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer le prix3"}   
                    defaultValue={price3.toString()} 
                    keyboardType="decimal-pad"
                    onFocus={e=> resetErrors()}
                    onChangeText={handleTextChange('price3')} 
            />
            <Label label="Prix 4" mga={16}/>
            <Error trigger={errors.price4REQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer le prix4"}   
                    defaultValue={price4.toString()} 
                    keyboardType="decimal-pad"
                    onFocus={e=> resetErrors()}
                    onChangeText={handleTextChange('price4')} 
            />
            
            
           
    
            {/* <Label label="Prix active" />
            <Error trigger={errors.activePriceREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <DropDown 
                data={PRICES.map(p=>({value : p, label :p}))} 
                setSelected={setactivePrice} 
                selected={activePrice}
            /> */}
{/* 
            <Label label="Stock" mga={16}/>
            <Error trigger={errors.stockREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer le stock "}   
                    defaultValue={stock.toString()} 
                    keyboardType="decimal-pad"
                    onFocus={e=> resetErrors()}
                    onChangeText={text=>{
                        let  value = parseFloat(text)
                        if(value == NaN || text.includes('NaN')) value = 0
                        handelChange('stock')(value)
                    }} 
            /> */}
    
        </View>


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
                 <IonIcon name="trash" size={25} color="#fff" />             
            </Button>
             <Button
              xStyle={styles.BtnXstyle} 
              color={"RED"} 
              clickHandler={e=>navigation.goBack()} 
              >
                 <Text style={styles.ButtonText}>Annuler</Text>
            </Button>
        </View>

    </KeyboardAwareScrollView>  
}



export default connect(
    state=>({
       categories : state.categories.categories,
       uploadedProductImageUri : state.products.uploadedProductImageUri,
       done_adding_product:state.products.done_adding_product
    })
    , 
    dispatch=>({
        updateProduct : dispatch.products.updateProduct,
        uploadProductImage: dispatch.products.uploadProductImage,
        addProduct: dispatch.products.addProduct,
        resetIsDone: dispatch.products.resetIsDone,
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
    BtnXstyle:{flex:1,margin:0,borderRadius:12},
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff'
    },
    btns:{flex:1,display:'flex',flexDirection:'row',marginTop:16,marginBottom:16,justifyContent:'space-between'}
 });
