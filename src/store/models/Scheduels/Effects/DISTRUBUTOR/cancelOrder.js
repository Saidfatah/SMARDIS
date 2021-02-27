export default  async (args,state,dispatch)=>{
    try {
        const {orderId,note,navigation}=args
        console.log({orderId,note})
        const validateOrderReponse = await firestore()
                                          .collection('orders')
                                          .doc(orderId)
                                          .update({
                                                note,
                                                status: "CANCELED",
                                           })
     
        dispatch.scheduel.setNextTurn()
        navigation.goBack()
     } catch (error) {
         console.log("set next item :")
         console.log(error)
         dispatch.scheduel.cancelOrderFailed()
     }
}