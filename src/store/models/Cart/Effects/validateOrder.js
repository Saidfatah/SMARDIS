import firestore from '@react-native-firebase/firestore'
import deleteCartFromASyncStorage from './deleteCartFromASyncStorage'
const CONFIG_DOC='1 - - CONFIG - -'
export default async (args,state,dispatch)=>{
    try {
        const {navigation} = args
         const cartItems= [...state.cart.cartItems]
         const guest= state.cart.guest
         const sector= state.cart.sector
         if( cartItems.length>0 ){
             const orderId = guest.orderId 
             const client  = guest
             const total   = cartItems.reduce((a,c)=>a+( c.priceForClient * c.quantity ),0) ;
          
          //set next client turn 
          dispatch.scheduel.setNextTurn()
          
          
          //get billref counter from fristore
          // const billRefCounter=await (await firestore().collection('orders').doc('1- - BILL REF COUNTER - -').get()).data().counter
          let billRefCounter 
          const orderConfig =state.scheduel.orderConfig
          if(orderConfig){
            billRefCounter=  orderConfig.counter
          }
         
          //generate billRef with BC000* inital
          const billRefCounterArrayed = (++billRefCounter).toString().split('')
          let   zeros     = new Array(6-billRefCounterArrayed.length).fill("0",0,6-billRefCounterArrayed.length)
          const billRef   = [...zeros,...billRefCounterArrayed].reduce((a,c)=>a+c,"BC")

          //update order doc ["VALIDATED"]
          const validateOrderReponse = await firestore()
           .collection('orders')
           .doc(orderId)
           .update({
                 products:[...cartItems.map(item=>{
                     delete item.orderId
                     delete item.client
                     return item 
                 })],
                 billRef,
                 total,
                 status: "VALIDATED",
                 sale_date : firestore.Timestamp.fromDate(new Date()), 
                 sale_hour : firestore.Timestamp.fromDate(new Date()),
            })
           
          //check if clients has reached their objectif 
          const {objectif,id,name}=client
          const {last_mounth,progress,initial}= objectif
          const currentMount= new Date().getMonth()
          if(currentMount == last_mounth){
             if((progress + total)  >= initial){
               //might wanna do somthing 
            //    dispatch.toast.show({
            //     type:'success',
            //     title:'Objectif   ',
            //     message:`le client ${name} a completer son objectif`
            //    })

             }else{
                  //update clients' objectif progress
                  console.log('update progress')
                  await firestore().collection('clients').doc(id).update({objectif:{
                      initial:initial ,
                      progress: progress + total,
                      last_mounth : new Date().getMonth()
                  }})
             }
          }

          //increment billref counter in fristore , we waited until here to make sure the billRef get incremented
          //only if teh orders validation was successfull
          const increment = firestore.FieldValue.increment(1)
          await firestore().collection('orders').doc(CONFIG_DOC).update({counter:increment})


          //update distrubutor commits 
          const currentDistrubutorId = state.auth.distrubutorId
          const updateCommitsReponse = await firestore()
          .collection('users')
          .doc(currentDistrubutorId)
          .update({
             commits:firestore.FieldValue.arrayUnion({
                 date : firestore.Timestamp.fromDate(new Date()),
                 billRef,
                 number_of_products: cartItems.length,
                 validated:"VALIDATED",
                 client:client.name,
                 sector:sector.name
             })
          })
                      
         

          dispatch.toast.show({
             type:'success',
             title:'Validation ',
             message:`La command  est valider avec success `
          })
         dispatch.cart.validatedGuestOrder()
         deleteCartFromASyncStorage()
         navigation.navigate('DISTRIBUTORDashBoard')
         }
     } catch (error) {
         console.log("validate order cart")
         console.log(error)
         dispatch.cart.validatingGuestOrderFailed()
     }
 }