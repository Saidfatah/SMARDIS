import {user} from './Schemas/User'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '@react-native-firebase/storage'



let   ON_AUTH_STATE_CHANGED_UNSUBSCRIBE = null
const userTypes= ['ADMIN','DISTRIBUTOR']
const model ={
    state:{
        authenticated  : false,
        waitingList    : [],
        admins         : [],
        userType       : userTypes[1],
        userPassword   : null,
        adminId        : 1,
        distrubutorId  : 1,
        user           : null ,
        savePassword   : false,
        savedPassword  : null,
        savedEmail  : null,
        waitingList_count : 0,
        admins_count      : 0,
        done_Logging    : false,
        done_first_Logging           : false,
        done_first_register          : false,
        waitingList_done_first_fetch : false,
        admins_done_first_fetch      : false,
        done_fetching_admins         : false,
        authError      : null , 
        registerError  : null , 
        updateAccountError   : null , 
        catalogue_url : "NOT_UPLOADED",
        done_approving_client:false,
        done_rejecting_client:false,
        done_setting_admin_to_master:false,
        done_fetching_catalogue:false ,
        done_fetching_waiting_list:false ,
        done_updating_acount:false ,
    },
    reducers:{
        checkedAuthentication : (state,{authenticated,user,userType,savePassword,savedPassword,savedEmail})=>({
          ...state,
          authenticated ,
          user,
          userType,
          savePassword  ,
          savedPassword  ,
          savedEmail,
          userPassword:savedPassword,
          distrubutorId:user?user.id:null,
          adminId :user ?user.id:null
        }),
        loginFailed:  (state,authError)=>({
            ...state,
            authError :authError
        }),
        loginSuccess:  (state,{user,userType,userPassword})=>({
            ...state,
            done_first_Logging : true,
            distrubutorId : user.id,
            authenticated : true,
            done_Logging  : true,
            authError     : null,
            adminId       : user.id,
            userType,
            user,
            userPassword
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
            admins_done_first_fetch :true,
            done_fetching_admins :true,
        }),
        fetchingAdminsFailed:  (state,admins)=>({
            ...state,
            admins:[],
            admins_count:0,
            admins_done_first_fetch :false,
            done_fetching_admins :true,
        }),
        fetchedWaitingList:  (state,waitingList)=>({
            ...state,
            waitingList:[...waitingList],
            waitingList_count:waitingList.length,
            waitingList_done_first_fetch :true ,
            done_fetching_waiting_list :true,
        }),
        fetchingWaitingListFailed:  (state,args)=>({
            ...state,
            waitingList_done_first_fetch :true ,
            done_fetching_waiting_list :true,
        }),
        approvedUser:  (state,args)=>({
            ...state,
            waitingList_count:state.waitingList_count -1 ,
            done_approving_client:true
        }),
        userApproveFailed:  (state,args)=>({
            ...state,
            done_approving_client:true
        }),
        rejectedUser:  (state,args)=>({
            ...state,
            waitingList_count:state.waitingList_count -1 ,
            done_rejecting_client:true
        }),
        userRejectFailed:  (state,args)=>({
            ...state,
            done_rejecting_client:true
        }),
        uploadedCatalogue:  (state,catalogue_url)=>({
            ...state,
            catalogue_url
        }),
        loadedCatalogue:  (state,catalogue_url)=>({
            ...state,
            catalogue_url,
            done_fetching_catalogue:true
        }),
        setedAdminToMaster:  (state,args)=>({
            ...state,
            done_setting_admin_to_master:true
        }),
        settingAdminMasterFailed:  (state,args)=>({
            ...state,
            done_setting_admin_to_master:true
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
        updatedAccount:  (state,field)=>({
            ...state,
            done_updating_acount:true
        }),
        updateAccountFailed:  (state,updateAccountError)=>({
            ...state,
            done_updating_acount:true,
            updateAccountError
        }),
    },
    effects: (dispatch)=>({
        async checkAuthetication({navigation},state){
            try {
                ON_AUTH_STATE_CHANGED_UNSUBSCRIBE = auth().onAuthStateChanged(async user=>{

                    let savePassword  = await AsyncStorage.getItem('SAVE_PASSWORD')
                    savePassword = JSON.stringify(savePassword)
                    const savedPassword  = await AsyncStorage.getItem('PASSWORD')
                    const savedEmail  = await AsyncStorage.getItem('EMAIL')
                   console.log({savedEmail})
                    if(user){      
                        //get user doc from async storage
                        console.log(user)
                         let userDoc
                         const userjsonValue = await AsyncStorage.getItem('USER')
                         userDoc = userjsonValue != null ? JSON.parse(userjsonValue) : null
                         const userType      = await AsyncStorage.getItem('USER_TYPE')
                       

                        //if somehow user wasn't fetched from async storage let's refetch from firestore
                        if(userDoc == undefined || userDoc == null){
                            const userDocResponse =await firestore().collection('users').where('user_id','==',user.uid)
                            userDocResponse.onSnapshot(res=>{
                                const docs=res.docs
                                userDoc={...docs[0].data(),id:docs[0].id}
                            })
                        }
                       
                         dispatch.auth.checkedAuthentication({
                             authenticated:true,
                             user:userDoc,
                             userType ,
                             savePassword  ,
                             savedPassword  ,
                             savedEmail
                         })

                         //check if user in approved by admin if not then we redirect them to waitingRoom 
                         if(userDoc != undefined && userDoc.confirmed =="PENDING") 
                               return navigation.navigate("WAIT_ROOM") 

                         //redirect logged users that are approved to their appropriate Dashboard
                         if(userDoc != undefined) 
                               navigation.navigate(userType+'DashBoard') 
                    }else{        
                         dispatch.auth.checkedAuthentication({
                             authenticated : false,
                             user          : null,
                             userType      : null,
                             savePassword  ,
                             savedPassword  ,
                             savedEmail
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
                    //unsubscribe to onAuthStateChanged because otherwise it'll try to take controll as soon as we log in hence
                    //preventing us from retrieving user doc from firestore  
                    ON_AUTH_STATE_CHANGED_UNSUBSCRIBE && ON_AUTH_STATE_CHANGED_UNSUBSCRIBE()

                    const loginResponse = await auth().signInWithEmailAndPassword(username,password)
                  
                    if(loginResponse.user){
                        const userDocResponse= await firestore()
                                              .collection('users')
                                              .where('user_id','==',loginResponse.user.uid)
                                             
                         userDocResponse.onSnapshot(async res=>{
                            if(res.docs.length){
                                const userDoc= res.docs[0]
                                const user =  {...userDoc.data(),id:userDoc.id}
                                  console.log('got user doc')
                                //pressist state to local storage  
                                //so that when we open app next time we don't have to refetch from firestore
                                await AsyncStorage.setItem('USER', JSON.stringify(user))
                                await AsyncStorage.setItem('USER_TYPE', user.type)
                                await AsyncStorage.setItem('SAVE_PASSWORD', JSON.stringify(savePassword))
                                await AsyncStorage.setItem('PASSWORD', password)
                                console.log({username})
                                await AsyncStorage.setItem('EMAIL', username)
    
                                
                                dispatch.auth.loginSuccess({user,userType:user.type,userPassword:password})
    
                                //redirect user to their approprate dashboard 
                                return navigation.navigate(user.type+'DashBoard')   
                            }
                         })                    
                        
                    }
                 
             } catch (error) {
                 let ERROR_MESSAGE = error.message.toString()
                 console.log('------Login------')
                 console.log(error)
                 if(ERROR_MESSAGE.indexOf('auth/wrong-password'))
                 {
                    console.log(error) 
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
             
                if(savePassword == false){
                await AsyncStorage.removeItem('PASSWORD')
                await AsyncStorage.removeItem('EMAIL')
               }
         
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
                dispatch.auth.settingAdminMasterFailed()    
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
                dispatch.auth.userApproveFailed()   
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
                dispatch.auth.userRejectFailed() 
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
                     if(res.docs.length){
                         const admins = res.docs.map(doc=>({...doc.data(),id:doc.id}))
                         return dispatch.auth.fetchedAdmins(admins)
                     }
                     dispatch.auth.fetchingAdminsFailed()
                 })      

            } catch (error) {
                console.log('----fetchWaitingList-----')
                console.log(error)
                dispatch.auth.fetchingAdminsFailed()
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
        },
        async register(userObj,state){
            try {
                //unsubscribe to onAuthStateChanged because otherwise it'll try to take controll as soon as we create userAccount 
                //in Authentication  hence preventing us from creating user doc in users collection 
                ON_AUTH_STATE_CHANGED_UNSUBSCRIBE && ON_AUTH_STATE_CHANGED_UNSUBSCRIBE()
         
                    
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
                return dispatch.auth.registerFail({id:"UNKNOWN",message:'somthing wen wrong'})
            }
        },
        async uploadCatalogue(uri,state){
            try {
                if(!uri) return 

                let CATALOGUE_URI = "NOT_UPLOADED"
                const task =  Storage().ref('catalogue/catalogue').putFile(uri);
                task.on('state_changed', 
                    sn =>{},
                    err=>console.log(err),
                    () => {
                       console.log(' uploaded! catalogue')
                       Storage()
                       .ref("catalogue").child("catalogue").getDownloadURL()
                       .then(url => {
                         console.log('uploaded catalogue url', url);
                         CATALOGUE_URI=url
                       }).catch(err=>console.log(err))
                   }
                )
                await task 
                if(CATALOGUE_URI){
                    const setMasterAdminCatalogue = await firestore()
                                       .collection('users')
                                       .doc('v6xM6xIb9lOBPczPiyvK')
                                       .update({
                                        catalogue:CATALOGUE_URI
                                       })
                
                   dispatch.uploadedCatalogue(CATALOGUE_URI)
                }
  

                navigation.navigate("WAIT_ROOM") 
            } catch (error) {
                let ERROR_MESSAGE = error.message.toString()
                console.log('-----uploadCatalogue------')
                console.log(error)
     
            }
        },
        async loadCatalogue(args,state){
            try {
              
                const getCatalogueResponse = await firestore()
                                   .collection('users')
                                   .doc('v6xM6xIb9lOBPczPiyvK')
                                   .get()
                if(getCatalogueResponse.data()){
                const catalogue_url= getCatalogueResponse.data().catalogue
                dispatch.auth.loadedCatalogue(catalogue_url)
                }
            } catch (error) {
                let ERROR_MESSAGE = error.message.toString()
                console.log('-----loadCatalogue------')
                console.log(error)
     
            }
        },
        async updateAccount(userInfoObj,state){
            try {
                const {password,name,city,phone,type}=userInfoObj
                const user = state.auth.user

                if(!user) return 

                const   updatedFields={password,name,city,phone}
                if(type == "ADMIN"){
                    updatedFields.ACCESS_CODE = userInfoObj.ACCESS_CODE
                } 

            
                const id = user.id
                const updateResponse = await firestore()
                                            .collection('users')
                                            .doc(id)
                                            .update(updatedFields)
            
                //check if password was modified then update firestroe auth password
                const oldPassword = state.auth.userPassword
                if(password != oldPassword){
                    const emailCred  = auth.EmailAuthProvider.credential(
                        auth().currentUser.email, 
                        oldPassword 
                     );

                    auth().currentUser.reauthenticateWithCredential(emailCred)
                    .then(() => {
                        console.log('updated password')
                       return  auth().currentUser.updatePassword(password);
                    })
                    .catch(error => {
                          console.log('-----passwordupdate------')
                          console.log(error)
                          let ERROR_MESSAGE = error.message.toString()
                          if(ERROR_MESSAGE.indexOf('auth/wrong-password')>-1)
                          return  dispatch.auth.updateAccountFailed({id:"WRONG_PASSWORD",message:'failed to update account'})

                          dispatch.auth.updateAccountFailed({id:"UPDATE_PASSWORD_FAILED",message:'failed to update account'})
                    });
                }
                dispatch.auth.updatedAccount()
             
            } catch (error) {
                console.log('-----updateAccount------')
                console.log(error)
                
                dispatch.auth.updateAccountFailed({id:"FAILED",message:'failed to update account'})
            }
        },
        resetIsDone(field,state){
           try {
                console.log(field)
                dispatch.auth.reseted(field)
            } catch (error) {
                console.log("------resetIsDone------")
            }
        }

    })
}
export default model