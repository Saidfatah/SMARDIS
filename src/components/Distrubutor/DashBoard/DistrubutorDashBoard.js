import React,{useEffect,useCallback} from 'react'
import {connect} from 'react-redux'
import TodaysOrders from '../TodaysOrders/TodaysOrders'
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler ,Alert} from 'react-native';

const DistrubutorDashBoard=(props)=> {
   const {
    route,
    navigation,
    fetchCartFromAsyncStorage,
    fetchTodaysOrders,
    fetchSectors,
    fetchDistrubutorTodaysCanceledOrders ,
    fetchTodaysValideOrders,
    fetchCategories,
    fetchProducts
    }=props

    useEffect(() => {
        fetchCategories()
        fetchProducts()
        fetchTodaysOrders()
        fetchSectors()
        fetchCartFromAsyncStorage()
        fetchDistrubutorTodaysCanceledOrders()
        fetchTodaysValideOrders("DISTRUBUTOR")
    }, [])
    
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            Alert.alert("Attention!", "Êtes-vous sûr de vouloir quitter?", [
              {
                text: "Annuler",
                onPress: () => null,
                style: "cancel"
              },
              { text: "OUI", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
        
          BackHandler.addEventListener("hardwareBackPress", onBackPress);
        
          return () =>
            BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        
    }, []));
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
        effect1   : dispatch.products.effect1,
        fetchCartFromAsyncStorage   : dispatch.cart.fetchCartFromAsyncStorage,
    })
)(DistrubutorDashBoard)
