import {user} from '../Schemas/User'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

let   ON_AUTH_STATE_CHANGED_UNSUBSCRIBE = null
export default async (userObj,state,dispatch)=>{
    try {
        //unsubscribe to onAuthStateChanged because otherwise it'll try to take controll as soon as we create userAccount 
        //in Authentication  hence preventing us from creating user doc in users collection 
        const on_state_change_snapshot = state.auth.on_state_change_snapshot
        on_state_change_snapshot && on_state_change_snapshot()
            
        const {type,name,email,phone,additional,password,ACCESS_CODE ,city} = userObj
        
        //validate ACCESS_CODE , get the master admin's access code and check agains it
        const masterAdmin = await firestore()
                           .collection('users')
                           .doc('v6xM6xIb9lOBPczPiyvK')
                           .get()

        //check if name exists
        const checNameResponse = await firestore()
                           .collection('users')
                           .where('name','==',name)
                           .get()

        if(checNameResponse.docs.length ) throw new Error('NAME_USED')

        //create user in authentication 
        const createAuthResponse= await auth().createUserWithEmailAndPassword(email,password)
        const id=  createAuthResponse.user.uid


        //create user doc
        let newUserDoc = null
        if(type =="DISTRUBUTOR") {
            newUserDoc = user(
                id ,
                type,
                name,
                email,
                phone ,
                city,
                additional,
                null
            )
        }else if(type == "ADMIN"){
            newUserDoc = user(
                id ,
                type,
                name,
                email,
                phone ,
                city,
                null,
                additional
            )
        }

        const addResponse= firestore().collection('users').add(newUserDoc)
        
         //pressist state to local storage  
         //so that when we open app next time we don't have to refetch from firestore
         await AsyncStorage.setItem('USER', JSON.stringify(newUserDoc))
         await AsyncStorage.setItem('AUTHENTICATED', JSON.stringify(true))
         await AsyncStorage.setItem('USER_TYPE', newUserDoc.type)
     
        dispatch.addedUser({user:newUserDoc,userType:newUserDoc.type})

        navigation.navigate("WAIT_ROOM") 
    } catch (error) {
        let ERROR_MESSAGE = error.message.toString()
        console.log(error)
       
        if(ERROR_MESSAGE =="NAME_USED" )
        {
           console.log("\name used ") 
           return dispatch.auth.registerFail({id:"NAME_USED",message:'le nom  est déja utuliser'})
        }
        if(ERROR_MESSAGE.indexOf("email-already-exists") > -1 || ERROR_MESSAGE.indexOf("email-already-in-use") > -1 )
        {
           console.log("\nEmail used ") 
           return dispatch.auth.registerFail({id:"EMAIL_USED",message:'Email est déja utuliser'})
        }
        if(ERROR_MESSAGE.indexOf('invalid-email') > -1)
        { 
            console.log("\nemail") 
             return dispatch.auth.registerFail({id:"EMAIL_INVALID",message:'email est pas valide'})
        }
        return dispatch.auth.registerFail({id:"UNKNOWN",message:'somthing went wrong'})
    }
}