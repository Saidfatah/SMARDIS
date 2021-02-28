import firestore from '@react-native-firebase/firestore'

export default async (args,state,dispatch)=>{
    try {
    const {user_id,name,city,email,ref,navigation} = args
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
    } catch (error) {
        console.log("-------updateDistrubutor.js-----")
        console.log(error)
    }
}