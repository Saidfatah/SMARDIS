import fetchTodaysOrders from './Effects/DISTRUBUTOR/fetchTodaysOrders'
import fetchOrders from './Effects/ADMIN/fetchOrders'

import fetchScheduels from './Effects/ADMIN/fetchScheduels'
import addScheduel from './Effects/ADMIN/addScheduel'
import updateScheduel from './Effects/ADMIN/updateScheduel'
import removeScheduel from './Effects/ADMIN/removeScheduel'
import exportOrders from './Effects/ADMIN/exportOrders'

import fetchTodaysValideOrders from './Effects/DISTRUBUTOR/fetchTodaysValideOrders'
import fetchDistrubutorTodaysCanceledOrders from './Effects/DISTRUBUTOR/fetchCanceledOrders'
import resetOrder from './Effects/DISTRUBUTOR/resetOrder'
import setNextTurn from './Effects/DISTRUBUTOR/setNextTurn'
import cancelOrder from './Effects/DISTRUBUTOR/cancelOrder'
import selectBill from './Effects/selectBill'
import fetchOrderConfig from './Effects/DISTRUBUTOR/fetchOrderConfig'
 

 

 
  
 
const model ={
    state:{
        //arrays
        scheduels  :[],
        orders     :[],
        todaysSales:[],
        todaysSectors :[], 
        valide_orders :[], 
        distrubutor_todays_canceled_orders :[], 
            
        //counters
        addCounter:0,
        billRefCounter:0,
        scheduelsCount : 0 ,
        ordersCount : 0 ,
        validatedOrdersCount : 0 ,
        todaysSalesCount : 0 ,
        valide_orders_count : 0 ,
        distrubutor_todays_canceled_orders_count : 0 ,
        todaysSectorsCount :0,

        //fetchng booleans
        distrubutor_todays_orders_done_fetching: false ,
        todays_orders_first_fetch:false,

        distrubutor_todays_canceled_orders_done_fetching: false ,
        todays_canceled_orders_first_fetch:false,

        todays_sales_first_fetch:false,
        done_fetching_todays_Sales:false,

        todays_validated_orders_first_fetch:false,
        done_fetching_todays_validated_orders:false,

        todays_orders_first_fetch:false,
        done_fetching_todays_orders:false,

        todays_scheduels_first_fetch:false,
        done_fetching_todays_scheduels:false,

        fetch_orders_first_fetch:false,
        // done_fetching_fetch_orders:false,
        
        done_adding_scheduel:false,


        done_canceling_order:false,
        done_canceling_order:false,
        done_removing_scheduel:false,

        //snapshots refrences 
        todays_orders_ref:null,
        validated_commands_ref:null,
        canceled_commands_ref:null,
        fetch_scheduels_ref:null,

        schedule_add_error:null,
        
        //seclection
        selectedBill : null ,

        //control turns in distrubutors todays orders 
        currentTurn   : null ,
        currentSector : null,
        orderConfig:null,
        currentSectorIndex : 0,
    },
    reducers:{
        //todays sales [ADMIN] screens
        fetchedScheduels : (state,{scheduels,fetch_scheduels_ref})=>({
            ...state,
            scheduels ,
            scheduelsCount: scheduels.length,
            todays_scheduels_first_fetch:true,
            done_fetching_todays_scheduels:true,
            fetch_scheduels_ref
        }),
        scheduelsFetchingFailed : (state,args)=>({
            ...state,
            scheduels :[] ,
            scheduelsCount: 0,
            todays_scheduels_first_fetch:false,
            done_fetching_todays_scheduels:true,
        }),
        fetchedOrders : (state,orders)=>({
            ...state,
            orders ,
            ordersCount: orders.length,
            fetch_orders_first_fetch:true,
            done_fetching_todays_orders:true,
        }),
        ordersFetchingFailed : (state,args)=>({
            ...state,
            orders :[] ,
            ordersCount: 0,
            todays_orders_first_fetch:false,
            done_fetching_todays_orders:true,
        }),
        addedScheduel  : (state,{scheduels,addedOrdersCount})=>({
            ...state,
            addCounter:state.addCounter+1,
            // scheduels ,
            // scheduelsCount : state.scheduelsCount +1,
            // ordersCount : state.ordersCount +addedOrdersCount,
            done_adding_scheduel:true,
            schedule_add_error:null
        }),
        addingScheduelFailed  : (state,{schedule_add_error})=>({
            ...state, 
            done_adding_scheduel:true,
            schedule_add_error
        }),
        updatedScheduel  : (state,scheduels)=>({
            ...state,
            scheduels ,
            done_adding_scheduel:true
        }),
        updatingScheduelFailed  : (state,scheduels)=>({
            ...state, 
            done_adding_scheduel:true
        }),
        removedScheduel  : (state,{scheduels,deletedOrdersCount})=>({
            ...state,
         
         }),
        scheduelRemovingFailed  : (state,args)=>({
            ...state, 
            done_removing_scheduel:true       
        }),
        fetchedTodaysSales : (state,todaysSales)=>({
            ...state,
            todaysSales,
            todaysSalesCount:todaysSales.length,
            done_fetching_todays_Sales : true,
            todays_sales_first_fetch : true,
        }),
        todaysSalesFetchFailed : (state,args)=>({
            ...state,
            todaysSales:[],
            todaysSalesCount:0,
            done_fetching_todays_Sales : true,
            todays_sales_first_fetch : false,
        }),
        
        //used in both [ADMIN,DISTRUBUTOR]$   
        fetchedTodaysValideOrders : (state,{orders,validated_commands_ref})=>({
            ...state,
            valide_orders :orders,
            valide_orders_count :orders.length || 0,
            todays_validated_orders_first_fetch:true,
            done_fetching_todays_validated_orders:true,
            validated_commands_ref
        }),
        fetchTodaysValideOrdersFAILED : (state,orders)=>({
            ...state,
            valide_orders :[],
            valide_orders_count :0,
            todays_validated_orders_first_fetch:false,
            done_fetching_todays_validated_orders:true,
        }),
        //used in [DISTRUBUTOR] screens
        fetchedTodaysSectors : (state,{todaysSectors,todays_orders_ref,todays_orders_first_fetch})=>({
            ...state,
            todaysSectors :[...todaysSectors],
            todaysSectorsCount :todaysSectors.length,
            currentTurn   :todaysSectors[0].orders[0].turn || 0,
            currentSector : todaysSectors[0].sector.id,
            todays_orders_first_fetch,
            currentSectorIndex:0,
            distrubutor_todays_orders_done_fetching:true,
            todays_orders_ref
        }),
        fetchedOrderConfig : (state,{orderConfig})=>({
            ...state,
            orderConfig
        }),
        fetchedTodaysSectorsFailed : (state,todaysSectors)=>({
            ...state,
            todaysSectors :[],
            todaysSectorsCount :0,
            todays_orders_first_fetch:false,
            distrubutor_todays_orders_done_fetching:true,
        }),
        setedNextTurn : (state,{currentSector,currentTurn,currentSectorIndex})=>({
            ...state,
            currentTurn   ,
            currentSector ,
            done_canceling_order:true
        }),
        cancelOrderFailed : (state,args)=>({
            ...state,
            done_canceling_order:true
        }),
        selectedABill : (state,selectedBill)=>({
            ...state,
            selectedBill 
        }),
        removedOrderAfterValidating : (state,{todaysSectors})=>({
            ...state,
            todaysSectors 
        }),
     
        fetchedDistrubutorTodaysCanceledOrders : (state,{orders,canceled_commands_ref})=>({
            ...state,
            distrubutor_todays_canceled_orders :orders,
            distrubutor_todays_canceled_orders_count :orders.length,
            distrubutor_todays_canceled_orders_done_fetching: true ,
            todays_canceled_orders_first_fetch:true,
            canceled_commands_ref
        }),
        distrubutorTodaysCanceledOrdersFetchingFailed : (state,orders)=>({
            ...state,
            distrubutor_todays_canceled_orders :[],
            distrubutor_todays_canceled_orders_count :0,
            distrubutor_todays_canceled_orders_done_fetching: true ,
            todays_canceled_orders_first_fetch:false,
        }),
        restedOrder:  (state,field)=>({
            ...state,
            done_resetting_order:true
        }),
        resitingOrderFailed:  (state,field)=>({
            ...state,
            done_resetting_order:true
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
        resetedError:  (state,field)=>({
            ...state,
            [field]:null
        }),
    },
    effects: (dispatch)=>({
        fetchDistrubutorTodaysCanceledOrders : (args,state)=> fetchDistrubutorTodaysCanceledOrders(args,state,dispatch),
        fetchTodaysValideOrders : (args,state)=> fetchTodaysValideOrders(args,state,dispatch),
        fetchTodaysOrders: (args,state)=> fetchTodaysOrders(args,state,dispatch),
        fetchOrders      : (args,state)=> fetchOrders(args,state,dispatch),
        resetOrder       : (args,state)=> resetOrder(args,state,dispatch),
        selectBill       : (args,state)=> selectBill(args,state,dispatch),
        fetchScheduels   : (args,state)=> fetchScheduels(args,state,dispatch),
        addScheduel      : (args,state)=> addScheduel(args,state,dispatch),
        updateScheduel   : (args,state)=> updateScheduel(args,state,dispatch),
        removeScheduel   : (args,state)=> removeScheduel(args,state,dispatch),
        setNextTurn      : (args,state)=> setNextTurn(args,state,dispatch),
        cancelOrder      : (args,state)=> cancelOrder(args,state,dispatch),
        exportOrders     : (args,state)=> exportOrders(args,state,dispatch),
        fetchOrderConfig : (args,state)=> fetchOrderConfig(args,state,dispatch),
 
        resetIsDone(field,state){  dispatch.scheduel.reseted(field) },
        resetError(field,state){dispatch.scheduel.resetedError(field)},
    })
}
export default model