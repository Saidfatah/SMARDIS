// orders sent by admin
// emploi du temp  
//get clients List for each District (Secteur)
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
        orders  :[],
        ordersCount : 0 ,
        todaysSectors :[], 
        todaysSectorsCount :0, //to display in distrubutor's dashboard

    },
    reducers:{
        fetchedorders : (state,orders)=>({
            ...state,
            orders :orders,
            ordersCount: orders.length
        }),
        addedorder  : (state,order)=>({
            ...state,
            orders :[...state.orders].push(order),
            ordersCount : state.ordersCount +1
        }),
        updatedorder  : (state,order)=>({
            ...state,
            orders :[...state.orders].map(o=>o.id == order.id?order : o)
        }),
        removedorder  : (state,orders)=>({
            ...state,
            orders :[...state.orders].filter(o=>!o.id == order.id),
            ordersCount : state.ordersCount -1
        }),
        fetchedTodaysSectors : (state,todaysSectors)=>({
            ...state,
            todaysSectors :todaysSectors,
            todaysSectorsCount :todaysSectors.length,
        }),
    },
    effects: (dispatch)=>({
        fetchTodaysSectors(arg,state){
            const currentDistrubutorId = state.auth.distrubutorId
            const currentDistrubutorOrders = state.order.orders.filter(o => o.distrubutorId == currentDistrubutorId  )
            dispatch.order.fetchedTodaysSectors(currentDistrubutorOrders)
        },
        fetchOrders(arg,state){
            console.log('fetching orders')
            console.log(ordersList)
             dispatch.order.fetchedorders(ordersList)
        },
        addOrder({adminId,distrubutorId,distination},state){
           if(adminId && distrubutorId && distination.clients && distination.sector ){
            console.log('putting new schedule order')  
            const newOrder = orderModel(adminId,distrubutorId,distination)
                dispatch.order.addedorder(newOrder)
            }
        },
        
        updateOrder({id,updatedFields},state){
            if(id && updatedFields){
                const targetOrder = state.order.orders.filter(o=>o.id == id)[0]
                dispatch.order.updatedorder({...targetOrder,...updatedFields})
            }
        },
        fetchOrder(arg,state){
              //no use case yet 
        },

    })
}
export default model