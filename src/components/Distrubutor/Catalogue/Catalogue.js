import React,{useEffect} from 'react'
import PDFScreen from '../../Common/PDFScreen'
import { Linking,Text,Alert } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

const  Catalogue=()=> {
 
 


  const  openLink=async()=> {
    try {
      console.log('called')
      const url = 'https://www.google.com'
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'my-custom-header': 'my custom header value'
          }
        })
        Alert.alert(JSON.stringify(result))
      }
      else Linking.openURL(url)
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  
    return <PDFScreen uri='https://firebasestorage.googleapis.com/v0/b/distrubazate.appspot.com/o/catalogue%2FRH_StudyGuide_V2.pdf?alt=media&token=4fb18360-9db2-4e17-93e8-211476c90be4' />
}

export default Catalogue
