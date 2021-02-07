import {init} from '@rematch/core'
import cart from './models/Cart/cart'
import client from './models/Clients/Clients'
import sector from './models/Sectors/Sectors'
import scheduel from './models/Scheduels/Scheduels'
import products from './models/Products'
import auth from './models/Auth/Auth'
import toast from './models/Toast/Toast'
import sales from './models/sales/Sales'
import distrubutor from './models/Distrubutors/Distrubutors'

const models={
    cart ,
    client, 
    products, 
    sector,
    auth ,
    distrubutor ,
    scheduel ,
    toast ,
    sales
}

const store=init({
    models,
})


export default store 
