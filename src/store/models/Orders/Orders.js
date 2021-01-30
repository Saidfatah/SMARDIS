// orders sent by admin
// emploi du temp  
// get clients List for each District (Secteur)
import {orderModel} from './Schemas/OrderModel'
import {ordersList} from './Schemas/OrdersList'


const model ={
    state:{
        orders  :[...ordersList],
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
            todaysSectors :[...todaysSectors],
            todaysSectorsCount :todaysSectors.length,
        }),
        setedNextTurn : (state,todaysSectors)=>({
            ...state,
            todaysSectors :[...todaysSectors],
        }),
    },
    effects: (dispatch)=>({
        fetchTodaysSectors(arg,state){
            const currentDistrubutorId = state.auth.distrubutorId
            let currentDistrubutorOrders = state.order.orders.filter(o => o.distrubutorId == 1  )
            const todaysorders = [...currentDistrubutorOrders].map((o )=>{
                const order= {...o}
                order.distination.clients= order.distination.clients.map((c,i)=>({...c,turn: i==0 , done:false }))
                return order
            })
            dispatch.order.fetchedTodaysSectors(todaysorders)
        },
        fetchOrders(arg,state){
   
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
        setNextTurn({id,clientId},state){
          //here
          let orders =[...state.order.todaysSectors]

          if(orders.length<1) return console.log('no orders')

          const todaysorders = orders.map((o,i)=>{
              const order= o

              if(order.id != id) return order
               
              const orderClients= [...order.distination.clients]
              const lastClient = order.distination.clients.filter(c=>c.id == clientId)[0]
              const lastClientIndex = order.distination.clients.indexOf(lastClient)
              order.distination.clients= orderClients.map((c,i)=>({
                  ...c, 
                  turn : i==lastClientIndex+1 && order.id == id , 
                  done: i <= lastClientIndex 
              }))
              return order
          })

          dispatch.order.setedNextTurn(todaysorders)
        }
    })
}
export default model