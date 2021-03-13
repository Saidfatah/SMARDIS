import React,{useState,useEffect,useRef}  from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Item from '../../Common/Item'
import Button from '../../Common/Button'
import { connect } from 'react-redux'
 

const CanceledItem=({navigation,canceledOrder,done_resetting_order,resetOrder,resetIsDone})=> {
    const [canReset, setcanReset] = useState(true)
    let ref = useRef(canceledOrder.id)

    useEffect(() => {
        done_resetting_order == true && setcanReset(true) && resetIsDone("done_resetting_order")
    }, [done_resetting_order])
    
    console.log(ref.current)

    const resetOrderCall=(e)=>{
        setcanReset(false)
        resetOrder({id:canceledOrder.id,navigation}) 
    }
  
    const ResetButton=()=>{
        return <Button
        xStyle={{margin:0,borderRadius:12}} 
        color={"BLUE"} 
        disabled={!canReset}
        noLoading={true}
        clickHandler={resetOrderCall} 
        >
           {
               canReset
               ?<Text style={styles.btnText}>Reainstaller</Text>
               :<Text style={styles.btnText}>Loading</Text>
           }
       </Button>
    }

    return <Item xStyle={{marginBottom:16}}>
        <View style={styles.input}>
            <View style={{display:'flex',flexDirection:'row',flex:1}} >
               <Text style={styles.txt} >{ canceledOrder.client.name }</Text> 
               <Text style={styles.txt}  > {"("+canceledOrder.sector.name+")"}</Text> 
            </View>
 
             <ResetButton />
         </View>
    </Item>
 
}


export default connect(
    state=>({
        done_resetting_order : state.scheduel.done_resetting_order,
    }),
    dispatch =>({
        resetOrder : dispatch.scheduel.resetOrder,
        resetIsDone : dispatch.scheduel.resetIsDone,
    })
)(CanceledItem)

const styles = StyleSheet.create({
    input:{  
      display:'flex', 
      flexDirection:'row-reverse' ,  
      justifyContent:'space-between',
      alignItems:'center', 
      paddingLeft:16 
    },
    btnText:{color:"#fff",textAlign:'center',fontWeight:'bold'},
    txt:{flex:1,fontWeight:'bold',textAlign:'right'}
})