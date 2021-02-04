import {orderModel} from './OrderModel'
import {clientsList} from '../../ClientsAndSectors/Schemas/ClientsList'
import {sectorsList} from '../../ClientsAndSectors/Schemas/SectorsList'

export const ordersList      = []
const order1 = orderModel(1,1,
    {
         sector  : sectorsList[0],
         clients : [clientsList[0],clientsList[1]]
    },
    {name:'ali',id:'some id'}
)
ordersList.push(order1)

const order2 = orderModel(1,2,
    {
         sector : sectorsList[1],
         clients : [clientsList[2],clientsList[3],clientsList[4]]
    },
    {name:'ali',id:'some id'}
)
ordersList.push(order2)

const order3 = orderModel(1,1,
    {
         sector  : sectorsList[2],
         clients : [clientsList[5],clientsList[6],clientsList[7]]
    },
    {name:'ali',id:'some id'}
)
ordersList.push(order3)
