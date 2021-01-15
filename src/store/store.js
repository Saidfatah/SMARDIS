import {init} from '@rematch/core'
import cart from './models/Cart/cart'
import auth from './models/Auth/Auth'

const models={
    cart:cart,
    auth:auth,
}

const store=init({
    models,
})


export default store 
