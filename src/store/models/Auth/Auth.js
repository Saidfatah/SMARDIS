//here will be checking for auth 
//or maybe use the authenticated variable in other places 
import {user} from './Schemas/User'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

const userTypes= ['ADMIN','DISTRIBUTOR']
const model ={
    state:{
        authenticated  : false,
        userType       : userTypes[1],
        authError      : null , 
        adminId        : 1,
        distrubutorId  : 1,
        user           : null ,
        savePassword   : false,
        savedPassword  : null,
    },
    reducers:{
  
        checkedAuthentication : (state,{authenticated,user,userType,savePassword,savedPassword})=>({
          ...state,
          authenticated ,
          user,
          userType,
          savePassword  ,
          savedPassword  ,
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
        }),
        logedOut:  (state,args)=>({
            ...state,
            user:null,
            userType:null,
            authenticated:false,
            distrubutorId:null,
            adminId:null,
        }),
    },
    effects: (dispatch)=>({
        async checkAuthetication({navigation},state){
            try {
                auth().onAuthStateChanged(async user=>{
                    console.log({user})
                    let savePassword  = await AsyncStorage.getItem('SAVE_PASSWORD')
                    savePassword = JSON.stringify(savePassword)
                    const savedPassword  = await AsyncStorage.getItem('PASSWORD')
                   if(user){      
                      
                      //get user doc from async storage
                      const userjsonValue = await AsyncStorage.getItem('USER')
                      const user = userjsonValue != null ? JSON.parse(userjsonValue) : null
                      const userType      = await AsyncStorage.getItem('USER_TYPE')
                     
             
                      dispatch.auth.checkedAuthentication({
                          authenticated:true,
                          user,
                          userType ,
                          savePassword  ,
                          savedPassword  ,
                      })
                      navigation.navigate(userType+'DashBoard') 
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
                console.log("-------HECKOUT AUTH ERROR ----------")
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
                                              
                        if(userDocs.docs.length){
                            const user =  userDocs.docs[0].data()
                            //pressist state to local storage  so that when we oen up next time we don't have to refetch from firestore
                            await AsyncStorage.setItem('USER', JSON.stringify(user))
                            await AsyncStorage.setItem('AUTHENTICATED', JSON.stringify(true))
                            await AsyncStorage.setItem('USER_TYPE', user.type)
                            await AsyncStorage.setItem('SAVE_PASSWORD', JSON.stringify(savePassword))
                            await AsyncStorage.setItem('PASSWORD', password)
                            await AsyncStorage.setItem('VALUE', "VALUE")
                            
                            dispatch.auth.loginSuccess({user,userType:user.type})

                            //redirect user to their approprate dashboard 
                            return navigation.navigate(user.type+'DashBoard')   
                        }
                    }
                    throw new Error('no data found')
                 }
             } catch (error) {
                 //handle errors
                return  console.log(error) 
                 if(error.message.contains('invalid-email'))
                   return dispatch.auth.loginFailed({message:'email est pas valide'})
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
                 console.log("----------LOGOUT ERROR--------")
                 console.log(error)
             }
        },
        async addDistrubutorsList(args,state){
             try {
                  const Distubutorslist = [
                    user(
                        'DISTRUBUTOR',
                        'mouad saleh',
                        'mouad@vendor.com',
                        '0654878542',
                        'Ouarzazate',
                        {
                            ref:'mouad123A'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'mohamed jebli',
                        'mohamed@vendor.com',
                        '0654878542',
                        'Ouarzazate',
                        {
                            ref:'mohamed456'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'salah abdo',
                        'salah@vendor.com',
                        '0685478541',
                        'Ouarzazate',
                        {
                            ref:'salahAoi'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'yassin abdo',
                        'yassine@vendor.com',
                        '065487854',
                        'Ouarzazate',
                        {
                            ref:'yassIkH'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'abdo abdo',
                        'abdoa@vendor.com',
                        '0654878542',
                        'Ouarzazate',
                        {
                            ref:'abdoas7'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'sabir abdo',
                        'sabir@vendor.com',
                        '065875421',
                        'Ouarzazate',
                        {
                            ref:'sabirhY'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'louay abdo',
                        'loay@vendor.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            ref:'loyaT'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'soufian abdo',
                        'soufiane@vendor.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            ref:'soufiane8'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'omar abdo',
                        'omar@vendor.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            ref:'omarT'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'Issam abdo',
                        'Issam@vendor.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            ref:'IssamA'
                        },
                        null
                    ),
                    user(
                        'DISTRUBUTOR',
                        'abdessamad abdo',
                        'abdes@vendor.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            ref:'abdes87'
                        },
                        null
                    ),
                  ]
                  const adminslist = [
                    user(
                        'ADMIN',
                        'abdellah jgnour',
                        'jgnour@admin.com',
                        '0654878542',
                        'Ouarzazate',
                        {
                            isMaster:true
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'Mohamed eraqibi',
                        'eraqibi_mohamed@admin.com',
                        '0654878542',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'Said barca',
                        'barca@admin.com',
                        '0685478541',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'Moatassimle bedroun',
                        'Moatassimle@admin.com',
                        '065487854',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'abdelhakim raqibi',
                        'abdelhakim@admin.com',
                        '0654878542',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'abdelhaq raqibi',
                        'abdelhaq@admin.com',
                        '065875421',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'Abdellah nejar',
                        'nejar@admin.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'issam bedroun',
                        'issam_bedroun@admin.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'salah behja',
                        'behja@admin.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'mountassir sabir',
                        'mountassir@admin.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                    user(
                        'ADMIN',
                        'mohamed fatah',
                        'mohamedfatah@admin.com',
                        '0621548758',
                        'Ouarzazate',
                        {
                            isMaster:false
                        },
                        null
                    ),
                  ]

                  const batch = firestore().batch()
                  adminslist.forEach(user => {
                      const docRef = firestore().collection('users').doc() 
                      batch.set(docRef,user)
                  });

                batch.commit()
                
             } catch (error) {
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


    })
}
export default model