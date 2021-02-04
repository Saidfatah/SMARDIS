//get distrubutors 
//get tasks 
//validate orders 
//send notifcaton to admin 
import {user} from '../Auth/Schemas/User'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'




const FECTH_LIMIT= 10
const model ={
    state:{
        distrubutors  :[],
        distrubutor: null,
        distrubutorsCount  :0,
        fetch_limit :10,
        last_visible : null,
        first_fetch :false
    },
    reducers:{
        fetcheddistrubutors : (state,{distrubutors,last_visible})=>({
            ...state,
            distrubutors :distrubutors,
            distrubutorsCount:distrubutors.length,
            last_visible
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
  
        async fetchDistrubutors(arg,state){
            try {
                //this only gets called once per session 
                const first_fetch = state.distrubutor.first_fetch
                if(first_fetch) return

 
              
                
                const distrubutorsResponse= await firestore()
                                        .collection('users')
                                        .where('type','==','DISTRUBUTOR')

             
                distrubutorsResponse.onSnapshot(res=>{
                    if(res.docs == undefined) return  
                    distrubtors = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                    dispatch.distrubutor.fetcheddistrubutors({
                        distrubutors:distrubtors,
                        last_visible : distrubtors[distrubtors.length-1].name
                    })
                })
                 
            } catch (error) {
                console.log(error)
            }
            
        },
        async fetchMoreDistrubutors(arg,state){
            try {
                return 
                const last_visible = state.distrubutor.last_visible

                const moreDstrubutorsResponse= await firestore()
                                        .collection('users')
                                        .where('type','==','DISTRUBUTOR')
                                        .orderBy('name',"asc")
                                        .startAt(last_visible)
                                        .limit(FECTH_LIMIT)
                                        .get()
                                    
                const docs = moreDstrubutorsResponse.docs

                const PrevDistrubtors =  [...state.distrubutor.distrubutors]
                PrevDistrubtors.pop()
                const newDistrubtors  =  docs.map(doc=>({...doc.data(),id:doc.id}))
               
                dispatch.distrubutor.fetcheddistrubutors({
                    distrubutors : [...PrevDistrubtors,...newDistrubtors],
                    last_visible : newDistrubtors[newDistrubtors.length -1].name
                })              
               
            } catch (error) {
                console.log(error)
            }
            
        },
        incrementFetchLimit(arg,state){
            const fetch_limit = state.distrubutor.fetch_limit + 5
            dispatch.distrubutor.incrementedFetchLimit(fetch_limit)
        },
        async addDistrubutor({name,email,password,phone,city,ref,navigation},state){
            const distrubutors= [...state.distrubutor.distrubutors]
            

            //if we still order by name check if name exists 
            const createAuthResponse= await auth().createUserWithEmailAndPassword(email,password)
            const id=  createAuthResponse.user.uid
            const newDitrubutor = user(
                id ,
                'DISTRUBUTOR',
                name,
                email,
                phone ,
                city,{
                    ref
                },
                null
            )
            const addResponse= firestore().collection('users').add(newDitrubutor)
            
            distrubutors.unshift(newDitrubutor)
            dispatch.toast.show({
                type:'success',
                title:'Ajoute ',
                message:`Vendeur ${name} est ajouter avec success`
            })
            dispatch.distrubutor.addeddistrubutor(distrubutors)
            navigation.navigate('ADMINdistrubutors')
         
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
        }
    })
}
export default model