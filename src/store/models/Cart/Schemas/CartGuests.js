import {distrubutorList} from '../../Distrubutors/Schemas/DistrubutorsList'
import {sectorsList} from '../../ClientsAndSectors/Schemas/SectorsList'
import {productsList} from '../../ProductsAndCategories/Schemas/productsList'
import {clientsList} from '../../ClientsAndSectors/Schemas/ClientsList'
import {cartGuestModel} from './CartGuestModel'

export const cartGuests = []

const guest1 = cartGuestModel(
    cartGuests.length+1,
    clientsList[0].name,
    clientsList[0].id,
    [productsList[0],productsList[1]].map(p=>({...p,quantity:2})),
    distrubutorList[0],
    sectorsList[0],
    clientsList[0]
)
cartGuests.push(guest1)
