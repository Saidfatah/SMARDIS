import firestore from '@react-native-firebase/firestore'

export const user=( user_id,type,name,email,phone,city,distrubutorAdditional,adminAdditional)=>{
 
  if(type != "ADMIN" && type != "DISTRUBUTOR" )  throw Error('NO_USER_TYPE_PROVIDED')
  
  let userObj={
      user_id ,
      type,
      name,
      email,
      city,
      confirmed:"PENDING",//PENNDING || APPROVED
      phone:phone || "NOT_DEFINED",
      created_at:firestore.Timestamp.fromDate(new Date())
  } 

  if(type == "ADMIN"  ){
    userObj.isMaster = false
  }

  if(type == "DISTRUBUTOR" ){
    userObj.ref = user_id.substring(0,5)+name.toUpperCase().substring(0,2)
    
  }

  return userObj
}