const content=(sales,scheduele,logout,addCatalogue,configuration,addAdmin,addClient,addDstributor)=>({
   sales,scheduele,logout,addCatalogue,configuration,addAdmin,addClient,addDstributor
})

contents = [
    
]
const french = "FRANCAIS"
const arab   = "ARAB"

const model ={
    state:{
        selectedLanguage:french,
        textContent :false,
    },
    reducers:{
        languageChanged :(state,payload)=>({...state,user:payload.user,IsAuthenticated : true}),
        loggedOut:(state,payload)=>({...state,user:null,IsAuthenticated : false}),
    },
    effects: (dispatch)=>({
        

    })
}
export default model