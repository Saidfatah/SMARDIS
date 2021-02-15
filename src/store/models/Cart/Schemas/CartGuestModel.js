export const cartGuestModel=(id,name,guestId,items,distrubutor,sector,client,orderId,scheduelId)=>({
    name ,
    guestId ,
    distrubutor:distrubutor || {name:'abdellah',id},
    id ,
    sector ,
    items ,
    status : "PENDING",
    client , 
    orderId,
    scheduelId
})