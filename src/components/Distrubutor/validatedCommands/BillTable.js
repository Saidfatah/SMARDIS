import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import {View,Text,ScrollView,StyleSheet,Dimensions} from 'react-native'
import { DataTable } from 'react-native-paper';
import {colors} from '../../Common/Colors'
import Pdf from 'react-native-pdf';
import PDF   from 'rn-pdf-generator';
 
const BillTable=({selectedBill})=> {
    const [uri, seturi] = useState("") 
    const {products} = selectedBill

    useEffect(() => {
      let mounted= true 
      console.log('useeffect')
      const HMTL= `<html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
              .container{
                  width:100%;
                  height:100%;
                  display: flex;
                  flex-direction:column;
                  justify-content: center;
              }
              table{
                margin-top:2rem;
                flex:2;
              }
              thead{
               background-color: ${colors.BLUE};
               color:#fff;
              }
              tbody{
               background-color: ${colors.LIGHTGREY};
               color: ${colors.BLACK};
              }
              h1,th,td{text-align:center}
              th,td{padding:.5rem}

              .bill_header{
                padding:1rem;
                flex:1
              }
              .bill_header_title{
                   font-size:5rem;
                   font-weght:bold
              }
              .bill_header_date{
                   font-size:2rem;
              }
              .bill_header_client{
                   font-size:2.5rem;
              }
              .money{
                font-weight:bolder
              }
          </style>
        </head>
        <body>
           <div class="container" >
                <div class="bill_header">
                   <h1 class="bill_header_title" >BON DE COMMANDE <h1/>
                   <h1 class="bill_header_date" >${(selectedBill.date).toLocaleDateString('en-US')} <h1/>
                   <h1 class="bill_header_client" >${selectedBill.client.name} <h1/>
                </div>
                <table   border>
                   <thead >
                        <th>Code</th>
                        <th>Titre</th>
                        <th>Prix unitaire</th>
                        <th>Quantité</th>
                        <th>Montant payes (DH)</th>
                   </thead>
                   <tbody>
                   ${
                     products.map(product=>`
                       <tr>
                             <td> ${product.ref} </td>
                             <td> ${product.name} </td>
                             <td> ${product.price1} </td>
                             <td> ${product.quantity} </td>
                             <td class="money" > ${product.quantity * product.price1}</td>
                       </tr>
                     `)
                    }

                    <tr  >
                       <td colspan="3"  style="height: 20px;border:null;" ></td>
                       <td style="font-weight:bolder" >Total</td>
                       <td  class="money"   >${products.reduce((a,c)=>a+(c.quantity * c.price1),0)}</td>
                   </tr>
                   </tbody>
                </table>
           </div>
        </body>   
      </html>`
      PDF.fromHTML(HMTL,'https://localhost:3000')
      .then((data)=>{
        console.log({data})
        if(mounted) seturi(`data:application/pdf;base64,${data}`)
       })
      .catch(err  => {
        console.log('error->', err)
      })

      return ()=>mounted=false
    }, [ ])

    if(uri === '')
      return <Text>loading ...</Text>

    return (
        <View style={styles.container}>
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
    )
 

}

export default connect(
    state=>({
        selectedBill : state.cart.selectedBill , 
    }),
    null
)(BillTable)

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

// const Header=()=>{
//   return <>
//     <Text style={{fontSize:30,textAlign:'center'}}>
//         Bone de command
//     </Text>
//     <Text style={{fontSize:20,textAlign:'center'}}>
//         {(selectedBill.date).toLocaleDateString('en-US')}
//     </Text>
//     <Text style={{fontSize:20,textAlign:'center'}}>
//         {selectedBill.client.name}
//     </Text>
//   </>
//  }
 //   return <View>
  //     <Header/>
  //     <DataTable >
  //     <View style={{width:800}}>
  //     <ScrollView horizontal={true} style={{backgroundColor:'#333'}} contentContainerStyle={{width:800,display:'flex'}}   >
  //        <View style={{width:'100%'}} >
  //        <DataTable.Header  style={{backgroundColor:colors.PINK,color:'#fff'}}  >
  //          <DataTable.Title  >
  //              <Text style={{color:"#fff"}} >code</Text>
  //           </DataTable.Title>
  //          <DataTable.Title >
  //              <Text style={{color:"#fff"}} >designation</Text>
  //          </DataTable.Title>
  //          <DataTable.Title  numeric>
  //               <Text style={{color:"#fff"}} >QTY</Text>
  //          </DataTable.Title>
  //          <DataTable.Title  numeric>
  //              <Text style={{color:"#fff"}} >Montant</Text>
  //          </DataTable.Title>
  //        </DataTable.Header>
  //        {
  //          products.map((product,index)=><DataTable.Row 
  //          style={{backgroundColor:colors.LIGHTGREY}}  
  //          key={index}>
  //          <DataTable.Cell>{product.ref}</DataTable.Cell>
  //          <DataTable.Cell style={{marginLeft:16}}  >{product.name}</DataTable.Cell>
  //          <DataTable.Cell numeric>{product.quantity}</DataTable.Cell>
  //          <DataTable.Cell numeric>{product.quantity * product.price1}</DataTable.Cell>
  //        </DataTable.Row>)
  //        }

  //       <DataTable.Row style={{backgroundColor:colors.LIGHTGREY,width:'100%'}}   >
  //          <DataTable.Cell> </DataTable.Cell>
  //          <DataTable.Cell style={{marginLeft:16}}  >Total</DataTable.Cell>
  //          <DataTable.Cell numeric>{products.reduce((a,c)=>a+c.quantity,0)}</DataTable.Cell>
  //          <DataTable.Cell numeric>{products.reduce((a,c)=>a+(c.quantity * c.price1),0)}</DataTable.Cell>
  //        </DataTable.Row>
  //        </View>
  //      </ScrollView>
  //     </View>
  //   {/* <DataTable.Pagination
  //     page={1}
  //     numberOfPages={3}
  //     onPageChange={page => {
  //       console.log(page);
  //     }}
  //     label="1-2 of 6"
  //   /> */}
  // </DataTable>
  //   </View>
