import React from 'react'
import ClientItem from './ClientItem'


export const ClientItems =  ({clients,sector,navigation,currentSectorIndex,currentTurn,currentSector,navigateToRoute})=>{
     return clients.map((sCl,index)=><ClientItem 
      key={index} 
      navigation={navigation} 
      currentSectorIndex={currentSectorIndex}
      currentTurn={currentTurn}
      currentSector={currentSector}
      sector={sector}
      client={sCl} 
      
      />)
}
 

export default  ClientItems 