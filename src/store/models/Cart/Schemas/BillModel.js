export const billModel=(id,distrubutor,client,products,sector,city,status)=>({
    id          : id,
    ref         :("C"+client.name +( new Date().getTime()).toString()).toUpperCase() , 
    distrubutor :  distrubutor || {id: 1,name :'ali fatah'} , 
    client      :  client || {id: 1,name :'ali fatah'} , 
    products    :  products || [{id:1,code : "a11",price:50.00,name:'3afya 5L', quantity:5}] , 
    sector      :  sector || {id:1,name:'tkhisa'}, 
    total       :  products.reduce((a,c)=> a+(c.quantity * c.prce) ,0) || 100, 
    city        :  city ||sector.city ,
    date        :  new Date(), //use frebase date 
    hour        :  new Date().getHours(), //use frebase date 
    status      :  status , //||"PENDING" || "PAID" 
})