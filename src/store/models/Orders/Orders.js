// orders sent by admin
// emploi du temp  //get clients List for each District (Secteur)
const ordersList      = []
const orderModel=(adminId,distrubutorId,distination)=>({
    adminId,
    distrubutorId,
    distination: distination || {sector:'1',clientsIds :[1,2,3,5]}
})


const order1 = orderModel(1,1,{
    sector : 1,
    clients : [1,2]
})
ordersList.push(order1)

const order2 = orderModel(1,2,{
    sector : 2,
    clients : [4,3,5]
})
ordersList.push(order2)

const order3 = orderModel(1,1,{
    sector : 3,
    clients : [8,6,7]
})
ordersList.push(order3)



const model ={
    state:{
        orders  :ordersList,
    },
    reducers:{
        fetchedorders : (state,clients)=>({
            ...state,
            orders :orders
        }),
        addedorder  : (state,orders)=>({
            ...state,
            orders :orders
        }),
        updatedorder  : (state,orders)=>({
            ...state,
            orders :orders
        }),
        removedorder  : (state,orders)=>({
            ...state,
            orders :orders
        }),

 
    },
    effects: (dispatch)=>({
        fetchOrders(arg,state){

        },
        addOrder(arg,state){

        },
        updateOrder(arg,state){

        },
        fetchOrder(arg,state){

        },

    })
}
export default model