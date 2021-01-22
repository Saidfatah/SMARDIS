//get clients List for each District (Secteur)
//get clients localization 
//set clients localization 
const clientsList = []
const sectorsList = []


const clientModel=(name,sectorId,email,phone,whatsapp,coardinations)=>({
    id:clientsList.length +1 ,
    name,
    sectorId,
    phone :phone  ||'' , 
    whatsapp : whatsapp || '',
    email:email || '',
    coardinations: coardinations || {x:0,y:0}
})
const sectorModel=(name,city,province)=>({
    id:sectorsList.length +1 ,
    name,
    city,
    province : province || '',
})


const shikh = sectorModel('shikh','tinghir')
sectorsList.push(shikh)
const tajda = sectorModel('tajda','ouarzazate')
sectorsList.push(tajda)
const tkhisa = sectorModel('tkhisa','ouarzazate')
sectorsList.push(tkhisa)
const qastor = sectorModel('qastor','ouarzazate')
sectorsList.push(qastor)
const taourirt = sectorModel('taourirt','ouarzazate')
sectorsList.push(taourirt)

const Ali = clientModel('ali',1)
clientsList.push(Ali)
const Moaud1 = clientModel('Moaud1',1)
clientsList.push(Moaud1)
const smail = clientModel('smail',1)
clientsList.push(smail)
const Mohamed = clientModel('mohamed',1)
clientsList.push(Mohamed)

const Souad = clientModel('souad',2)
clientsList.push(Souad)
const Mounir = clientModel('mounir',2)
clientsList.push(Mounir)
const Etmani = clientModel('etmani',2)
clientsList.push(Etmani)

const Mouad = clientModel('mouad',3)
clientsList.push(Mouad)
const Faycal = clientModel('faycal',3)
clientsList.push(Faycal)
const Ghafour = clientModel('ghafour',3)
clientsList.push(Ghafour)

const model ={
    state:{
        clients       :[],
        sectors       :[],
        todaysSectors :[], 
        sectorsCount  :0,//to display in admin's dashboard
        clientsCount  :0,//to display in admin's dashboard
        todaysSectorsCount :0, //to display in distrubutor's dashboard
    },
    reducers:{
        fetchedSectors : (state,sectors)=>({
            ...state,
            sectors :sectors ,
            sectorsCount : sectors.length
        }),
        fetchedTodaysSectors : (state,todaysSectors)=>({
            ...state,
            todaysSectors :todaysSectors,
            todaysSectorsCount :todaysSectors.length,
        }),
        addedSector  : (state,sector)=>({
            ...state,
            sectors :[...state.sectors, sector],
            sectorsCount: state.sectorsCount+1
        }),
        updatedSector  : (state,sector)=>({
            ...state,
            sectors :[state.sectors].map(s=>s.id == sector.id ? sector:s)
        }),
        removedSector  : (state,sector)=>({
            ...state,
            sectors :[...state.sectors].filter(s=>!s.id==sector.id),
            sectorsCount: state.sectorsCount-1
        }),

        fetchedClients : (state,clients)=>({
            ...state,
            clients :clients,
            clientsCount: clients.length
        }),
        addedClient   : (state,client)=>({
            ...state,
            clients  :[state.clients,client],
            clientsCount: state.clientsCount +1
        }),
        removedClient : (state,client)=>({
            ...state,
            clients :[...state.clients].filter(c=>!c.id == client.id),
            clientsCount: state.clientsCount -1
        }),
        updatedClient : (state,client)=>({
            ...state,
            clients :[...state.clients].map(c=>c.id == client.id ?client : c)
        }),
    },
    effects: (dispatch)=>({
        fetchClients(arg,state){
               dispatch.client.fetchedClients(clientsList)
        },
        addClient(arg,state){

        },
        updateClient(arg,state){

        },
        fetchClient(arg,state){

        },


        fetchSectors(arg,state){
            dispatch.client.fetchedSectors(sectorsList)
        },
        fetchTodaysSectors(arg,state){
            const allClients  = state.client.clients
            const currentDistrubutorId = state.auth.distrubutorId
            const orders = state.order.orders.filter(o => o.distrubutorId == currentDistrubutorId  )
            const ordersSectors = orders.map(o=>o.distination.sector)
            const sectors =state.client.sectors.filter(s => ordersSectors.includes(s.id) )
            const ordersClients = orders.map(o=>o.distination.clients).map(cls=>cls.map(cl=>allClients.filter(c=>c.id == cl )[0]))
           

            let todaysSectors=[]
            sectors.forEach((s,i)=>{
                todaysSectors.push({sector:s,clients:ordersClients[i]})
            })
             
            // const sectorsWithTheirClients = sectors.map(s=>({sector:s, clients :allClients.filter(c=>c.sectorId == s.id)})) 
            dispatch.client.fetchedTodaysSectors(todaysSectors)

        },
        addSector({name,city,province},state){
            const sector = sectorModel(name,city,province)

        },
        updateSector(arg,state){

        },
        fetchSector(arg,state){

        },


        fetchBills(arg,state){

        },
        addBill(arg,state){

        },
        updateBill(arg,state){

        },
        fetchBill(arg,state){

        },

    })
}
export default model