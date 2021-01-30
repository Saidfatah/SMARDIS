import {salesList} from './Schemas/SalesList'
import {saleModel} from './Schemas/SaleModel'
import {cartGuests} from '../Cart/Schemas/CartGuests'

const model ={
    state:{
        todaysSales : [] , 
        sales : [] , 
        salesCount : 0 ,
        todaysSalesCount : 0 ,
    },
    reducers:{
        fetchedSales : (state,sales)=>({
            ...state,
            sales :[...sales]
        }),
        fetchedTodaysSales : (state,todaysSales)=>({
            ...state,
            todaysSales : [...todaysSales],
            todaysSalesCount  : todaysSales.length
        }),
        addedSale : (state,sales)=>({
            ...state,
            sales :sales
        }),
    },
    effects: (dispatch)=>({
        fetchTodaysSales(args,state){
            //when validatting cart guest iterate over tha products of that guest here
            //dispatch.sales.fetchedTodaysSales()
             const todaysSales=[...state.sales.todaysSales] 
             cartGuests[0].items.forEach(product=>{
                 const newSale = saleModel(
                   salesList.length+1,
                   cartGuests[0].distrubutor,
                   cartGuests[0].client,
                   product,
                   product.quantity,
                   cartGuests[0].sector
                 )
                 todaysSales.push(newSale)
             })
           console.log(todaysSales[0])
            dispatch.sales.fetchedTodaysSales(todaysSales)

        },
        fetchSales(args,state){

        },
        addSale(args,state){

        }
    })
}
export default model