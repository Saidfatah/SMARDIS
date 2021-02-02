import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import Error from '../../../Common/Error'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'
import ImagePicker from '../../../Common/ImagePicker'


const ERRORS_INITIAL_CONFIG = {
    nameREQUIRED:false,
    imageREQUIRED:false,
}
const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
export const AddCategory = ({navigation,route,updateCategory,addCategory,uploadedCategoryImageUri,uploadCategoryImage}) => {
     const [modalVisible, setModalVisible] = useState(false);
     const [errors, seterrors] = useState({...ERRORS_INITIAL_CONFIG})
     const [name, setname] = useState("")
     const [image, setimage] = useState("NO_IMAGE")
     const [categoryToBeUpdated, setcategoryToBeUpdated] = useState(-1)
     const [update, setupdate] = useState(false)


    useEffect(() => {
        if(route.params){
            if(route.params.update == undefined) return 
            const {category}=route.params
            const { id }=category
            navigation.setParams({CATEGORY_NAME:category.name})
            setname(category.name)
            setimage(category.image)
            setupdate(true)
            setcategoryToBeUpdated(id)
        } 
    }, [])
    useEffect(() => {
        if(uploadedCategoryImageUri != null) setimage(uploadedCategoryImageUri)
    }, [uploadedCategoryImageUri])

    const resetErrors=()=>seterrors({...ERRORS_INITIAL_CONFIG})
    const validateFields =()=>{
        let errorsCount=0
        let errorsTemp = {...errors}
        if(name == ""){
            errorsTemp.nameREQUIRED =true
            errorsCount++
        }
        if(image == "NO_IMAGE"){
            errorsTemp.imageREQUIRED =true
            errorsCount++
        }

        if(errorsCount >0) {
            seterrors(errorsTemp)
            return false
         }
         return true
    }
    const dispatchAddCategory=()=>{
        if(!validateFields()) return 

        const categoryObj = {name,image}
      
        if(!update) return addCategory({...categoryObj,navigation})
        updateCategory({...categoryObj,id:categoryToBeUpdated,navigation})
    }


    return (
        <KeyboardAwareScrollView   
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} >  
        <View>
            <Label label="Titre"  mga={16} />
            <Error trigger={errors.nameREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <TextInput style={styles.Input}   
                    placeholder={"entrer le titre  du category"}   
                    defaultValue={name} 
                    onFocus={e=> resetErrors()}
                    keyboardType="default"
                    onChangeText={text=> setname(text) } 
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
                model:'CATEGORY',
                imageUploadHandler:uploadCategoryImage,
                name
            }}/>

            
        </View>

        <View style={styles.btns} >
             <Button
              xStyle={{...styles.BtnXstyle,marginRight:16}} 
              color={"BLUE"} 
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
     </KeyboardAwareScrollView>
    )
}
 

export default connect(
    state=>({
        uploadedCategoryImageUri    : state.products.uploadedCategoryImageUri,
    }),
    dispatch=>({
        addCategory    : dispatch.products.addCategory,
        updateCategory : dispatch.products.updateCategory,
        uploadCategoryImage : dispatch.products.uploadCategoryImage,
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
