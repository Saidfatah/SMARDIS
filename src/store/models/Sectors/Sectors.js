
import addSector from './Effects/addSector'
import fetchSectorClients from './Effects/fetchSectorClients'
import fetchSectors from './Effects/fetchSectors'
import updateSector from './Effects/updateSector'


const model ={
    state:{
        sectors       :[],
        todaysSectors :[], 
        selected_sector_Clients :[], 
        sectorsCount  : 0 ,//to display in admin's dashboard
        todaysSectorsCount :0, //to display in distrubutor's dashboard
        last_visited_sector : null,
        sectors_first_fetch:false,
        visited_Sector_has_clients:false,
        done_fetching_sectors:false,
        done_adding_sector:false,
        sector_adding_error:null
        // done_removing_sector:false,
    },
    reducers:{
        fetchedSectors : (state,sectors)=>({
            ...state,
            sectors :sectors ,
            done_fetching_sectors:true,
            sectorsCount:sectors.length
        }),
        fetchedSectorClients : (state,{selected_sector_Clients,last_visited_sector,visited_Sector_has_clients})=>({
            ...state,
            selected_sector_Clients ,
            last_visited_sector,
            visited_Sector_has_clients
        }),
        sectorsFetchFailed : (state,sectors)=>({
            ...state,
            done_fetching_sectors:true
        }),
        fetchedSectorsCount : (state,sectorsCount)=>({
            ...state,
            sectorsCount 
        }),
        addedSector  : (state,sectors)=>({
            ...state,
            sectors :[...sectors],
            sectorsCount: state.sectorsCount+1,
            done_adding_sector:true,
            sector_adding_error:null
        }),
        sectorAddFailed  : (state,sector_adding_error)=>({
            ...state,
            done_adding_sector:true,
            sector_adding_error
        }),
        updatedSector  : (state,sectors)=>({
            ...state,
            sectors :[...sectors],
            done_adding_sector :true
        }),
        sectorUpdateFailed  : (state,args)=>({
            ...state,
            done_adding_sector :true
        }),
        reseted:  (state,field)=>({
            ...state,
            [field]:false
        }),
        // removedSector  : (state,sector)=>({
        //     ...state,
        //     sectors :[...state.sectors].filter(s=>!s.id==sector.id),
        //     sectorsCount: state.sectorsCount-1,
        //     done_removing_sector :true
        // }),
        // removingSectorFailed  : (state,sector)=>({
        //     ...state,
        //     done_removing_sector :true
        // }),
    },
    effects: (dispatch)=>({
        fetchSectors     : (args,state)=>fetchSectors(args,state,dispatch),
        fetchSectorClients  : (args,state)=>fetchSectorClients(args,state,dispatch),
        addSector        : (args,state)=>addSector(args,state,dispatch),
        updateSector     : (args,state)=>updateSector(args,state,dispatch),

        resetIsDone(field,state){
            dispatch.sector.reseted(field)
        }
    })
}
export default model