import React,{useState,useEffect} from 'react'
import {TouchableOpacity,Text,View,StyleSheet,Image} from 'react-native'
import Modal from './Modal'
import Error from './Error'
import Button from './Button'
import Label from './Label'
import {launchImageLibrary,launchCamera}  from 'react-native-image-picker'
import { connect } from 'react-redux';

const ERRORS_MESSAGES= [
    {id:'REQUIRED',message:'ce champ est obligatoir'}
]
const ImagePicker=({imageUploadHandler,productImageUploadState,categoryImageUploadState,name,model,errors,seterrors})=>{
    const [uploading, setuploading] = useState(false)
    const [imageUri, setimageUri] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if(model ==="PRODUCT" && productImageUploadState === "DONE"){ 
            setuploading(false)
        }
        if (model === "CATEGORY" && categoryImageUploadState === "DONE" ){ 
             setuploading(false)
        }
        
        if(productImageUploadState === "FAILED" || categoryImageUploadState === "FAILED" ){
             setuploading(false)
        }
    }, [productImageUploadState,categoryImageUploadState])

    const uploadImage =(selectedImage)=>{
          
          const uploadUri = Platform.OS === 'ios' 
          ? selectedImage.replace('file://', '') 
          : selectedImage;
          setimageUri(selectedImage)

          setuploading(true);
          imageUploadHandler({image_uri:uploadUri,name})      
    }
    const addImageToList=r=>{
        if (r.didCancel) {
         return console.log('User cancelled image picker');
        } else if (r.error) {
          return console.log('ImagePicker Error: ', r.error);
        } else if (r.customButton) {
          return  console.log('User tapped custom button: ', r.customButton);
        } 
        console.log(r.uri)
        if(r.uri != null )uploadImage(r.uri)
    }
    const openGallery=e=>{
       
        const options ={
          title: 'Selectioner une image ',
           
           mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        }
        launchImageLibrary(options,addImageToList)
    }
    const openCamera=e=>{
          const options ={noData:true}
          launchCamera(options,addImageToList)
    }

    const ImagePickerButtons=()=>{
        return <View>
            <TouchableOpacity onPress={()=>openGallery()}>
            <View style={styles.btn}>
                 <Text>Ovrire le gallery</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>openCamera()}>
            <View style={styles.btn}>
                 <Text>Ovrire la camera</Text>
            </View>
        </TouchableOpacity>
        </View>
    }
    
 
    return <View>
            <Label label="Image" mga={16} />
            <Error trigger={errors.imageREQUIRED} error={ERRORS_MESSAGES[0].message} />
            <Button
              xStyle={{flex:1,margin:0,borderRadius:12,marginRight:16}} 
              color={"LIGHTGREY"} 
              clickHandler={e=>{
                  if(name == "")return seterrors({...errors,nameREQUIRED:true})
                  setModalVisible(true)
                 
               }} 
              >
                 <Text style={styles.ButtonText}>Ajouter Une Image</Text>
            </Button>
        {
            modalVisible
            ?<Modal 
            title={model=="CATEGORY"?"image de category":"image de produit"}
            modalVisible={modalVisible} 
            onClose={()=> setuploading(false)}
            setModalVisible={setModalVisible}
            >
                 {!uploading ?<ImagePickerButtons />:<View >
                    <Text>Uploading</Text> 
                    <Image source={{uri:imageUri}}  style={{width:50,height:50}} />
                    </View>}
            </Modal>
            :null
        }
   </View>
}

export default connect(
    state=>({
        productImageUploadState  : state.products.productImageUploadState ,
        categoryImageUploadState : state.products.categoryImageUploadState ,
    }),
    null
)(ImagePicker)

var styles = StyleSheet.create({
    btn:{
      padding:16,
      elevation:5,
      borderRadius:12,
      marginBottom:16,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#fff'
  },
 });
