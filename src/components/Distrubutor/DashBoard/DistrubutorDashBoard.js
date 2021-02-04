import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import TodaysOrders from '../TodaysOrders/TodaysOrders'

const DistrubutorDashBoard=({route,navigation,fetchTodaysSectors,fetchDistrubutorTodaysValideOrders,fetchCategories,fetchProducts})=> {
    useEffect(() => {
        fetchCategories()
        fetchProducts()
        fetchTodaysSectors()
        fetchDistrubutorTodaysValideOrders()
    }, [])

    return  <TodaysOrders {...{navigation,route}} />
   
}


export default connect(
    state=>({
        ordersCount   : state.scheduel.ordersCount,
        distrubutor_todays_valide_orders_count : state.scheduel.distrubutor_todays_valide_orders_count,
    }),
    dispatch =>({
        fetchTodaysSectors : dispatch.scheduel.fetchTodaysSectors,
        fetchDistrubutorTodaysValideOrders : dispatch.scheduel.fetchDistrubutorTodaysValideOrders,
        fetchClients  : dispatch.client.fetchClients,
        fetchSectors  : dispatch.client.fetchSectors,
        fetchClientsCount  : dispatch.client.fetchClientsCount,
        fetchDistrubutors : dispatch.distrubutor.fetchDistrubutors,
        fetchCategories : dispatch.products.fetchCategories,
        fetchProducts   : dispatch.products.fetchProducts,
    })
)(DistrubutorDashBoard)
