const model ={
    state:{
        distrubutors  :[],
        distrubutor: null,
        distrubutorsCount  :0,
        fetch_limit :10,
        done_fetching_distrubutors : false,
        distrubutors_first_fetch : false,
        done_removing_distrubutor:false,
        last_visible : null,
        first_fetch :false
    },
    reducers:{
        fetcheddistrubutors : (state,{distrubutors,last_visible})=>({
            ...state,
            distrubutors :distrubutors,
            distrubutorsCount:distrubutors.length,
            done_fetching_distrubutors :true,
            distrubutors_first_fetch :true,
            last_visible
        }),
        fetchingDistrubutorsFailed : (state,args)=>({
            ...state,
            distrubutors :[],
            distrubutorsCount:0,
            done_fetching_distrubutors :true,
            distrubutors_first_fetch :false,
            last_visible :null
        }),
        fetchedMoreDistrubutors : (state,{distrubutors,last_visible})=>({
            ...state,
            distrubutorsCount ,
            last_visible,
            first_fetch:true
        }),
        fetcheddistrubutorsCount : (state,distrubutorsCount)=>({
            ...state,
            distrubutorsCount ,
        }),
        addingDistrubutorFailed  : (state,distrubutors)=>({
            ...state,
            done_adding_distrubutor:true
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
            distrubutorsCount :state.distrubutorsCount -1,
            done_removing_distrubutor:true
        }),
        removingDistrubutorFailed : (state,args)=>({
            ...state,
            done_removing_distrubutor:true
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
    },
    effects: (dispatch)=>({
        fetchDistrubutors     : (args,state)=>fetchDistrubutors(args,state,dispatch),
        removeDistrubutor     : (args,state)=>removeDistrubutor(args,state,dispatch),
        updateDistrubutor     : (args,state)=>updateDistrubutor(args,state,dispatch),
        
        resetIsDone(field,state){
            dispatch.distrubutor.reseted(field)
        }
    })
}
export default model