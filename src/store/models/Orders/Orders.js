// orders sent by admin
// emploi du temp  
// get clients List for each District (Secteur)
import {clientsList,sectorsList} from '../ClientsAndSectors/DcoumentLists'
import {distrubutorList} from '../Distrubutors/Distrubutors'


const ordersList      = []
const orderModel=(adminId,distrubutorId,distination,distrubutor)=>({
     adminId,
     status: "PENDING",
     date:new Date(),
     admin:{name:"abdellah jgnour",id:1},
     distrubutor:distrubutor ||{name:"distrubutor name",id:-1},
     distrubutorId,
     distination: distination || {sector:'1',clientsIds :[1,2,3,5]}
})


const order1 = orderModel(1,1,
    {
         sector  : sectorsList[0],
         clients : [clientsList[0],clientsList[1]]
    },
    distrubutorList[0]
)
ordersList.push(order1)

const order2 = orderModel(1,2,
    {
         sector : sectorsList[1],
         clients : [clientsList[2],clientsList[3],clientsList[4]]
    },
    distrubutorList[1]
)
ordersList.push(order2)

const order3 = orderModel(1,1,
    {
         sector  : sectorsList[2],
         clients : [clientsList[5],clientsList[6],clientsList[7]]
    },
    distrubutorList[0]
)
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
   
            console.log(ordersList[0].distination.clients)
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