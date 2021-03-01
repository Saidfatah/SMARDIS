import firestore from '@react-native-firebase/firestore'

const CONFIG_DOC="0000CONFIG0000"
export default async (args,state,dispatch)=>{
    try {
         const waitingList_done_first_fetch = state.auth.waitingList_done_first_fetch
         if(waitingList_done_first_fetch) return 

         const waitingListResponse =await firestore()
                                    .collection('users')
                                     
         waitingListResponse.onSnapshot(res=>{
             console.log("waiting list :"+res.docs.lenght)
             if(res.docs.lenght){
                 const maped_data = res.docs.map(doc=>({...doc.data(),id:doc.id}))

                 //make sure we are filtering out the CONFIG DOC
                 const  waitingList = maped_data.filter(ws=>ws.id != CONFIG_DOC && ws.confirmed =="PENDING" )
                 if(waitingList.length<1) return  dispatch.auth.fetchingWaitingListFailed()
                 console.log({waitingList})
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