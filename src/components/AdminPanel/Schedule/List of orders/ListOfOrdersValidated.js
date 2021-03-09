import React,{useState,useEffect} from 'react'
import {View,ScrollView,StyleSheet,Text} from 'react-native'
import { connect } from 'react-redux'
import Error from '../../../Common/Error'
import Button from '../../../Common/Button'
import Loading from '../../../Common/Loading'
import {colors} from '../../../Common/Colors'
import { Table, Row,Cell, TableWrapper } from 'react-native-table-component';

//export excel from here 
import { writeFile,mkdir,exists,ExternalDirectoryPath} from 'react-native-fs';
const make_cols = refstr => Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, (x,i) => XLSX.utils.encode_col(i));
const EDP = ExternalDirectoryPath + "/";
import XLSX from 'xlsx';
const Header= ["1","RéférenceFacetur","Date","RéférenceProduit","RéférenceClient","Déségnation","q.u","p.u"]
const input = res => res;
const output = str => str;

export const ListOfOrdersValidated = ({show,valide_orders,done_fetching_todays_validated_orders}) => {
    const [data, setdata] = useState([ Header ])
    const [ExportError, setExportError] = useState(null)
    const [widthArr, setwidthArr] = useState([90,120,90,90,90,90,90,90])
    const [cols, setcols] = useState(["_",...make_cols("A1:H8")])

    useEffect(() => {
         if(valide_orders.length <0) return 
         let dataTemp = [Header]
         let columnCount=1
         let linesTemp=[]
         valide_orders.forEach((order)=>{
             const { client ,products,billRef,sale_date}=order
             if(!products || products.length <1)return console.log('no orders')
           
             products.forEach((product)=>{
                  columnCount++
                  const {quantity,priceForClient,ref,name} =product

                //   const dateString=sale_date.toLocaleDateString('en-US')
                  const dateString=new Date(2020,5,3).toLocaleDateString('en-US')
                  const dateParts=dateString.split('/').reduce((a,c)=>{
                         let length= c.length
                         const datePart= parseInt(c)
                         let ds
                         if(datePart>9 && length <3){
                             ds = datePart.toString()
                         }else if(datePart<10 && length <3){
                             ds ="0"+datePart.toString()
                         }
                       
                         if(length>3){
                             ds=c.substr(2,2)
                         } 

                      return [...a,ds] 
                  },[]) 
                  const date=dateParts[1]+"/"+dateParts[0]+"/"+dateParts[2]


                  dataTemp.push([columnCount,billRef,date,ref,client.ref,name,quantity,priceForClient ])

                  const line="1;"+billRef.trim()+";"+date+";"+ref.trim()+";"+client.ref.trim()+";\u200E"+name.trim()+"\u200E;"+quantity+";"+priceForClient+";"
                  console.log({date})
                  linesTemp.push(line)
             })
            
        })
        if(dataTemp.length>1){
            console.log(linesTemp[0])
              setdata([...dataTemp])
        }
    }, [valide_orders])
 
    if(valide_orders.length<1 && !done_fetching_todays_validated_orders) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>

    const exportFile =async ()=> {
		try {
        let dataToBeExported=[["Ty","N° pièce","Date","Référence article","Tiers","Quantité","Prix unitaire","Désignation"]]

        valide_orders.forEach((order)=>{
            const { client,products,billRef,sale_date}=order
            if(!products || products.length <1)return console.log('no orders')
          
            //create date
            const dateString=sale_date.toLocaleDateString('en-US')
            const dateParts=dateString.split('/').reduce((a,c)=>{
                   let length= c.length
                   const datePart= parseInt(c)
                   let ds
                   if(datePart>9 && length <3){
                       ds = datePart.toString()
                   }else if(datePart<10 && length <3){
                       ds ="0"+datePart.toString()
                   }
                 
                   if(length>3){
                       ds=c.substr(2,2)
                   } 

                return [...a,ds] 
            },[]) 
            const date=dateParts[1]+"/"+dateParts[0]+"/"+dateParts[2]
            
            products.forEach((p)=>{
                const priceConvertedToComma=p.priceForClient.toString().replace('.',',')
                dataToBeExported.push([
                     1,
                     billRef,
                     date ,
                     p.ref,
                     client.ref,
                     p.quantity,
                     priceConvertedToComma,
                     p.name
                ])
            })
           
        })

       
        const ws = XLSX.utils.aoa_to_sheet(dataToBeExported);
		// build new workbook */
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		// write file  
		const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
		
 

        //#region 
        //EXPORTED fillesfolder
        const    AppFolder      = 'LesExporter';
        const    DirectoryPath  = EDP+AppFolder;
        const DirExists= await exists(DirectoryPath)
        if(!DirExists)  {
            await  mkdir(DirectoryPath);
        }


        //DATE FOLDER
        const newDate=new Date().toLocaleDateString('en','USA').replace("/",'_').replace("/",'_')
        const dateDirectory  =DirectoryPath+"/"+newDate;
        const DirExistsDate= await exists(dateDirectory)
        if(!DirExistsDate)  {
            await  mkdir(dateDirectory);
        } 

        //hour director
        const currentDaTE = new Date()
        const time = currentDaTE.getHours()+"_"+currentDaTE.getMinutes()
        const timeDirectory  =dateDirectory+"/"+time;
        const DirExistsTime= await exists(timeDirectory)
        if(!DirExistsTime)  {
            await  mkdir(timeDirectory);
        }
        //#endregion

 
        
        //export excel
        const file = timeDirectory+"/"+newDate+"__"+time+".xlsx";
	    const excelResponse= await writeFile(file, output(wbout), 'ascii')

        // exportOrders()
        show({
            type:'success',
            title:'Excel exportation ',
            message:`le fichier excel a etais exporter avec success`
        })
        } catch (error) {
            console.log("--------write-------------")
            console.log(error)
            setExportError(error.message)
        }
	};
  
    const ExceVisualization=()=>{
        return<View>
        <Button color="BLUE" clickHandler={exportFile} >
            <Text style={{color:'#fff',textAlign:'center'}} >Exporter L'excel</Text>
        </Button>
        <Error trigger={ExportError!= null} error={ ExportError && ExportError} />
        <ScrollView  showsHorizontalScrollIndicator={false}  horizontal={true}>
	    <View style={{width:11*90+30}} >
            <Table style={styles.table}  borderStyle={{borderWidth: 1, borderColor: colors.LIGHTGREY}}>
                 <TableWrapper>
                     <Row data={cols} style={styles.thead} textStyle={styles.text} widthArr={widthArr}/>
                 </TableWrapper>
                <ScrollView  >
                       {
                          data.map((row,rowIndex)=> (
                            <TableWrapper key={rowIndex} style={{ flexDirection: 'row'}} borderStyle={{borderWidth: 1, borderColor: colors.LIGHTGREY}}>
                              {
                                row.map((cellData, cellIndex) => (
                                  <Cell 
                                  key={cellIndex} 
                                  data={cellData} 
                                  style={{
                                      height:40,
                                      width:cellIndex==1?120:90,
                                      backgroundColor:cellIndex>0
                                      ?(rowIndex>0
                                        ? '#f1f8ff'
                                        : colors.LIGHTBLUE
                                        ) 
                                      :"#fff"
                                     }}
                                  textStyle={{
                                      ...styles.text,
                                      backgroundColor:
                                      cellIndex>0 && rowIndex>0
                                        ? '#f1f8ff'
                                        : colors.LIGHTBLUE
                                    }}/>
                                ))
                              }
                            </TableWrapper>
                          ))  
                       }   
                </ScrollView>
            </Table>
        </View>
        </ScrollView>
   </View> 
    }
    return (
        <ScrollView style={{flex:1,backgroundColor:'#fff'}} contentContainerStyle={{padding:8}}  > 
                 {
                 valide_orders.length>0 
                 ? <ExceVisualization/> 
                 :null 
                 }

        </ScrollView>
    )
}

 

export default connect(
    state=>({
        valide_orders: state.scheduel.valide_orders ,
        done_fetching_todays_validated_orders: state.scheduel.done_fetching_todays_validated_orders ,
    }),
    dispatch=>({
        exportOrders: dispatch.scheduel.exportOrders ,
        show: dispatch.toast.show ,
    })
)
(ListOfOrdersValidated)

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' },
	welcome: { fontSize: 20, textAlign: 'center', margin: 10 },
	instructions: { textAlign: 'center', color: '#333333', marginBottom: 5 },
	thead: { height: 40},
	tr: { height: 40  },
	text: { marginLeft: 5,textAlign:'center' },
	table: { width: "100%" }
})

