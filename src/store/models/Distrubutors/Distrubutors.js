


const FECTH_LIMIT= 10
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
  
        async fetchDistrubutors(arg,state){
            try {
                //this only gets called once per session 
                const first_fetch = state.distrubutor.first_fetch
                if(first_fetch) return

                const distrubutorsResponse= await firestore()
                                        .collection('users')
                                        .where('type','==','DISTRUBUTOR')

             
                distrubutorsResponse.onSnapshot(res=>{
                    const docs= res.docs
                    if(docs){
                         const distrubtors = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                         return dispatch.distrubutor.fetcheddistrubutors({
                                              distrubutors:distrubtors,
                                              last_visible : distrubtors[distrubtors.length-1].name
                         })
                    }
                    dispatch.distrubutor.fetchingDistrubutorsFailed()
                })
                 
            } catch (error) {
                console.log("---------distrubutorsFetching---------")
                console.log(error)
                dispatch.distrubutor.fetchingDistrubutorsFailed()
            }   
        },
        async removeDistrubutor({distrubutor,admin,navigation},state){
            try {
                const {user_id,name}=distrubutor
            const distrubutors= [...state.distrubutor.distrubutors]
            const targetDistrubutor = distrubutors.filter(d=>d.user_id == user_id)[0]
            const targetDistrubutorIndex = distrubutors.indexOf(targetDistrubutor)
            distrubutors.splice(targetDistrubutorIndex,1)

            //remove auth account 
            const distrubutorRef=await firestore()
                                       .collection('users')
                                       .where('user_id','==',user_id)
                                       .get()

            distrubutorRef.docs.forEach(doc=>{
                doc.ref.delete()
            })
    
            dispatch.toast.show({
                type:'success',
                title:'Supprision ',
                message:`Vendeur ${name} est supprimer avec success`
            })
            dispatch.distrubutor.removeddistrubutor(distrubutors)
            navigation.navigate('ADMINdistrubutors')
            } catch (error) {
                console.log(error)
            dispatch.distrubutor.removingDistrubutorFailed(distrubutors)

            }
        },
        async updateDistrubutor({user_id,name,city,email,ref,navigation},state){
            const distrubutors= [...state.distrubutor.distrubutors]
            const targetDistrubutor = distrubutors.filter(d=>d.user_id == user_id)[0]
            const targetDistrubutorIndex = distrubutors.indexOf(targetDistrubutor)
            distrubutors[targetDistrubutorIndex]={...targetDistrubutor,name,city,email,ref}
           
            //firestore update 
            const updateResponse= await firestore()
                                       .collection("users")
                                       .where('user_id','==',user_id)
                                       .update({name,city,email,ref});
                                                        
            dispatch.toast.show({
                type:'success',
                title:'Modification ',
                message:`Vendeur ${name} est modifier avec success`
            })
            dispatch.distrubutor.updateddistrubutor(distrubutors)
            navigation.navigate('ADMINdistrubutors')
        },
        resetIsDone(field,state){
            dispatch.distrubutor.reseted(field)
        }
    })
}
export default model