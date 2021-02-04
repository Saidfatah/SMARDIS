import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import {colors} from '../../Common/Colors'
import Loading from '../../Common/Loading'
import Pdf from 'react-native-pdf';
import PDF   from 'rn-pdf-generator';
import firestore from '@react-native-firebase/firestore'

const BillTable=({selectedBill})=> {
    const [uri, seturi] = useState("") 
    const {products,sale_date} = selectedBill

    useEffect(() => {
      let mounted= true 
    
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
                   <h1 class="bill_header_date" >${(sale_date).toLocaleDateString('en-US')} <h1/>
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
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
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
        selectedBill : state.scheduel.selectedBill , 
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

