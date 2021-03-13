export default ({id,distrubutor},state,dispatch)=>{
    try {
          const valide_orders = [...state.scheduel.valide_orders]
          let selectedBil =null
          if(distrubutor){
              //calling from distrubutor Interface  
              selectedBil = valide_orders.filter(b=>b.id == id)[0]
          }else{
             //calling from admin iterface
             console.log("valide_orders:"+id)
             selectedBil = valide_orders.filter(o=>o.id == id)[0]
             console.log({selectedBil})
          }
          if(selectedBil != null) dispatch.scheduel.selectedABill(selectedBil)
         
    } catch (error) {
        console.log("----selctedbill---")
        console.log(error)
    }
}