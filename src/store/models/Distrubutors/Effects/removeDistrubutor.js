import firestore from '@react-native-firebase/firestore'

export default async (args,state,dispatch)=>{
    try {
    const {distrubutor,admin,navigation}= args
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
}