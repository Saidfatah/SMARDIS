//get distrubutors 
//get tasks 
//validate orders 
//send notifcaton to admin 

const distrubutorList      = []
const distrubutorModel=(name,city,ref)=>({
     id:distrubutorList.length +1,
     ref: ref,
     name,
     city : city || ''
})

const order1 = distrubutorModel('mohssine')
distrubutorList.push(order1)
const order2 = distrubutorModel('adil')
distrubutorList.push(order2)
const order3 = distrubutorModel('redouan')
distrubutorList.push(order3)
const order4 = distrubutorModel('abdessamad')
distrubutorList.push(order4)




const model ={
    state:{
        distrubutors  :[],
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
            distrubutors :[...state.distrubutor.distrubutors,distrubutor],
            distrubutorsCount :state.distrubutor.distrubutorsCount +1
        }),
        updateddistrubutor  : (state,distrubutor)=>({
            ...state,
            distrubutors :[...state.distrubutor.distrubutors].map(d=>d.id == distrubutor.id?distrubutor:d)
        }),
        removeddistrubutor : (state,distrubutor)=>({
            ...state,
            distrubutors :[...state.distrubutor.distrubutors].filter(d=>!d.id ==distrubutor.id ),
            distrubutorsCount :state.distrubutor.distrubutorsCount -1
        })
    },
    effects: (dispatch)=>({
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
                const targetedDistrubutor = state.distrubutor.distrubutors.filter(d=>d.id == id)[0]
                dispatch.distrubutor.updateDistrubutor({...targetedDistrubutor,...updatedFields})
            }
        },
        fetchDistrubutor(id,state){

        },
    })
}
export default model