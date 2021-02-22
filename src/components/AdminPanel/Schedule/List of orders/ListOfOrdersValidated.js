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
const output = str => str;
const EDP = ExternalDirectoryPath + "/";
import XLSX from 'xlsx';
import RNFetchBlob from 'rn-fetch-blob'
const Header= ["1","RéférenceFacetur","Date","RéférenceProduit","RéférenceClient","Déségnation","q.u","p.u"]

import DocumentPicker from 'react-native-document-picker';

async function getPathForFirebaseStorage(uri) {
     const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
}

export const ListOfOrdersValidated = ({show,valide_orders,done_fetching_todays_validated_orders}) => {
    const [data, setdata] = useState([ Header ])
    const [ExportError, setExportError] = useState(null)
    const [widthArr, setwidthArr] = useState([90,120,90,90,90,90,90,90])
    const [cols, setcols] = useState(["_",...make_cols("A1:H8")])

    useEffect(() => {
         if(valide_orders.length <0) return 
         let dataTemp = [Header]
         let columnCount=1
         valide_orders.forEach((order,index1)=>{
             const { distrubutor ,client ,sector,scheduleId ,total ,products,created_at,billRef,status,note,sale_date ,sale_hour}=order
             if(!products || products.length <1)return console.log('no orders')

             products.forEach((product,index2)=>{
                  columnCount++
                  const {quantity,priceForClient,ref,name} =product
                //   distrubutor.name,
                //   distrubutor.ref,
                //   sector.name,
                  dataTemp.push([
                      columnCount,
                      billRef,
                      sale_date.toLocaleDateString('en-US').toString(),
                      ref,
                      client.ref,
                      name,
                      quantity,
                      priceForClient,
                    ])
             })
            
        })
        if(dataTemp.length>1)  setdata([...dataTemp])
    }, [valide_orders])
 
    if(valide_orders.length<1 && !done_fetching_todays_validated_orders) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>

    const exportFile =async ()=> {
		try {
            /* convert AOA back to worksheet */
		const ws = XLSX.utils.aoa_to_sheet(data);

		/* build new workbook */
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

		/* write file */
		const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

        //check if directory exsts 
        //create sub directories for each client 
        //CREATE DIRECTORY 
        const    AppFolder      = 'Excels';
        const    DirectoryPath  = EDP+AppFolder;
      
        const DirExists= await exists(DirectoryPath)
        if(!DirExists)  {
            await  mkdir(DirectoryPath);
        }

        // //WIRTE TO ExternalStorageDirectoryPath 
        const newDate=new Date().toLocaleDateString('en','USA').replace("/",'_').replace("/",'_')

	    // const filetoESDP = DirectoryPath+"/"+newDate+".xlsx";
	    // const writeToExternalStorageResponse= await writeFile(filetoESDP, output(wbout), 'ascii')

	    const filetoEDP = DirectoryPath+"/"+newDate+".xlsx";
	    const writeToExternalDirectoryResponse= await writeFile(filetoEDP, output(wbout), 'ascii')

	    // const filetoDDP = DirectoryPath+"/"+newDate+".xlsx";
	    // const writeToDocumentDirectory = await writeFile(filetoDDP, output(wbout), 'ascii')
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
            <Text style={{color:'#fff',textAlign:'center'}} >Exporter l'Excel</Text>
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
        selectBill: dispatch.scheduel.selectBill ,
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

