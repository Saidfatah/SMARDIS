import firestore from '@react-native-firebase/firestore'

//we call this after creating a ascheduel to save clients order for
//next scheduel creation 
const CONFIG_DOC="0000CONFIG0000"
export default async (args,state,dispatch)=>{
    try {
          const {clientsOrderd} = args
     
      
          clientsOrderd.forEach(async doc => {
              await firestore()
                    .collection("clients")
                    .doc(doc.id)
                    .update({
                        order_in_sector:doc.order
                    });
          });

    } catch (error) {
        console.log("update client order in sector")
        console.log(error)
    }
 }