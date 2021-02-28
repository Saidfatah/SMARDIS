import firestore from '@react-native-firebase/firestore'


export default async (args,state,dispatch)=>{
    try {
         const waitingList_done_first_fetch = state.auth.waitingList_done_first_fetch
         if(waitingList_done_first_fetch) return 

         const waitingListResponse =firestore()
                                    .collection('users')
                                    .where('confirmed','==','PENDING')

         waitingListResponse.onSnapshot(res=>{
             if(res.docs.lenght){
                 const waitingList = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                 return dispatch.auth.fetchedWaitingList(waitingList)
             }
             dispatch.auth.fetchingWaitingListFailed()
         })      

    } catch (error) {
        console.log('----fetchWaitingList-----')
        console.log(error)
        dispatch.auth.fetchingWaitingListFailed()
    }
}