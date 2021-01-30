//get distrubutors 
//get tasks 
//validate orders 
//send notifcaton to admin 
import {distrubutorModel} from './Schemas/DistrubutorModel'
import {distrubutorList} from './Schemas/DistrubutorsList'





const model ={
    state:{
        distrubutors  :[],
        distrubutor: null,
        distrubutorsCount  :0,
    },
    reducers:{
        fetcheddistrubutors : (state,distrubutors)=>({
            ...state,
            distrubutors :distrubutors,
            distrubutorsCount :distrubutors.length,
        }),
        addeddistrubutor  : (state,distrubutors)=>({
            ...state,
            distrubutors :[...distrubutors],
            distrubutorsCount :state.distrubutorsCount +1
        }),
        updateddistrubutor   : (state,distrubutors)=>({
            ...state,
            distrubutors :[...distrubutors],
        }),
        updateddistrubutorFromAdmin  : (state,distrubutors)=>({
            ...state,
            distrubutors :[...distrubutors],
        }),
        removeddistrubutor : (state,distrubutors)=>({
            ...state,
            distrubutors :[...distrubutors],
            distrubutorsCount :state.distrubutorsCount -1
        })
    },
    effects: (dispatch)=>({
        fetchDistrubutorDocument(arg,state){
            const currentDistrubutorId= state.auth.distrubutorId
            //fetch distrubutor by id from firestore
            dispatch.admin.fetchedAdminDocument({name:'abdellah',id:1})
        },
        fetchDistrubutors(arg,state){
            //here we getdata from firebase 
            //store it in local cache 
            //every 5 days refetch from firebase 
            dispatch.distrubutor.fetcheddistrubutors(distrubutorList)
        },
        addDistrubutor({name,city,ref,navigation},state){
            const distrubutors= [...state.distrubutor.distrubutors]
            const newDitrubutor = distrubutorModel(name ,city,ref)
            distrubutors.unshift(newDitrubutor)
            
            dispatch.toast.show({
                type:'success',
                title:'Ajoute ',
                message:`Vendeur ${name} est ajouter avec success`
            })
            dispatch.distrubutor.addeddistrubutor(distrubutors)
            navigation.navigate('ADMINdistrubutors')
         
        },
        removeDistrubutor({distrubutor,admin,navigation},state){
            const {id,name}=distrubutor
            const distrubutors= [...state.distrubutor.distrubutors]
            const targetDistrubutor = distrubutors.filter(d=>d.id == id)[0]
            const targetDistrubutorIndex = distrubutors.indexOf(targetDistrubutor)
            distrubutors.splice(targetDistrubutorIndex,1)
    
            dispatch.toast.show({
                type:'success',
                title:'Supprision ',
                message:`Vendeur ${name} est supprimer avec success`
            })
            dispatch.distrubutor.removeddistrubutor(distrubutors)
            navigation.navigate('ADMINdistrubutors')
        },
        updateDistrubutor({id,name,city,ref,navigation},state){
            const distrubutors= [...state.distrubutor.distrubutors]
            const targetDistrubutor = distrubutors.filter(d=>d.id == id)[0]
            const targetDistrubutorIndex = distrubutors.indexOf(targetDistrubutor)
            distrubutors[targetDistrubutorIndex]={...targetDistrubutor,name,city,ref}
           
           
            dispatch.toast.show({
                type:'success',
                title:'Modification ',
                message:`Vendeur ${name} est modifier avec success`
            })
            dispatch.distrubutor.updateddistrubutor(distrubutors)
            navigation.navigate('ADMINdistrubutors')
        },
        fetchDistrubutor(id,state){

        },
    })
}
export default model