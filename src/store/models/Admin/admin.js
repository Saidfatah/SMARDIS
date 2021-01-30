
 
const adminModel=(name,phone,email,whatssap,id )=>({
     name,
     isMaster:false,
     id,
     phone,
     whatssap,
     email,
     created_date:new Date(),
})


 


const model ={
    state:{
        admin  :null,
        isMaster : false,
        created_Admin_status: "NO_YET",//SUCCESS FAILED
        created_Admin: null,
        admins  : [],
        adminsCount : 0,
    },
    reducers:{
        fetchAdminDocument : (state,admin)=>({
            ...state,
           admin:admin
        }),
        addedAdmin  : (state,admin)=>({
            ...state,
            admins :[...state.admins,admin] ,
            adminsCount : state.adminsCount +1,
            created_Admin : admin,
            created_Admin_status : "SUCCESS"
        }),
        updatedAdmin  : (state,admin)=>({
            ...state,
            admin :admin
        }),
        removeAdmin  : (state,removedAdmin)=>({
            ...state,
            admins :[...state.admins].filter(o=>!o.id == removedAdmin.id),
            adminsCount : state.adminsCount -1
        }) 
    },
    effects: (dispatch)=>({
        fetchAdminDocument(arg,state){
            const currentAdminId= state.auth.adminId
            //fetch admin by id from firestore
            dispatch.admin.fetchedAdminDocument({name:'abdellah',id:1})
        },
        addNewAdmin({name,email,password,whatssap,phone},state){
            const newAdmin= adminModel(name,phone,email,whatssap,1)
            //fetch admin by id
            dispatch.admin.addedAdmin(newAdmin)
        },
        removeNewAdmin({adminToBeRemoved},state){
             //remove in firebase
            dispatch.admin.removeAdmin(adminToBeRemoved)
        },
 
 

    })
}
export default model