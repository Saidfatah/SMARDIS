import React,{useEffect,useState} from 'react'
import {View,Text,ScrollView,StyleSheet,Alert,Dimensions} from 'react-native'
import { connect } from 'react-redux'
import Button from '../../../Common/Button'
import Item from '../../../Common/Item'
import {colors} from '../../../Common/Colors'
import Badge from '../../../Common/Badge'
import Label from '../../../Common/Label'
import IonIcon from 'react-native-vector-icons/Ionicons'
const width = Dimensions.get('screen').width

import {ContributionGraph} from "react-native-chart-kit";

const isLeapYear=(year)=> {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
const days_of_a_year=(year)=> 
{
   return isLeapYear(year) ? 366 : 365;
}


export const DistrubutorPage = ({navigation,route,done_removing_distrubutor,removeDistrubutor}) => {
    const [canRemove, setcanRemove] = useState(true)
    const [commitsData, setcommitsData] = useState([])
    const [last, setlast] = useState(null)
    const {distrubutor} = route.params;
    const {commits} =distrubutor
    
    useEffect(() => {
        done_removing_distrubutor ==true && setcanRemove(true) && resetIsDone("done_removing_distrubutor")
    }, [done_removing_distrubutor])
    useEffect(() => {
        const Lenght=commits.length
        if(Lenght>0){
            let commitsTemp=[...commits.map(c=>({ 
                date:new Date(c.date.toDate()).toISOString().slice('0',10)
            }))]

            //get last order
             const {sector,client,billRef,date }=commits[Lenght -1]
             setlast({
                 sector,
                 client,
                 billRef,
                 date :new Date(date.toDate()).toISOString().slice('0',10)
            })
            

            //group by date
            let lastDate=commitsTemp[0].date
            let i =0
            let arr=[]
            commitsTemp.forEach((commit,index) => {
                const {date}=commit
                if(index ==0){
                    arr.push({count:1,date})
                    lastDate = date
                }
                if(index != 0 && lastDate ==  date){
                    arr[i].count  =arr[i].count+1
                }else if(index != 0 && lastDate !=  date){
                    arr.push({count:1,date})
                    lastDate = date
                    i++
                }
            });

            //     commitsTemp.push({
            //         date:DateToIso,
            //         billRef,
            //         count:number_of_products,
            //         validated,
            //         client,
            //         sector
            //     })
     
       
             setcommitsData([...arr,{count: 0, date: "2021-01-01"}])
        }
        navigation.setParams({DISTRUBUTOR_NAME:distrubutor.name})
    }, [])

  
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color:(opacity)=>`rgba(0, 138, 197,${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
     };

    const {name}=distrubutor
  
    return (
        <ScrollView 
        contentContainerStyle={styles.contentContainer}  
        style={styles.container} >  
           <View   >
                <View style={styles.HFlex} >
                    <Label label="Nom :"  mga={16} />
                    <View style={{...styles.productItem,marginBottom:0,marginLeft:8}}>
                         <Text> {name} </Text>
                    </View>
                </View>
               {
                   last 
                   ?<View>
                        <View style={styles.HFlex} >
                           <Label label="Dernier secteur :"  mga={16} />
                           <View style={{...styles.productItem,marginBottom:0,marginLeft:8}}>
                                <Text> {last.sector } </Text>
                           </View>
                       </View>
                        <View style={styles.HFlex} >
                           <Label label="Dernier client :"  mga={16} />
                           <View style={{...styles.productItem,marginBottom:0,marginLeft:8}}>
                                <Text> {last.client } </Text>
                           </View>
                       </View>
                        <View style={styles.HFlex} >
                           <Label label="Dernier Facteur :"  mga={16} />
                           <View style={{...styles.productItem,marginBottom:0,marginLeft:8}}>
                                <Text> {last.billRef } </Text>
                                <Text> {last.date } </Text>
                           </View>
                       </View>
                   </View>
                   :null
               }

                <Label label="Graph d'activte du vendeur :"  mga={16} />
               <ScrollView horizontal style={{flex:1}} >

               <ContributionGraph
                  values={commitsData}
                  endDate={new Date("2021-12-01")}//here get the current year last day
                  
                  numDays={days_of_a_year(new Date().getFullYear())}//get years number of days
                  onDayPress={e=>console.log(e)}
                  width={width*3}                
                  height={220}
                  squareSize={18}
                  chartConfig={chartConfig}
                />

               </ScrollView>
           </View>
 
           <View style={styles.btns} >
               <Button
                xStyle={{...styles.BtnXstyle}} 
                color={"RED"} 
                disabled={!canRemove}
                clickHandler={e=>{
                    Alert.alert("Suppression!", "Etes-vous sûr que vous voulez supprimer? ", [
                        {
                          text: "Annuler",
                          onPress: () => null,
                          style: "cancel"
                        },
                        { text: "OUI", onPress: () =>{
                            setcanRemove(false)
                            removeDistrubutor({distrubutor,admin:0,navigation})
                        }
                       }
                      ]);
                }} 
                >
                     <Text style={styles.ButtonText}>Supprimer Le vendeur</Text>
                     <IonIcon name="trash" size={25} color="#fff" />
               </Button>
        </View>
    </ScrollView>
    )
}

 

export default connect(
    state=>({
        done_removing_distrubutor:state.distrubutor.done_removing_distrubutor
    }), 
    dispatch =>({
      removeDistrubutor: dispatch.distrubutor.removeDistrubutor,
      resetIsDone: dispatch.distrubutor.resetIsDone,
    })
)(DistrubutorPage)

const styles = StyleSheet.create({
    clientPage:{
        backgroundColor:"#fff",
        padding:8,
        height:"100%"
    },
    productItem: {
        display:'flex',
        flexDirection:'row',
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:12,
        marginRight:8,
        marginBottom:8,
    },
    clientsItemsWrapper: {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    HFlex: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    ButtonText:{
        color:"#fff",
        textAlign:'center',
        fontWeight:'bold'
    },
    BtnXstyle:{
        margin:0,
        borderRadius:12,
        height:50,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-evenly",
        marginBottom:8
    },
    btns:{
        display:'flex',
        marginTop:16,
        justifyContent:'flex-start',
        alignItems:"flex-start"
    },
    contentContainer:{ 
        display:'flex', 
        justifyContent:'space-between', 
        flexGrow:1 
    },
    container:{
        height:'100%',
        padding:8,
        backgroundColor:'#fff',
        display:'flex',
    },
    accordionContentWrrapper: {
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        marginBottom:16,
        borderBottomLeftRadius:12,
        borderBottomRightRadius : 12
    },
    AcordionHeader: {
        padding:8,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:12,
       
    },
    Title: {
        color:colors.BLACK,
        fontWeight:'bold'
    },
})

