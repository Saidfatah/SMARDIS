import firestore from '@react-native-firebase/firestore'

export const user=(
    type,
    name,
    email,
    phone,
    city,
    distrubutorAdditional,
    adminAdditional
)=>{
  if(type != "ADMIN" && type != "DISTRUBUTOR" )  throw Error('NO_USER_TYPE_PROVIDED')
  
  let userObj={
      user_id:"Insert auth user id here ",
      type,
      name,
      email,
      city,
      phone:phone || "NOT_DEFINED",
      created_at:firestore.Timestamp.fromDate(new Date())
  } 

  if(type == "ADMIN" && adminAdditional){
    const {isMaster} = adminAdditional
    userObj.isMaster = isMaster
  }

  if(type == "DISTRUBUTOR" && distrubutorAdditional){
    const {ref} = distrubutorAdditional
    userObj.ref = ref
  }

  return userObj
}