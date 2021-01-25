export const clientModel=(id,name,sectorId,ref,phone,address,city,price,objectif,coardinations)=>({
    id,
    ref,
    name,
    price,
    objectif,
    address,
    city,
    credit:0,
    sectorId,
    phone :phone  ||'' , 
    coardinations: coardinations || {x:0,y:0}
})

export const sectorModel=(id,name,city,province)=>({
    id  ,
    name,
    city,
    province : province || '',
})
