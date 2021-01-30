export const clientModel=(id,name,sectorId,ref,phone,address,city,price,objectif,coardinations)=>({
    id,
    ref,
    name,
    price,
    priceType:price.replace('x','ce'),
    objectif,
    address,
    city,
    credit:0,
    sectorId,
    phone :phone  ||'' , 
    coardinations: coardinations || {x:0,y:0}
})