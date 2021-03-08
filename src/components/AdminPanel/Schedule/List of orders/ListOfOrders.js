import React,{useState,useEffect} from 'react'
import {View,Text,ScrollView,Dimensions,StatusBar,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import OrderItem from './OrderItem'
import { List } from 'react-native-paper';
import Loading from '../../../Common/Loading'
import Button from '../../../Common/Button'
import Label from '../../../Common/Label'
import {colors} from '../../../Common/Colors'
 
import Icon from 'react-native-vector-icons/Ionicons';

const {height}=Dimensions.get('screen')
const HEIGHT = height- StatusBar.currentHeight


export const ListOfOrders = ({navigation,selectBill,orders,done_fetching_todays_orders}) => {

    const validatedOrders = orders.filter(o=>o.status == "VALIDATED")
    const canceledOrders  = orders.filter(o=>o.status == "CANCELED")
    const pendingOrders   = orders.filter(o=>o.status == "PENDING")

    const [currentStatus, setcurrentStatus] = useState("PENDING")
    const [selectedVendeur, setselectedVendeur] = useState(orders[0].distrubutor.id)
    
   
    const TITLE = orders.length >0 ? "les order active" :"ilnya pas de emploi du temps"

    
    if(orders.length<1 && !done_fetching_todays_orders) 
    return <View style={{backgroundColor:'#fff',flex: 1,display:'flex',alignItems:'center'}} >
        <Loading spacing={50} />   
    </View>
    
    const filterCommands=(status)=>{
        console.log(currentStatus == status)
        if(currentStatus == status) return 


        // const filterdData= orders.filter(o=>o.status == status)
        // setfilterdData([...filterdData])
        setcurrentStatus(status)
    }
    const StatusFilter=()=>{
        return <View>
            <Label mgl={8} mgb={0}  mga={8} label="Filtrer par status" />

            <View style={styles.HFlex} >
            <Button 
               color={"GREEN"} 
               clickHandler={()=>filterCommands('VALIDATED')} >
               <View style={{
                    display:'flex',
                    flexDirection:"row"
                }}>
                     <Text>Valider</Text>
                     <Icon 
                       name={currentStatus == "VALIDATED"
                          ?"checkmark-circle"
                          :"checkmark-circle-outline"} 
                       size={20} 
                       color={colors.BLACK} 
                     />
                </View>
            </Button>
            <Button 
               color={"RED"} 
               clickHandler={()=>filterCommands('CANCELED')}  >
              <View style={{
                    display:'flex',
                    flexDirection:"row"
                }} >
                <Text>Annuler</Text>
                 <Icon 
                   name={currentStatus == "CANCELED"
                      ?"checkmark-circle"
                      :"checkmark-circle-outline"} 
                   size={20} 
                   color={colors.BLACK} 
                 />
              </View>
            </Button>
            <Button 
               color={"GOLD"} 
               clickHandler={()=>filterCommands('PENDING')}  >
                <View style={{
                    display:'flex',
                    flexDirection:"row"
                }}>
                     <Text>pas encoure</Text>
                     <Icon 
                       name={currentStatus == "PENDING"
                          ?"checkmark-circle"
                          :"checkmark-circle-outline"} 
                       size={20} 
                       color={colors.BLACK} 
                     />
                </View>
            </Button>
        </View>
        </View>
    }
    const DistrubutorFilter=()=>{
        let distrubtors_Ids=[]
        let distrubutorsList=[]
        orders.forEach(o => {
            if(distrubtors_Ids.indexOf(o.distrubutor.id) <0){
                 distrubtors_Ids.push(o.distrubutor.id)
                 distrubutorsList.push({
                     name:o.distrubutor.name,
                     id:o.distrubutor.id
                    })
            }
        });

        const selectVendeur=(id)=>(e)=>{
            if(selectedVendeur == id) return 
            setselectedVendeur(o.id)
        }

        return <View>
             <Label mgl={8} mgb={0}  mga={8} label="Filtrer par vendeur" />
            <View style={styles.wrap} >
           {
           distrubutorsList.map((o,index)=><Button 
           xStyle={ {
                margin:0,
                padding:4
            }}
            key={index}
            clickHandler={selectVendeur(o.id)} >
            <View style={{
                 display:'flex',
                 flexDirection:"row"
             }}>
                  <Text>{o.name}</Text>
                  <Icon 
                    name={selectedVendeur == o.id
                       ?"checkmark-circle"
                       :"checkmark-circle-outline"} 
                    size={20} 
                    color={colors.BLACK} 
                  />
             </View>
         </Button>)
           }
        </View>
        </View>
    }

    let selectedOrders
    if(currentStatus == "PENDING"){
        selectedOrders =pendingOrders.filter(c=>c.distrubutor.id ==selectedVendeur)
    }
    if(currentStatus == "CANCELED"){
        selectedOrders =canceledOrders.filter(c=>c.distrubutor.id ==selectedVendeur)
    }
    if(currentStatus == "VALIDATED"){
        selectedOrders =validatedOrders.filter(c=>c.distrubutor.id ==selectedVendeur) 
    }
    return (
        <ScrollView  > 
            <View style={{backgroundColor:'#fff',minHeight:HEIGHT, flex:1 ,padding:8}}>
                 <StatusFilter />
                 <DistrubutorFilter />
                 <List.Section title={TITLE}>
                    {selectedOrders.map((item,index)=> <OrderItem 
                    validated={false} 
                    navigation={navigation} 
                    selectBill={selectBill}
                    order={item} 
                    key={index}  
                    />)}
                 </List.Section>
            </View>
        </ScrollView>
    )
}

 

export default connect(
    state=>({
        orders: state.scheduel.orders ,
        done_fetching_todays_orders: state.scheduel.done_fetching_todays_orders ,
    }),
    state=>({
        selectBill: state.scheduel.selectBill 
    }),
)
(ListOfOrders)

const styles = StyleSheet.create({
    HFlex: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        
    },
    wrap: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap'
        
    },
})
