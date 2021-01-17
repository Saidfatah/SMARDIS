// handle logging
// handle Authorzation (show diffrent interface for admins and Vendors)
// handle account configuration (passwords , phone numbers)
// authenticated:state.auth.authenticated,
//         userType:state.auth.userType,


const userTypes= ['ADMIN','DISTRIBUTOR']
const model ={
    state:{
        authenticated  :true,
        userType       :userTypes[1],
    },
    reducers:{
        checkedAuthentication : (state,cartGuests)=>({
            ...state,
            cartGuests :cartGuests
        }),
    },
    effects: (dispatch)=>({
        checkAuthetication(somthing,state){
             
        },
        login(somthing,state){
             
        },
        logout(somthing,state){
             
        },

    })
}
export default model