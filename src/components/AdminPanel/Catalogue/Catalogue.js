import React,{useEffect,useState} from 'react'
import {View,Text,FlatList,StyleSheet,Dimensions} from 'react-native'
import { connect } from 'react-redux'
import Button from '../../Common/Button'
import Loading from '../../Common/Loading'
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';


const  Catalogue=({navigation,userType,done_fetching_catalogue,uploadCatalogue,loadCatalogue,catalogue_url})=> {
    const [uri, seturi] = useState("") 
    //CHECK IF CATALOGUE EXISTS 
    //if so display a button to display it 
    useEffect(() => {
        seturi(catalogue_url)
        loadCatalogue()
    }, [])

    const PickFile=async ()=>{
        try {
          
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log('getting called')
            if(!res.uri)return
            uploadCatalogue(res.uri)
             
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
    }


  
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            {    
                 userType=="ADMIN"
                 ?<Button clickHandler={PickFile} >
                     <Text style={{color:'#fff'}}>Ajouter Un catalogue</Text>
                 </Button>
                 :null    
            }
          {
             catalogue_url == "NOT_UPLOADED" 
             ?( !done_fetching_catalogue
                  ? <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
                       <Loading spacing={50} />   
                   </View>
                   :<Text>aucun Catalogue disponible </Text>
              )
             : <View style={styles.container}>
                   <Pdf
                    enablePaging={true}
                    horizontal={true}
                    enableAnnotationRendering={true}
                    activityIndicator={true}
                    source={{uri:uri}}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
               </View>
            }
        </View>
    )
}

export default connect(
    state=>({
        catalogue_url:state.auth.catalogue_url,
        done_fetching_catalogue:state.auth.done_fetching_catalogue,
        userType : state.auth.userType
    }),
    dispatch=>({
        uploadCatalogue:dispatch.auth.uploadCatalogue,
        loadCatalogue:dispatch.auth.loadCatalogue,
    })
)(Catalogue)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#333'
      },
      pdf: {
        backgroundColor:'#333',
        flex:1,
        width:Dimensions.get('window').width,
        height:'100%'
    }
});
  
  