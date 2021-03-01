import firestore from '@react-native-firebase/firestore'

const CONFIG_DOC="0000CONFIG0000"
export default async (args,state,dispatch)=>{
    try {
         const admins_done_first_fetch = state.auth.admins_done_first_fetch
         if(admins_done_first_fetch) return 

         const adminsResponse =firestore().collection('users')

         adminsResponse.onSnapshot(res=>{
             if(res.docs.length){
                 const maped_data = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                 const users=maped_data.filter(user=> user.id != CONFIG_DOC)
                  if(users.length < 1) return  dispatch.auth.fetchingUsersFailed()
                 return dispatch.auth.fetchedUsers({users})
             }
             dispatch.auth.fetchingUsersFailed()
         })      

    } catch (error) {
        console.log('----fetchWaitingList-----')
        console.log(error)
        dispatch.auth.fetchingUsersFailed()
    }
}