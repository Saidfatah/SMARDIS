import React,{useState} from 'react'
import {TextInput,StyleSheet,Text} from 'react-native'
import Label from '../../Common/Label'
import Button from '../../Common/Button'
import Error from '../../Common/Error'
import {colors} from '../../Common/Colors'
import { SwipeablePanel } from 'rn-swipeable-panel';
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'



export const SwipeAbleCancelOrder = ({orderId,navigation,isPanelActive,setIsPanelActive,cancelOrder}) => {
    const [note, setnote] = useState("")
    const [noteREQUIRED, setnoteREQUIRED] = useState("")
     console.log({orderId})
    const closePanel = () => {
        setIsPanelActive(false);
      };
    return <SwipeablePanel  
    fullWidth= {true}
    openLarge= {false}
    onlySmall={true}
    showCloseButton= {true}
    onClose= {() => closePanel()}
    onPressCloseButton= {() => closePanel()} 
    isActive={isPanelActive}
    style={{padding:16}}
    >
      <KeyboardAwareScrollView   
    contentContainerStyle={{ flex:1 }}  
    style={styles.container} >
            <Label label="Note " mga={16} />
            <Error trigger={noteREQUIRED} error={"La note est obligatoire"} />
            <TextInput style={styles.Input}   
                    placeholder={"Entrer La justufication d'anulation"}   
                    defaultValue={note} 
                    keyboardType="default"
                    onFocus={e=> setnoteREQUIRED(false)}
                    onChangeText={text=>setnote(text)} 
            /> 

            <Button color="RED"  clickHandler={()=>{
                if(note == "")return  setnoteREQUIRED(true)
                cancelOrder({orderId,note,navigation})
            }} >
              <Text style={{textAlign:'center',color:'#fff'}}  >Confimer L'annulation </Text>
            </Button>
    </KeyboardAwareScrollView>
   </SwipeablePanel>
}



export default SwipeAbleCancelOrder

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
     flex:1
  },
  btns:{flex:1,display:'flex',flexDirection:'row',marginTop:16,marginBottom:16,justifyContent:'space-between'}
});

