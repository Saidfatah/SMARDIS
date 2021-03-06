import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import {colors} from '../../Common/Colors'
import PDFScreen from '../../Common/PDFScreen'
 
import PDF   from 'rn-pdf-generator';
 

const BillTable=({selectedBill})=> {
    const [uri, seturi] = useState("") 
    
    useEffect(() => {
      let mounted= true 
       console.log('generate pdf now')
       if(!selectedBill) return 
       const {products,sale_date,total} = selectedBill
      
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
                  justify-content: start;
              }
              thead{
               background-color: ${colors.BLUE};
               color:#fff;
              }
              tbody{
               background-color: ${colors.WHITE};
               color: ${colors.BLACK};
              }
              th,td{text-align:center}
              th,td{padding:.5rem}
            
              .bill_header{
                padding:1rem;
                display:flex;
                align-items:center;
                align-items:center
              }
              .bill_header_title{
                   font-size:1.5rem;
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
              .logo{
                width:250;
                margin-right:1rem

              }
          </style>
        </head>
        <body>
           <div class="container" >
                <div class="bill_header">
                    <img class="logo" src="https://firebasestorage.googleapis.com/v0/b/distrubazate.appspot.com/o/SMARDIS.png?alt=media&token=218c7a1f-b9f8-4517-b734-013a4f660971" />
                   <h1 class="bill_header_title" >BON DE COMMANDE : ${selectedBill.client.name}  ${(sale_date).toLocaleDateString('en-US')} <h1/>
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
                             <td> ${product.priceForClient} </td>
                             <td> ${product.quantity} </td>
                             <td class="money" > ${product.quantity * product.priceForClient}</td>
                       </tr>
                     `)
                    }

                    <tr  >
                       <td colspan="3"  style="height: 20px;border:null;" ></td>
                       <td style="font-weight:bolder" >Total</td>
                       <td  class="money"   >${total}</td>
                   </tr>
                   </tbody>
                </table>
           </div>
        </body>   
      </html>`

      PDF.fromHTML(HMTL,'https://localhost:3000')
      .then((data)=>{
        console.log("got pdf")
        if(mounted) seturi(`data:application/pdf;base64,${data}`)
       })
      .catch(err  => {
        console.log('error->', err)
      })

      return ()=>mounted=false
    }, [selectedBill])

    return <PDFScreen uri={uri} />
}

export default connect(
    state=>({
        selectedBill : state.scheduel.selectedBill , 
    }),
    null
)(BillTable)

 
