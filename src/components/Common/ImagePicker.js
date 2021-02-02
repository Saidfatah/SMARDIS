import React,{useState,useEffect} from 'react'
import {TouchableOpacity,Text,View,StyleSheet,Image} from 'react-native'
import Modal from './Modal'
import {launchImageLibrary,launchCamera}  from 'react-native-image-picker'
import { connect } from 'react-redux';

const ImagePicker=({modalVisible, setModalVisible,imageUploadHandler,productImageUploadState,categoryImageUploadState,name,model})=>{
    const [uploading, setuploading] = useState(false)
    const [imageUri, setimageUri] = useState(null)

    useEffect(() => {
        console.log({categoryImageUploadState})
        if(model ==="PRODUCT" && productImageUploadState === "DONE") 
            setuploading(false)
        if (model === "CATEGORY" && categoryImageUploadState === "DONE" ) 
             setuploading(false)
        
        if(productImageUploadState === "FAILED" || categoryImageUploadState === "FAILED" )
             setuploading(false)
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
    
    if(modalVisible == false) 
         return null
         
    return <Modal 
    title="Image du profil"
    modalVisible={modalVisible} 
    onClose={()=> setuploading(false)}
    setModalVisible={setModalVisible}
    >
         {!uploading ?<ImagePickerButtons />:<View >
            <Text>Uploading</Text> 
            <Image source={{uri:imageUri}}  style={{width:50,height:50}} />
            </View>}
    </Modal>
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
