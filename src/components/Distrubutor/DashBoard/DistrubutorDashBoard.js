import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import TodaysOrders from '../TodaysOrders/TodaysOrders'

const DistrubutorDashBoard=({route,navigation,fetchTodaysOrders,fetchDistrubutorTodaysCanceledOrders ,fetchDistrubutorTodaysValideOrders,fetchCategories,fetchProducts})=> {
    useEffect(() => {
        fetchCategories()
        fetchProducts()
        fetchTodaysOrders ()
        fetchDistrubutorTodaysValideOrders()
        fetchDistrubutorTodaysCanceledOrders()
    }, [])

    return  <TodaysOrders {...{navigation,route}} />
   
}


export default connect(
    state=>({
        ordersCount   : state.scheduel.ordersCount,
        distrubutor_todays_valide_orders_count : state.scheduel.distrubutor_todays_valide_orders_count,
    }),
    dispatch =>({
        fetchTodaysOrders  : dispatch.scheduel.fetchTodaysOrders ,
        fetchDistrubutorTodaysValideOrders : dispatch.scheduel.fetchDistrubutorTodaysValideOrders,
        fetchDistrubutorTodaysCanceledOrders : dispatch.scheduel.fetchDistrubutorTodaysCanceledOrders,
        fetchClients  : dispatch.client.fetchClients,
        fetchSectors  : dispatch.client.fetchSectors,
        fetchClientsCount  : dispatch.client.fetchClientsCount,
        fetchDistrubutors : dispatch.distrubutor.fetchDistrubutors,
        fetchCategories : dispatch.products.fetchCategories,
        fetchProducts   : dispatch.products.fetchProducts,
    })
)(DistrubutorDashBoard)
