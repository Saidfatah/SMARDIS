export const saleModel=(id,distrubutor,client,product,quantity,sector)=>({
    ref         :  ("C"+client.name +( new Date().getTime()).toString()).toUpperCase() , 
    id          :  id,
    distrubutor :  distrubutor , 
    client      :  client , 
    product     :  product, 
    sector      :  sector , 
    total       :  product[client.priceType] * quantity, 
    date        :  new Date(), //use frebase date 
    time        :  new Date().getHours(), //use frebase date 
})