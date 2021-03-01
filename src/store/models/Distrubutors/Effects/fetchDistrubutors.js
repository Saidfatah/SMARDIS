import firestore from '@react-native-firebase/firestore'
const FECTH_LIMIT= 10
const CONFIG_DOC="0000CONFIG0000"
export default async (arg,state,dispatch)=>{
    try {
        //this only gets called once per session 
        const first_fetch = state.distrubutor.first_fetch
        if(first_fetch) return

        const distrubutorsResponse= await firestore()
                                .collection('users')
                                .where('type','==','DISTRUBUTOR')
                                .where('confirmed','==','VALIDATED')
     
        distrubutorsResponse.onSnapshot(res=>{
            const docs= res.docs
            if(docs.length){
                 const maped_data  = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                 const distrubtors = maped_data.filter(distrubtor=> distrubtor.id != CONFIG_DOC)
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
}