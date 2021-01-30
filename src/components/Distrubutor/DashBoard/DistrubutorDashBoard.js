import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import TodaysOrders from '../TodaysOrders/TodaysOrders'

const DistrubutorDashBoard=({route, navigation,fetchTodaysSectors,fetchSectors,fetchClientsCount   ,fetchDistrubutors ,fetchOrders ,fetchValidatedOrders ,fetchCategories  ,fetchClients,fetchProducts })=> {
    useEffect(() => {
        fetchClients()
        fetchSectors()
        fetchClientsCount()
        fetchDistrubutors()
        fetchOrders ()
        fetchValidatedOrders()
        fetchCategories()
        fetchProducts()
        fetchTodaysSectors()
    }, [])

    return  <TodaysOrders {...{navigation,route}} />
   
}


export default connect(
    state=>({
        sectorsCount  : state.client.sectorsCount, 
        clientsCount  : state.client.clientsCount,
        salesCount    : state.cart.salesCount,
        ordersCount   : state.order.ordersCount,
        productsCount   : state.products.productsCount,
        categoriesCount : state.products.categoriesCount,
        distrubutorsCount    : state.distrubutor.distrubutorsCount,
        validatedOrdersCount : state.cart.validatedOrdersCount,
    }),
    dispatch =>({
        //fetch products , clients , categories 
        fetchTodaysSectors : dispatch.order.fetchTodaysSectors,
        fetchClients  : dispatch.client.fetchClients,
        fetchSectors  : dispatch.client.fetchSectors,
        fetchClientsCount  : dispatch.client.fetchClientsCount,
        fetchDistrubutors : dispatch.distrubutor.fetchDistrubutors,
        fetchOrders : dispatch.order.fetchOrders,
        fetchValidatedOrders : dispatch.cart.fetchValidatedOrders,
        fetchCategories : dispatch.products.fetchCategories,
        fetchProducts   : dispatch.products.fetchProducts,
    })
)(DistrubutorDashBoard)
