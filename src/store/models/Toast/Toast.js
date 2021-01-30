


const model ={
    state:{
        config:null
    },
    reducers:{
        toasted : (state,{message,title,type})=>({
            ...state,
            config:{message ,  title , type}
        }),
        toastFailed : (state,arg)=>({
            ...state,
            config:null,
        }),
        toastReseted : (state,arg)=>({
            ...state,
            config:null,
        }),
    },
    effects: (dispatch)=>({
        show({type,title,message,duration},state){
            if(type && title && message)
            {
                return dispatch.toast.toasted({message,title,type}) 
            }
           dispatch.toast.toastFailed()
        },
        reset(args,state){
             console.log('resseting toast')
            return dispatch.toast.toastReseted() 
        },
    })
}
export default model