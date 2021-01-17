//get clients List for each District (Secteur)
//get clients localization 
//set clients localization 
const clientsList = []
const sectorsList = []
const missions    = []
const orders      = []
const billsList = []

const clientModel=(name,sectorId,email,phone,whatsapp,coardinations)=>({
    id:clientsList.length +1 ,
    name,
    sectorId,
    phone :phone  ||'' , 
    whatsapp : whatsapp || '',
    email:email || '',
    coardinations: coardinations || {x:0,y:0}
})
const sectorModel=(name,area,province)=>({
    id:sectorsList.length +1 ,
    name,
    area,
    province : province || '',
})
const billModel=(clientId,products,date)=>({
    products,
    date,
    clientId,
})


const tinghir = sectorModel('tinghir','sous')
sectorsList.push(tinghir)
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
        clients  :clientsList,
        sectors  :sectorsList,
        todaysSectors :[] , 
    },
    reducers:{
        fetchedSectors : (state,clients)=>({
            ...state,
            clients :clients
        }),
        fetchedTodaysSectors : (state,sectors)=>({
            ...state,
            todaysSectors :sectors
        }),
        addedSector  : (state,clients)=>({
            ...state,
            clients :clients
        }),
        updatedSector  : (state,clients)=>({
            ...state,
            clients :clients
        }),
        removedSector  : (state,clients)=>({
            ...state,
            clients :clients
        }),

        fetchedClients : (state,clients)=>({
            ...state,
            clients :clients
        }),
        addedClients : (state,client)=>({
            ...state,
            clients :[state.products.clients,client]
        }),
        removededClients : (state,client)=>({
            ...state,
            clients :[state.products.clients,client]
        }),
        updatedClients : (state,client)=>({
            ...state,
            clients :[state.products.clients,client]
        }),
    },
    effects: (dispatch)=>({
        fetchClients(arg,state){

        },
        addClient(arg,state){

        },
        updateClient(arg,state){

        },
        fetchClient(arg,state){

        },


        fetchSectors(arg,state){

        },
        fetchTodaysSectors(arg,state){
     
            const allClients  = state.client.clients
            const currentDistrubutorId = state.auth.distrubutorId
            const orders = state.order.orders.filter(o => o.distrubutorId == currentDistrubutorId  )
            const ordersSectors = orders.map(o=>o.distination.sector)
            const sectors =state.client.sectors.filter(s => ordersSectors.includes(s.id) )
            const ordersClients = orders.map(o=>o.distination.clients).map(cls=>cls.map(cl=>allClients.filter(c=>c.id == cl )[0]))
           
            console.log(ordersClients[0])
            let todaysSectors=[]
            sectors.forEach((s,i)=>{
                todaysSectors.push({sector:s,clients:ordersClients[i]})
            })
             
            // const sectorsWithTheirClients = sectors.map(s=>({sector:s, clients :allClients.filter(c=>c.sectorId == s.id)})) 
            dispatch.client.fetchedTodaysSectors(todaysSectors)

        },
        addSector(arg,state){

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