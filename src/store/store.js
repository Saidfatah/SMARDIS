import {init} from '@rematch/core'
import cart from './models/Cart/cart'
import client from './models/ClientsAndSectors/Clients'
import order from './models/Orders/Orders'
import products from './models/ProductsAndCategories/Products'
import auth from './models/Auth/Auth'
import distrubutor from './models/Distrubutors/Distrubutors'

const models={
    cart        : cart,
    client      : client, 
    products    : products, 
    auth        : auth,
    distrubutor : distrubutor,
    order : order,
}

const store=init({
    models,
})


export default store 
