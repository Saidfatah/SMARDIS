//get distrubutors 
//get tasks 
//validate orders 
//send notifcaton to admin 

const distrubutorList      = []
const distrubutorModel=(name,city)=>({
     id:distrubutorList.length +1,
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
        distrubutors  :distrubutorList,
    },
    reducers:{
        fetcheddistrubutors : (state,distrubutors)=>({
            ...state,
            distrubutors :distrubutors
        }),
        addeddistrubutor  : (state,distrubutor)=>({
            ...state,
            distrubutors :distrubutor
        }),
        updateddistrubutor  : (state,distrubutor)=>({
            ...state,
            distrubutors :distrubutor
        }),
        removeddistrubutor : (state,distrubutor)=>({
            ...state,
            distrubutors :distrubutor
        })
    },
    effects: (dispatch)=>({
        fetchDistrubutors(arg,state){

        },
        addDistrubutor(arg,state){

        },
        updateDistrubutor(arg,state){

        },
        fetchDistrubutor(arg,state){

        },

    })
}
export default model