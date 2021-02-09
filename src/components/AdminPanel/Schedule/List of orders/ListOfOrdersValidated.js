import React,{useState,useEffect} from 'react'
import {View,ScrollView,StyleSheet,Text} from 'react-native'
import { connect } from 'react-redux'
import OrderItem from './OrderItem'
import Loading from '../../../Common/Loading'
import Button from '../../../Common/Button'
import { List } from 'react-native-paper';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import { writeFile, readFile,mkdir,exists, ExternalStorageDirectoryPath } from 'react-native-fs';
const make_cols = refstr => Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, (x,i) => XLSX.utils.encode_col(i));
const make_width = refstr => Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, () => 60);
const input = res => res;
const output = str => str;
const ESDP = ExternalStorageDirectoryPath + "/";
import XLSX from 'xlsx';

//export excel from here 

export const ListOfOrdersValidated = ({navigation,selectBill,valide_orders,done_fetching_todays_validated_orders}) => {
    const [data, setdata] = useState([
        ["1","RFP","Q","P.U","Des","RFF","D","RFC","v","RFV","S"],
       
    ])
    const [widthArr, setwidthArr] = useState([90,90,90,90,90,90,90,90,90,90,90])
    const [cols, setcols] = useState(["_",...make_cols("A1:I10")])

    useEffect(() => {
        //generate cols and rows 
        //bilref , client,total,note,saledate,saleçhour,status,distrubutor
       
         if(valide_orders.length <0) return 
         let dataTemp = [
             ["1","RFP","Q","P.U","DES","RFF","D","RFC","v","RFV","S"],
         ]
         valide_orders.forEach((order,index1)=>{
             const { distrubutor ,client ,sector,scheduleId,turn ,total ,products,created_at,billRef,status,note,sale_date ,sale_hour}=order
             console.log(client)
             if(!products || products.length <1)return console.log('no orders')

             products.forEach((product,index2)=>{
                  const {quantity,price1,ref,name} =product
                  dataTemp.push([
                      index2+2,
                      ref,
                      quantity,
                      price1,
                      name,
                      billRef,
                      sale_date.toLocaleDateString('en-US').toString(),
                      client.ref,
                      distrubutor.name,
                      distrubutor.ref,
                      sector.name
                    ])
             })
            
        })
        if(dataTemp.length>1)  setdata([...dataTemp])
    }, [valide_orders])
 
    if(valide_orders.length<1 && !done_fetching_todays_validated_orders) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>
    const TITLE = valide_orders.length >0 ? "les command valider" :"pas de command valider"

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
        const    DirectoryPath  = ESDP+AppFolder;
      
        const DirExists= await exists(DirectoryPath)
        if(!DirExists)  {
            await  mkdir(DirectoryPath);
        }

        // //WIRTE TO ExternalStorageDirectoryPath 
	    const filetoESDP = DirectoryPath+"/"+billRef+".xlsx";
	    const writeToExternalStorageResponse= await writeFile(filetoESDP, output(wbout), 'ascii')
 
        } catch (error) {
            console.log("--------write-------------")
            console.log(error)
        }
	};
    const importFile=()=> {
		readFile(ESDP +"/Excels"+ billRef+".xlsx", 'ascii').then((res) => {
            /* parse file */
            const wb = XLSX.read(input(res), {type:'binary'});

            /* convert first worksheet to AOA */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
          
            /* update state */
            setdata(data)
            setcols( make_cols(ws['!ref']))
            setwidthArr(make_width(ws['!ref']))
        }).catch((err) => { 
            console.log("importFile Error", "Error " + err.message); 
        });
	}

    const ExceVisualization=()=>{
        return<View>
        <Button color="BLUE" clickHandler={exportFile} >
            <Text style={{color:'#fff',textAlign:'center'}} >Exporter l'Excel</Text>
        </Button>
        <ScrollView  showsHorizontalScrollIndicator={false}  horizontal={true}>
	    <View style={{width:900}} >
            <Table style={styles.table}>
                 <TableWrapper>
                     <Row 
                     data={cols} 
                     style={styles.thead} 
                     textStyle={styles.text} 
                     widthArr={widthArr}
                     />
                 </TableWrapper>
                     <ScrollView  >
                      
                         <TableWrapper>
                                  <Rows  data={data}  style={styles.tr} textStyle={styles.text} widthArr={widthArr}/>
                         </TableWrapper>
                     </ScrollView>
            </Table>
        </View>
        </ScrollView>
   </View> 
    }
    return (
        <ScrollView style={{flex:1,backgroundColor:'#fff'}} contentContainerStyle={{padding:8}}  > 
                 <ExceVisualization/>
                 <List.Section title={TITLE}>
                    {
                    valide_orders.map((item,index)=>{
                        return <OrderItem 
                        order={item} 
                        validated={true} 
                        navigation={navigation} 
                        selectBill={selectBill}
                        key={index}  
                        />
                    })
                    }
                 </List.Section>
        </ScrollView>
    )
}

 

export default connect(
    state=>({
        valide_orders: state.scheduel.valide_orders ,
        done_fetching_todays_validated_orders: state.scheduel.done_fetching_todays_validated_orders ,
    }),
    state=>({
        selectBill: state.scheduel.selectBill 
    }),
)
(ListOfOrdersValidated)

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' },
	welcome: { fontSize: 20, textAlign: 'center', margin: 10 },
	instructions: { textAlign: 'center', color: '#333333', marginBottom: 5 },
	thead: { height: 40, backgroundColor: '#f1f8ff' },
	tr: { height: 30 ,width:800,backgroundColor:"#fff" },
	text: { marginLeft: 5 },
	table: { width: "100%" }
})

