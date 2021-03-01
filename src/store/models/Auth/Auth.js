
import checkAuthetication    from './Effects/checkAuthetication'
import toggleSavePassword    from './Effects/toggleSavePassword'
import fetchWaitingList      from './Effects/fetchWaitingList'  
import uploadCatalogue  from './Effects/uploadCatalogue' 
import loadCatalogue    from './Effects/loadCatalogue'  
import updateAccount    from './Effects/updateAccount'  
import approveUser  from './Effects/approveUser'  
import login        from './Effects/login' 
import logout       from './Effects/logout'  
import setMaster    from './Effects/setMaster'  
import rejectUser   from './Effects/rejectUser'  
import fetchAdmins  from './Effects/fetchAdmins'  
import register     from './Effects/register'  
import fetchUsers   from './Effects/fetchUsers'  
import fetchCatalogue   from './Effects/fetchCatalogue'  

const userTypes= ['ADMIN','DISTRIBUTOR']
const model ={
    state:{
        authenticated  : false,
        users :[],
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
        catalogue : "NOT_UPLOADED",
        done_approving_client:false,
        done_rejecting_client:false,
        done_setting_admin_to_master:false,
        done_fetching_catalogue:false ,
        done_fetching_waiting_list:false ,
        done_updating_acount:false ,
        
        //on snapshots refs 
        on_state_change_snapshot:null ,
        login_snapshot:null ,
        register_snapshot:null ,
    },
    reducers:{
        fetchedCatalogue : (state,{catalogue})=>({
          ...state,
          catalogue
        }),
        fetchingCatalogueFailed : (state,{catalogue})=>({
          ...state,
          catalogue : "NOT_UPLOADED",
        }),
        fetchedUsers : (state,{users})=>({
          ...state,
          
          waitingList  : [...users.filter(user=> user.confirmed =="PENDING" )],
          waitingList_count:users.filter(user=> user.confirmed =="PENDING").length,
          waitingList_done_first_fetch :true ,
          done_fetching_waiting_list :true,

          admins  :[...users.filter(user=> user.type =="ADMIN" )],
          admins_count:users.filter(user=> user.type =="ADMIN" ).length,
          admins_done_first_fetch :true,
          done_fetching_admins :true,
          users   :[...users],
        }),
        fetchingUsersFailed : (state,{users})=>({
          ...state,
          admins:[],
          admins_count:0,
          admins_done_first_fetch :false,
          done_fetching_admins :true,
          waitingList_done_first_fetch :true ,
          done_fetching_waiting_list :true,
        }),
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
        setedSnapshotListnerRef:  (state,{field,ref})=>({
            ...state,
            [field]:ref
        }),
    },
    effects: (dispatch)=>({
        approveUser    : (args,state)=>approveUser(args,state,dispatch),
        login          : (args,state)=>login(args,state,dispatch),
        logout         : (args,state)=>logout(args,state,dispatch),
        setMaster      : (args,state)=>setMaster(args,state,dispatch),
        rejectUser     : (args,state)=>rejectUser(args,state,dispatch),
        fetchAdmins    : (args,state)=>fetchAdmins(args,state,dispatch),
        fetchUsers    : (args,state)=>fetchUsers(args,state,dispatch),
        register       : (args,state)=>register(args,state,dispatch),
        toggleSavePassword    : (args,state)=>toggleSavePassword(args,state,dispatch),
        checkAuthetication    : (args,state)=>checkAuthetication(args,state,dispatch),
        fetchWaitingList      : (args,state)=>fetchWaitingList(args,state,dispatch),
        uploadCatalogue  : (args,state)=>uploadCatalogue(args,state,dispatch),
        loadCatalogue    : (args,state)=>loadCatalogue(args,state,dispatch),
        updateAccount    : (args,state)=>updateAccount(args,state,dispatch),
        fetchCatalogue    : (args,state)=>fetchCatalogue(args,state,dispatch),
    
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