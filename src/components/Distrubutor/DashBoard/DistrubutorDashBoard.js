import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import TodaysOrders from '../TodaysOrders/TodaysOrders'

const DistrubutorDashBoard=({route,navigation,fetchTodaysOrders,fetchSectors,fetchDistrubutorTodaysCanceledOrders ,fetchTodaysValideOrders,fetchCategories,fetchProducts})=> {
    useEffect(() => {
        fetchCategories()
        fetchProducts()
        fetchTodaysOrders()
        fetchSectors()
        fetchTodaysValideOrders("DISTRUBUTOR")
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
        fetchTodaysValideOrders : dispatch.scheduel.fetchTodaysValideOrders,
        fetchDistrubutorTodaysCanceledOrders : dispatch.scheduel.fetchDistrubutorTodaysCanceledOrders,
        fetchClients  : dispatch.client.fetchClients,
        fetchSectors  : dispatch.sector.fetchSectors,
        fetchClientsCount  : dispatch.client.fetchClientsCount,
        fetchDistrubutors : dispatch.distrubutor.fetchDistrubutors,
        fetchCategories : dispatch.categories.fetchCategories,
        fetchProducts   : dispatch.products.fetchProducts,
    })
)(DistrubutorDashBoard)
