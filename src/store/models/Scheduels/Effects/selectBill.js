export default ({id,distrubutor},state,dispatch)=>{
    try {
          let selectedBil =null
          if(distrubutor){
              //calling from distrubutor Interface  
              const valide_orders = [...state.scheduel.valide_orders]
              selectedBil = valide_orders.filter(b=>b.id == id)[0]
              
                 
          }else{
             //calling from admin iterface
             const valide_orders = [...state.scheduel.orders]
             console.log("valide_orders:"+valide_orders.length)
             selectedBil = valide_orders.filter(b=>b.id == id)[0]
             console.log({selectedBil})
          }
          if(selectedBil != null) dispatch.scheduel.selectedABill(selectedBil)
         
    } catch (error) {
        console.log("----selctedbill---")
        console.log(error)
    }
}