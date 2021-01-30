export const  productModel = (id,name,category,image,price1,ref,stock,price2,price3,price4,activePrice) =>({
    id,
    name ,
    ref:ref || 'P'+name+(new Date().getTime()),
    category :category || 0,
    image : image || 'NO_IMAGE' ,
    activePrice :activePrice || "price1",
    price1, 
    price2:price2 || 'NOT_DEFINED',
    price3:price3 || 'NOT_DEFINED',
    price4:price4 || 'NOT_DEFINED',
    stock : stock || 99 ,
    soldCount : 0 ,
})