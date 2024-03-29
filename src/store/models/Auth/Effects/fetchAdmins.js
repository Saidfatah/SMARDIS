import firestore from '@react-native-firebase/firestore'

const CONFIG_DOC="0000CONFIG0000"
export default async (args,state,dispatch)=>{
    try {
         const admins_done_first_fetch = state.auth.admins_done_first_fetch
         if(admins_done_first_fetch) return 

         const adminsResponse =firestore().collection('users').where('type','==','ADMIN')

         adminsResponse.onSnapshot(res=>{
             if(res.docs.length){
                 const maped_data = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                 const admins=maped_data.filter(admin=> admin.id != CONFIG_DOC)
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