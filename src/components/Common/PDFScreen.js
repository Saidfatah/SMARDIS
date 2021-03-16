import React,{useState} from 'react'
import Pdf from 'react-native-pdf';
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import Loading from './Loading'
 
const WIDTH= Dimensions.get('screen').width
const PDFScreen=({uri})=> {
    const [progress, setprogress] = useState(0)

    if(uri === '')
    return <View style={{
        backgroundColor:'#fff',
        flex: 1,
        display:'flex',
        alignItems:'center'
        }} >
        <Loading spacing={50} />   
    </View>

 
    return (
        <View style={styles.container}>
 
            <Pdf
                enablePaging={true}
                horizontal={true}
                enableAnnotationRendering={true}
                activityIndicator={true}
                source={{uri:uri}}
                onLoadComplete={(numberOfPages,filePath)=>{
                    setprogress(1)
                  
                }}
                onPageChanged={(page,numberOfPages)=>{
                }}
                onLoadProgress={(percentage)=>{
                    setprogress(percentage)
                }}
                onError={(error)=>{
                }}
                style={styles.pdf}
                />
        </View>
    )
}

export default PDFScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#333'
      },
      pdf: {
        backgroundColor:'#333',
        width:WIDTH,
        height:'100%',
    }
  });
  