import React from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import Button from '../../Common/Button'

const  AdminDashBoard=({ navigation })=> {
    const navigateToRoute=(r)=>navigation.navigate(r)

    return <View>
        <Button clickHandler={()=>navigateToRoute('ADMINclients')}>   
            <Text>Clients</Text>
        </Button>
        <Button clickHandler={()=>navigateToRoute('ADMINproducts')}>  
            <Text>Produits</Text>
        </Button>
        <Button clickHandler={()=>navigateToRoute('ADMINsales')}>
            <Text>Vente</Text>            
        </Button>
        <Button clickHandler={()=>navigateToRoute('ADMINschedule')}>  
            <Text>Emploi du temps</Text>            
        </Button>
        <Button clickHandler={()=>navigateToRoute('ADMINcategories')}>
            <Text>Catégories</Text>            
        </Button>
        <Button clickHandler={()=>navigateToRoute('ADMINdistrubutors')}> 
            <Text>Vendeurs</Text>            
        </Button>
        <Button clickHandler={()=>navigateToRoute('ADMINsectors')}>
            <Text>Secteurs</Text>            
        </Button>
        <Button clickHandler={()=>navigateToRoute('ADMINordersValidated')}>
            <Text>Command valider</Text>            
        </Button>
        <Button clickHandler={()=>navigateToRoute('ADMINcatalogue')}>
            <Text>Ajouter Catalogue</Text>            
        </Button>
    </View>
}

export default AdminDashBoard
