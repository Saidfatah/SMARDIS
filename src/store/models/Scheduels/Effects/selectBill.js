export default ({id,distrubutor},state,dispatch)=>{
    try {
          const todaysSales = [...state.scheduel.todaysSales]
          let selectedBil =null
          if(distrubutor){
              //calling from distrubutor Interface  
              selectedBil = todaysSales.filter(b=>b.id == id)[0]
          }else{
              //calling from admin iterface
              selectedBil = todaysSales.filter(o=>o.id == id)[0]
          }
          if(selectedBil != null) dispatch.scheduel.selectedABill(selectedBil)
         
    } catch (error) {
        console.log("----selctedbill---")
        console.log(error)
    }
}