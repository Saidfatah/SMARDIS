import React  from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Button from '../../Common/Button'
import Item from '../../Common/Item'
import {connect} from 'react-redux'

export const SaleItem = ({sale,selectBill,navigation}) => {
    const {client,sector,id}= sale
    console.log(id)
    const title=`${client.name} (${sector.name})` 
    return (
        <Item xStyle={styles.xstyle}  >
        <View style={styles.item}>
            <Text style={styles.text} >{title}</Text> 
           
            <Button
             xStyle={{margin:0,borderRadius:12}} 
             color={"BLUE"} 
             clickHandler={e=>{
                selectBill({id,distrubutor:false})
                navigation.navigate('BillTable')
            }} 
             >
                <Text style={{color:"#fff",textAlign:'center',fontWeight:'bold'}}>Afficher</Text>
            </Button>
         </View>
     </Item>
    )
}
export default connect(
    null,
    dispatch =>({
        selectBill : dispatch.scheduel.selectBill,
    })
)(SaleItem)

const styles = StyleSheet.create({
    item:{  
        display:'flex', 
        flexDirection:'row-reverse' ,  
        justifyContent:'space-between',
        alignItems:'center', 
        paddingLeft:16 ,
    },
    xstyle:{  
        marginBottom:16
    },
    text:{flex:1,fontWeight:'bold',textAlign:'right'}
})

