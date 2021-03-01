export default (args,state,dispatch)=>{
    try {
       let currentTurn=state.scheduel.currentTurn
       let currentSector=state.scheduel.currentSector
 
       const todaysSectors = [...state.scheduel.todaysSectors]
       const currentSectorObj= todaysSectors.filter(sector=>sector.sector.id == currentSector)[0]
       const currentSectorIndex= todaysSectors.indexOf(currentSectorObj)

       //check if these is a client left in sector 
       if(!currentSectorObj)  return 
       
       const clientLeft = currentSectorObj.orders.filter(order=>order.turn > currentTurn)[0]
       if(clientLeft){
           currentTurn=clientLeft.turn
       }else{
           currentTurn = 0
           //check if sector exists 
           if(todaysSectors.length == currentSectorIndex+1) return 

          currentSector = todaysSectors[currentSectorIndex+1].sector.id
          currentSectorIndex++
       }

       dispatch.scheduel.setedNextTurn({currentSector,currentTurn,currentSectorIndex})
    } catch (error) {
        
        console.log("set next item :")
        console.log(error)
    }
}