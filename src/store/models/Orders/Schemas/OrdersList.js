import {orderModel} from './OrderModel'
import {distrubutorList} from '../../Distrubutors/Schemas/DistrubutorsList'
import {clientsList} from '../../ClientsAndSectors/Schemas/ClientsList'
import {sectorsList} from '../../ClientsAndSectors/Schemas/SectorsList'

export const ordersList      = []
const order1 = orderModel(1,1,
    {
         sector  : sectorsList[0],
         clients : [clientsList[0],clientsList[1]]
    },
    distrubutorList[0]
)
ordersList.push(order1)

const order2 = orderModel(1,2,
    {
         sector : sectorsList[1],
         clients : [clientsList[2],clientsList[3],clientsList[4]]
    },
    distrubutorList[1]
)
ordersList.push(order2)

const order3 = orderModel(1,1,
    {
         sector  : sectorsList[2],
         clients : [clientsList[5],clientsList[6],clientsList[7]]
    },
    distrubutorList[0]
)
ordersList.push(order3)
