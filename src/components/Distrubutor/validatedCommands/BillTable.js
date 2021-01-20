import React from 'react'
import { connect } from 'react-redux'
import {View,Text} from 'react-native'
import { DataTable } from 'react-native-paper';
import {colors} from '../../Common/Colors'
 
const BillTable=({selectedBill})=> {
    const {products} = selectedBill
    console.log((selectedBill.date).toLocaleDateString('en-US'))
    return <View>
        <Text style={{fontSize:30,textAlign:'center'}}>
            Bone de command
        </Text>
        <Text style={{fontSize:20,textAlign:'center'}}>
            {(selectedBill.date).toLocaleDateString('en-US')}
        </Text>
        <Text style={{fontSize:20,textAlign:'center'}}>
            {selectedBill.client.name}
        </Text>
     <DataTable >
         <DataTable.Header  style={{backgroundColor:colors.PINK,color:'#fff'}}>
           <DataTable.Title  >
               <Text style={{color:"#fff"}} >code</Text>
            </DataTable.Title>
           <DataTable.Title >
               <Text style={{color:"#fff"}} >designation</Text>
           </DataTable.Title>
           <DataTable.Title  numeric>
                <Text style={{color:"#fff"}} >QTY</Text>
           </DataTable.Title>
           <DataTable.Title  numeric>
               <Text style={{color:"#fff"}} >Montant</Text>
           </DataTable.Title>
         </DataTable.Header>

         {
           products.map((product,index)=><DataTable.Row style={{backgroundColor:colors.LIGHTGREY}}  key={index}>
           <DataTable.Cell>{product.ref}</DataTable.Cell>
           <DataTable.Cell style={{marginLeft:16}}  >{product.name}</DataTable.Cell>
           <DataTable.Cell numeric>{product.quantity}</DataTable.Cell>
           <DataTable.Cell numeric>{product.quantity * product.price1}</DataTable.Cell>
         </DataTable.Row>)
         }

        <DataTable.Row style={{backgroundColor:colors.LIGHTGREY}}   >
           <DataTable.Cell> </DataTable.Cell>
           <DataTable.Cell style={{marginLeft:16}}  >Total</DataTable.Cell>
           <DataTable.Cell numeric>{products.reduce((a,c)=>a+c.quantity,0)}</DataTable.Cell>
           <DataTable.Cell numeric>{products.reduce((a,c)=>a+(c.quantity * c.price1),0)}</DataTable.Cell>
         </DataTable.Row>
    {/* <DataTable.Pagination
      page={1}
      numberOfPages={3}
      onPageChange={page => {
        console.log(page);
      }}
      label="1-2 of 6"
    /> */}
  </DataTable>
    </View>
}

export default connect(
    state=>({
        selectedBill : state.cart.selectedBill , 
    }),
    null
)(BillTable)
