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
        async fetchTodaysSales(args,state){
            //when validatting cart guest iterate over tha products of that guest here
            //dispatch.sales.fetchedTodaysSales()
            //we go into orders colllection 
            //fetch orders of last week or so 
            //filter only orders with satus == "done"
            //map the results to these fields 
         
            dispatch.sales.fetchedTodaysSales(todaysSales)

        },
        async fetchSales(args,state){

        },
        async addSale(args,state){

        },
        async addSalesList(args,state){
          
        },
    })
}
export default model