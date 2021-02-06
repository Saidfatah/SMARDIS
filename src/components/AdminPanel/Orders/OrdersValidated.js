import React,{useState} from 'react'
import {  StyleSheet, Text, View, Button, ScrollView, TouchableWithoutFeedback } from 'react-native';
import XLSX from 'xlsx';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import { writeFile, readFile,mkdir,exists, ExternalStorageDirectoryPath,ExternalDirectoryPath,DocumentDirectoryPath } from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
const EDP = ExternalDirectoryPath + "/";
const ESDP = ExternalStorageDirectoryPath + "/";
const DDP = DocumentDirectoryPath + "/";

const make_cols = refstr => Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, (x,i) => XLSX.utils.encode_col(i));
const make_width = refstr => Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, () => 60);
const input = res => res;
const output = str => str;
import Storage from '@react-native-firebase/storage'


const  OrdersValidated=()=> {
     const [data, setdata] = useState([
         ["Ref","designation","P.U","Qu","M.P"],
         ["REF12","3afiya",40.25,2,80.50]
    ])
     const [widthArr, setwidthArr] = useState([100, 100,70, 25,100])
     const [cols, setcols] = useState(make_cols("A1:E4"))
 
    
    const exportFile =async ()=> {
		try {
            /* convert AOA back to worksheet */
		const ws = XLSX.utils.aoa_to_sheet(data);

		/* build new workbook */
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

		/* write file */
		const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
		const filetoEDP = EDP + "excelEDP.xlsx";
		const filetoDDP = DDP + "excelDDP.xlsx";


        //check if directory exsts 
        //create sub directories for each client 
        //CREATE DIRECTORY 
        const    AppFolder      = 'Excels';
        const    DirectoryPath  = ESDP + AppFolder;
        if(!exists(DirectoryPath))  await  mkdir(DirectoryPath);
		const filetoESDP = DirectoryPath+"/" + "excelESDP.xlsx";
       
        // //WIRTE TO ExternalStorageDirectoryPath 
		  const writeToExternalStorageResponse= await writeFile(filetoESDP, output(wbout), 'ascii')
		  const writeToExternalResponse= await writeFile(filetoEDP, output(wbout), 'ascii')
		  const writeToDocumentDirectoryPathResponse= await writeFile(filetoDDP, output(wbout), 'ascii')
     
        } catch (error) {
            console.log(error)
        }
	};
     const importFile=()=> {
		readFile(DDP + "file.xlsx", 'ascii').then((res) => {
            /* parse file */
            const wb = XLSX.read(input(res), {type:'binary'});

            /* convert first worksheet to AOA */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
            console.log({data})
            /* update state */
            setdata(data)
            setcols( make_cols(ws['!ref']))
            setwidthArr(make_width(ws['!ref']))
        }).catch((err) => { 
            console.log("importFile Error", "Error " + err.message); 
        });
	}
    
   
    const PickFile=async ()=>{
        try {
          
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
           
            // const task =  Storage().ref('catalogue/'+ res.name).putFile(res.uri);
           
            // task.on('state_changed', 
            //     sn =>{},
            //     err=>console.log(err),
            //     () => {
            //        console.log('excel uploaded!'+res.name)
            //        Storage()
            //        .ref("catalogue").child(res.name).getDownloadURL()
            //        .then(url => {
            //          console.log('uploaded excel url', url);
            //        }).catch(err=>console.log(err))
            //    }
            // )
            // await task 
             
           
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
    }


    return (
   <View>
 	<Text style={styles.instructions}>Import Data</Text>
	<Button onPress={importFile} title="Import data from a spreadsheet" color="#841584" />
	<Text style={styles.instructions}>Export Data</Text>
	<Button disabled={!data.length} onPress={exportFile} title="Export data to XLSX" color="#841584" />
	<Button disabled={!data.length} onPress={PickFile} title="pick file " color="#841584" />

        <Table style={styles.table}>
           <TableWrapper>
               <Row 
               data={cols} 
               style={styles.thead} 
               textStyle={styles.text} 
               widthArr={widthArr}
               />
           </TableWrapper>
           <TouchableWithoutFeedback>
               <ScrollView vertical={true}>
                   <TableWrapper>
                       <Rows data={data} style={styles.tr} textStyle={styles.text} widthArr={widthArr}/>
                   </TableWrapper>
               </ScrollView>
           </TouchableWithoutFeedback>
        </Table>
   </View>
    )
}

export default OrdersValidated

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' },
	welcome: { fontSize: 20, textAlign: 'center', margin: 10 },
	instructions: { textAlign: 'center', color: '#333333', marginBottom: 5 },
	thead: { height: 40, backgroundColor: '#f1f8ff' },
	tr: { height: 30 },
	text: { marginLeft: 5 },
	table: { width: "100%" }
});
