export const orderModel=(adminId,distrubutorId,distination,distrubutor)=>({
    adminId,
    status: "PENDING",
    date:new Date(),
    admin:{name:"abdellah jgnour",id:1},
    distrubutor:distrubutor ||{name:"distrubutor name",id:-1},
    distrubutorId,
    distination: distination || {sector:'1',clientsIds :[1,2,3,5]}
})