import React,{useState,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Label from '../../../Common/Label'
import Button from '../../../Common/Button'
import CheckBoxGorup from '../../../Common/CheckBoxGorup'
import DropDown from '../../../Common/DropDown'
import Error from '../../../Common/Error'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import { colors } from '../../../Common/Colors'
import ImagePicker from '../../../Common/ImagePicker'


const ERRORS_INITIAL_CONFIG = {
    nameREQUIRED:false,
    imageREQUIRED:false,
    addERROR:false
}
const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
const CATEGORY_TYPES=[
    {value:"PARENT",label:"category"},
    {value:"SUB",label:"sous category"}
]

export const AddCategory = ({navigation,route,categories,updateCategory,addCategory,resetIsDone,category_add_error,done_adding_category}) => {
     const [errors, seterrors] = useState({...ERRORS_INITIAL_CONFIG})
     const [canSubmit, setcanSubmit] = useState(true)
     const [selectedCategory, setselectedCategory] = useState(categories[0])
     const [type, settype] = useState(CATEGORY_TYPES[0].value)
     const [name, setname] = useState("")
     const [image, setimage] = useState("NO_IMAGE")
     const [categoryToBeUpdated, setcategoryToBeUpdated] = useState(-1)
     const [update, setupdate] = useState(false)

    useEffect(() => {
        done_adding_category == true && setcanSubmit(true) && resetIsDone("done_adding_category")
    }, [done_adding_category])
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
        category_add_error != null && seterrors({...errors,addERROR:true})
    }, [category_add_error])

    const resetErrors=()=>seterrors({...ERRORS_INITIAL_CONFIG})
    const validateFields =()=>{
        let errorsCount=0
        let errorsTemp = {...errors}
        if(name == ""){
            errorsTemp.nameREQUIRED =true
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
        setcanSubmit(false)

        let categoryObj = {name,image,type}
        if(type =="SUB"){
            categoryObj.parent={
                id:selectedCategory.id,
                name:selectedCategory.name
            }
        }
       
        if(!update) return addCategory({...categoryObj,navigation})
        updateCategory({...categoryObj,id:categoryToBeUpdated,navigation})
    }


    return (
        <KeyboardAwareScrollView   
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} >  
        <View>
            <View>
                <Label label="Type"  mga={16} />
                <Error trigger={errors.nameREQUIRED} error={ERRORS_MESSAGES[0].message} />
                <TextInput style={styles.Input}   
                    placeholder={"entrer le titre  du category"}   
                    defaultValue={name} 
                    onFocus={e=> resetErrors()}
                    keyboardType="default"
                    onChangeText={text=> setname(text) } 
                />
            </View>
            <View>
                <CheckBoxGorup 
                   title="Type :" 
                   list={[...CATEGORY_TYPES]} 
                   setSelectedValue={(value)=>settype(value)}
                />
                {
                    type=="SUB"
                    ?<DropDown 
                    data={categories.map(c=>({value : c, label :c.name}))} 
                    keyExtractor={item=>item.name}
                    setSelected={setselectedCategory} 
                    selected={selectedCategory}
                   />
                    :null
                }
            </View>
            

            <ImagePicker {...{
                errors,
                title:'"image de category"',
                setImage:setimage,
            }}/>

            
        </View>
       <Error  trigger={errors.addERROR} error={category_add_error && category_add_error.message} />
        <View style={styles.btns} >
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
     </KeyboardAwareScrollView>
    )
}
 

export default connect(
    state=>({
        done_adding_category    : state.categories.done_adding_category,
        category_add_error    : state.categories.category_add_error,
        categories    : state.categories.categories,
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
