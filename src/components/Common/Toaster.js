import React,{useEffect}  from 'react'
import {connect} from 'react-redux'
import Toast from 'react-native-toast-message';

const  Toaster=({config,reset})=> {
    useEffect(() => {
        if(config){
             try {
                 const {title,message,type} = config
                 Toast && Toast.show({
                  type,
                  position: 'top',
                  text1:title,
                  text2: message,
                  visibilityTime: 4000,
                  autoHide: true,
                  topOffset: 50,
                  onShow: () => {},
                  onHide: () => {reset()},
                });
             } catch (error) {
               
             }
        }
      }, [config != null])
    return  <Toast ref={(ref) => Toast.setRef(ref)} />

}

export default connect(
    state=>({
       config : state.toast.config
    }),
    dispatch =>({
      reset:dispatch.toast.reset
    })
)(Toaster)
