import {init} from '@rematch/core'
import cart from './models/Cart/cart'

const models={
    cart:cart
}

const store=init({
    models,
})


export default store 
