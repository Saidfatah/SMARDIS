import {user} from './Schemas/User'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

const userTypes= ['ADMIN','DISTRIBUTOR']
const model ={
    state:{
        authenticated  : false,
        waitingList    : [],
        admins         : [],
        userType       : userTypes[1],
        adminId        : 1,
        distrubutorId  : 1,
        user           : null ,
        savePassword   : false,
        savedPassword  : null,
        waitingList_count : 0,
        admins_count      : 0,
        done_Logging    : false,
        done_first_Logging           : false,
        done_first_register          : false,
        waitingList_done_first_fetch : false,
        admins_done_first_fetch      : false,
        authError      : null , 
        registerError  : null , 
    },
    reducers:{
        checkedAuthentication : (state,{authenticated,user,userType,savePassword,savedPassword})=>({
          ...state,
          authenticated ,
          user,
          userType,
          savePassword  ,
          savedPassword  ,
          distrubutorId:user?user.id:null,
          adminId :user ?user.id:null
        }),
        loginFailed:  (state,authError)=>({
            ...state,
            authError :authError
        }),
        loginSuccess:  (state,{user,userType})=>({
            ...state,
            user,
            userType,
            authenticated:true,
            distrubutorId:user.id,
            adminId:user.id,
            done_first_Logging :true,
            done_Logging:true
        }),
        logedOut:  (state,args)=>({
            ...state,
            user:null,
            userType:null,
            authenticated:false,
            distrubutorId:null,
            adminId:null,
        }),
        registerSuccess:  (state,{user,userType})=>({
            ...state,
            user,
            userType,
            authenticated:true,
            distrubutorId:user.id,
            adminId:user.id,
            done_first_register:true
        }),
        registerFail:  (state,registerError)=>({
            ...state,
            registerError
        }),
        fetchedAdmins:  (state,admins)=>({
            ...state,
            admins:[...admins],
            admins_count:admins.length,
            admins_done_first_fetch :true
        }),
        fetchedWaitingList:  (state,waitingList)=>({
            ...state,
            waitingList:[...waitingList],
            waitingList_count:waitingList.length,
            waitingList_done_first_fetch :true
        }),
        approvedUser:  (state,waitingList)=>({
            ...state,
            waitingList_count:state.waitingList_count -1 ,
        }),
        rejectedUser:  (state,waitingList)=>({
            ...state,
            waitingList_count:state.waitingList_count -1 ,
        }),
    },
    effects: (dispatch)=>({
        async checkAuthetication({navigation},state){
            try {
                auth().onAuthStateChanged(async user=>{
                    const done_first_Logging = state.auth.done_first_Logging
                    if(done_first_Logging) return console.log('first logging')

                    let savePassword  = await AsyncStorage.getItem('SAVE_PASSWORD')
                    savePassword = JSON.stringify(savePassword)
                    const savedPassword  = await AsyncStorage.getItem('PASSWORD')
                    if(user){      
                         //get user doc from async storage
                         const userjsonValue = await AsyncStorage.getItem('USER')
                         const userDoc = userjsonValue != null ? JSON.parse(userjsonValue) : null
                         const userType      = await AsyncStorage.getItem('USER_TYPE')
                       console.log({userDoc,user})
                         dispatch.auth.checkedAuthentication({
                             authenticated:true,
                             user:userDoc,
                             userType ,
                             savePassword  ,
                             savedPassword  ,
                         })

                         //check if user in approved by admin 
                         if(userDoc != undefined && userDoc.confirmed =="PENDING") return navigation.navigate("WAIT_ROOM") 
                         //redirect logged user to their appropriate Dashboard
                         if(userDoc != undefined)  navigation.navigate(userType+'DashBoard') 
                    }else{        
                         dispatch.auth.checkedAuthentication({
                             authenticated : false,
                             user          : null,
                             userType      : null,
                             savePassword  ,
                             savedPassword  ,
                          })
                         navigation.navigate('LOGIN')
                    }
               })
                
            } catch (error) {
                console.log("\n-------HECKOUT AUTH ERROR ----------")
                console.log(error)
            }
        },
        async login({password,username,savePassword,navigation},state){
             try {
                if(username && password && navigation){
                    const loginResponse = await auth().signInWithEmailAndPassword(username,password)
                    if(loginResponse.user){
                        const userDocs = await firestore()
                                              .collection('users')
                                              .where('user_id','==',loginResponse.user.uid)
                                              .get()
                                              
                        if(userDocs.docs.length>0){
                            const userDoc= userDocs.docs[0]
                            const user =  {...userDoc.data(),id:userDoc.id}

                            //pressist state to local storage  
                            //so that when we open app next time we don't have to refetch from firestore
                            await AsyncStorage.setItem('USER', JSON.stringify(user))
                            await AsyncStorage.setItem('AUTHENTICATED', JSON.stringify(true))
                            await AsyncStorage.setItem('USER_TYPE', user.type)
                            await AsyncStorage.setItem('SAVE_PASSWORD', JSON.stringify(savePassword))
                            await AsyncStorage.setItem('PASSWORD', password)

                            
                            dispatch.auth.loginSuccess({user,userType:user.type})

                            //redirect user to their approprate dashboard 
                            return navigation.navigate(user.type+'DashBoard')   
                        }
                    }
                    throw new Error('no data found')
                 }
             } catch (error) {
                 let ERROR_MESSAGE = error.message.toString()
                 console.log('error')
                 if(ERROR_MESSAGE.indexOf('auth/wrong-password'))
                 {
                    console.log("\npassword") 
                    return dispatch.auth.loginFailed({message:'mote de passe est incorrect'})
                 }
                 if(ERROR_MESSAGE.indexOf('invalid-email'))
                 { 
                     console.log("\nemail") 
                      return dispatch.auth.loginFailed({message:'email est pas valide'})
                 }
             }
        },
        async logout({navigation},state){
             try {
                  
                 const logoutResponse= await auth().signOut()

                 //remove user and set authentucated to false and
                 await AsyncStorage.removeItem('USER')
                 await AsyncStorage.setItem('AUTHENTICATED', JSON.stringify(false))
                 await AsyncStorage.removeItem('USER_TYPE')
                 dispatch.auth.logedOut()  
                 navigation.navigate('LOGIN')
                
             } catch (error) {
                 console.log("\n----------LOGOUT ERROR--------")
                 console.log(error)
             }
        },
        async toggleSavePassword({savePassword},state){
            try {
       
                await AsyncStorage.setItem('SAVE_PASSWORD', (savePassword).toString())
             
                if(savePassword == false)
                await AsyncStorage.removeItem('PASSWORD')
         
            } catch (error) {
                console.log(error)
            }
        },
        async setMaster({id,isMaster},state){
            try {
 
                const setMasterResponse =firestore()
                                           .collection('users')
                                           .doc(id)
                                           .update({
                                               isMaster 
                                           })

                dispatch.auth.setedAdminToMaster()    

            } catch (error) {
                console.log('----setMaster-----')
                console.log(error)
            }
        },
        async approveUser(id,state){
            try {
   
                const userApproveResponse =firestore()
                                           .collection('users')
                                           .doc(id)
                                           .update({
                                               confirmed : "APPROVED"
                                           })

                dispatch.auth.approvedUser()    

            } catch (error) {
                console.log('----fetchWaitingList-----')
                console.log(error)
            }
        },
        async rejectUser(id,state){
            try {
 
                const userRejectionResponse =firestore()
                                           .collection('users')
                                           .doc(id)
                                           .update({
                                               confirmed : "REJECTED"
                                           })

                dispatch.auth.rejectedUser()    

            } catch (error) {
                console.log('----fetchWaitingList-----')
                console.log(error)
            }
        },
        async fetchAdmins(args,state){
            try {
                 const admins_done_first_fetch = state.auth.admins_done_first_fetch
                 if(admins_done_first_fetch) return 

                 const adminsResponse =firestore()
                                            .collection('users')
                                            .where('type','==','ADMIN')

                 adminsResponse.onSnapshot(res=>{
                     if(res.docs){
                         const admins = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                         dispatch.auth.fetchedAdmins(admins)
                     }
                 })      

            } catch (error) {
                console.log('----fetchWaitingList-----')
                console.log(error)
            }
        },
        async fetchWaitingList(args,state){
            try {
                 const waitingList_done_first_fetch = state.auth.waitingList_done_first_fetch
                 if(waitingList_done_first_fetch) return 

                 const waitingListResponse =firestore()
                                            .collection('users')
                                            .where('confirmed','==','PENDING')

                 waitingListResponse.onSnapshot(res=>{
                     if(res.docs){
                         const waitingList = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                         dispatch.auth.fetchedWaitingList(waitingList)
                     }
                 })      

            } catch (error) {
                console.log('----fetchWaitingList-----')
                console.log(error)
            }
        },
        async register(userObj,state){
            try {
                //get type then check for additional user 
                const {type,name,email,phone,additional,password,ACCESS_CODE } = userObj
                
                //validate ACCESS_CODE , get the master admin's access code and check agains it
                const masterAdmin = await firestore()
                                   .collection('users')
                                   .doc('v6xM6xIb9lOBPczPiyvK')
                                   .get()
                const ACCESS_CODE_MASTER = masterAdmin.data().ACCESS_CODE 
                if(ACCESS_CODE != ACCESS_CODE_MASTER)   
                    return dispatch.auth.registerFail({id:"ACCESS_CODE_INVALID",message:'Le code est pas valide'})

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
                console.log('error')
               
                if(ERROR_MESSAGE.indexOf("email-already-exists") > -1)
                {
                   console.log("\nEmail used ") 
                   return dispatch.auth.registerFail({id:"EMAIL_USED",message:'Email est déja utuliser'})
                }
                if(ERROR_MESSAGE.indexOf('invalid-email') > -1)
                { 
                    console.log("\nemail") 
                     return dispatch.auth.registerFail({id:"EMAIL_INVALID",message:'email est pas valide'})
                }
            }
        }
    })
}
export default model