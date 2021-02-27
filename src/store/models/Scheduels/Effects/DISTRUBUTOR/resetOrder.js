import firestore from '@react-native-firebase/firestore'

 
 
export default async (args,state,dispatch)=>{
    try {
        const {id,navigation} = args
       const resetOrderReponse = await firestore()
             .collection('orders')
             .doc(id)
             .update({
                 status:'PENDING'
             })
    
      dispatch.scheduel.restedOrder()
      navigation.navigate('DISTRIBUTORDashBoard')
      
   } catch (error) {
       console.log('\n-----resetOrder-----')
       dispatch.scheduel.resitingOrderFailed()
        console.log(error)
    }
}