//get distrubutors 
//get tasks 
//validate orders 
//send notifcaton to admin 

export const distrubutorList      = []
const distrubutorModel=(name,city,ref)=>({
     id:distrubutorList.length +1,
     ref: ref,
     name,
     city : city || ''
})

const distrubutor1 = distrubutorModel('mohssine')
distrubutorList.push(distrubutor1)
const distrubutor2 = distrubutorModel('adil')
distrubutorList.push(distrubutor2)
const distrubutor3 = distrubutorModel('redouan')
distrubutorList.push(distrubutor3)
const distrubutor4 = distrubutorModel('abdessamad')
distrubutorList.push(distrubutor4)




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
        addeddistrubutor  : (state,distrubutor)=>({
            ...state,
            distrubutors :[...state.distrubutors,distrubutor],
            distrubutorsCount :state.distrubutorsCount +1
        }),
        updateddistrubutor   : (state,distrubutor)=>({
            ...state,
            distrubutor :distrubutor ,
        }),
        updateddistrubutorFromAdmin  : (state,distrubutor)=>({
            ...state,
            distrubutors :[...state.distrubutors].map(d=>d.id == distrubutor.id?distrubutor:d)
        }),
        removeddistrubutor : (state,distrubutor)=>({
            ...state,
            distrubutors :[...state.distrubutors].filter(d=>!d.id ==distrubutor.id ),
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
        addDistrubutor({name,city,ref},state){
             if(name && ref && city)
             {
                 const newDitrubutor = distrubutorModel(name ,city,ref)
                 dispatch.distrubutor.addeddistrubutor(newDitrubutor)
             }
        },
        removeDistrubutor(id,state){
             if(id)
             {
                 const targetedDistrubutor = state.distrubutor.distrubutors.filter(d=>d.id == id)[0]
                 dispatch.distrubutor.removeddistrubutor(targetedDistrubutor)
             }
        },
        updateDistrubutor({id,updatedFields},state){
            if(id)
            {
                if(userType=="ADMIN"){
                    const targetedDistrubutor = state.distrubutor.distrubutors.filter(d=>d.id == id)[0]
                    dispatch.distrubutor.updateddistrubutorFromAdmin({...targetedDistrubutor,...updatedFields})
                }else
                {
                    const currentLoggedDistrubutor = state.distrubutor.distrubutor
                    dispatch.distrubutor.updateddistrubutor({...currentLoggedDistrubutor,...updatedFields})
                }
            }
        },
        fetchDistrubutor(id,state){

        },
    })
}
export default model