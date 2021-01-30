import {init} from '@rematch/core'
import cart from './models/Cart/cart'
import client from './models/ClientsAndSectors/Clients'
import order from './models/Orders/Orders'
import products from './models/ProductsAndCategories/Products'
import auth from './models/Auth/Auth'
import toast from './models/Toast/Toast'
import sales from './models/sales/Sales'
import distrubutor from './models/Distrubutors/Distrubutors'

const models={
    cart ,
    client, 
    products, 
    auth ,
    distrubutor ,
    order ,
    toast ,
    sales
}

const store=init({
    models,
})


export default store 
