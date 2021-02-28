import React,{useState} from 'react'
import {Text,View,StyleSheet,Image} from 'react-native'
import Button from './Button'
import Label from './Label'
import {launchImageLibrary}  from 'react-native-image-picker'
import { connect } from 'react-redux';

 
const ImagePicker=({setImage,title,image})=>{
    const [imageUri, setimageUri] = useState(null)

    const uploadImage =(selectedImage)=>{ 
          const uploadUri = Platform.OS === 'ios' 
          ? selectedImage.replace('file://', '') 
          : selectedImage;
          setimageUri(selectedImage)
 
          setImage(uploadUri)  
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
    
    return <View  >
            <Label label="Image" mga={16} />
            <Button
              xStyle={styles.btnXstyle} 
              color={"WHITE"} 
              clickHandler={e=>{
                  openGallery()
               }} 
              >
                 <Text  style={styles.ButtonText}>{!imageUri?"Ajouter Une Image":"Changer l'image"}</Text>
                 {
                 imageUri || image 
                 ? <Image 
                     source={
                         image
                         ?(image != "NO_IMAGE"
                            ?{uri:image}
                            :require('../../images/noImage.jpg')
                          )
                        :(imageUri != null
                            ?{uri:imageUri}
                            :require('../../images/noImage.jpg')
                         )
                     }  
                     style={{
                         width:40,
                         height:40,
                        }} 
                    />
                 :null
                }

            </Button>
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
  btnXstyle:{
    margin:0,
    borderRadius:12,
    marginRight:16,
    display:"flex",
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    borderColor:"#000",
    borderRadius:12,
    borderWidth:2,
    width:"100%"
  }
 });
