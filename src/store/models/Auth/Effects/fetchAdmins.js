import firestore from '@react-native-firebase/firestore'


export default async (args,state,dispatch)=>{
    try {
         const admins_done_first_fetch = state.auth.admins_done_first_fetch
         if(admins_done_first_fetch) return 

         const adminsResponse =firestore().collection('users').where('type','==','ADMIN')

         adminsResponse.onSnapshot(res=>{
             if(res.docs.length){
                 const admins = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                 return dispatch.auth.fetchedAdmins(admins)
             }
             dispatch.auth.fetchingAdminsFailed()
         })      

    } catch (error) {
        console.log('----fetchWaitingList-----')
        console.log(error)
        dispatch.auth.fetchingAdminsFailed()
    }
}