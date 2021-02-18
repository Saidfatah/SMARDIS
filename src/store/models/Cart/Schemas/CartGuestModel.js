export const cartItemModel=(guestId,sector,client,orderId,scheduelId,product)=>({
    guestId ,
    sector ,
    client , 
    orderId,
    scheduelId,
    ...product
})