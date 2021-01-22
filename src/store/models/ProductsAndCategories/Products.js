let productsList   = []
let categoriesList = []
const productModel = (name,category,image,price1,ref,price2,price3,price4) =>({
    name ,
    ref:ref || 'P'+name+(new Date().getTime()),
    id:productsList.length,
    category :category || 0,
    image : image || 'NO_IMAGE' ,
    activePrice :"price1",
    price1, 
    price2:price2 || 'NOT_DEFINED',
    price3:price3 || 'NOT_DEFINED',
    price4:price4 || 'NOT_DEFINED',
})
const categoryModel= (name,image) =>({
    id:categoriesList.length ,
    name,
    image 
})


const other = categoryModel('other','https://vistapointe.net/images/products-wallpaper-4.jpg')
categoriesList.push(other)

const legumes = categoryModel('legumes','https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-1200.jpg')
categoriesList.push(legumes)
const lentels     =productModel('3des',1,'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/02/lentils-6-500x500.jpg',70)
productsList.push(lentels)
const kanelini    =productModel('kanelini',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-cannellini-600x400.jpg',70)
productsList.push(kanelini)
const whiteFayot  =productModel('whiteFayot ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-fayot-600x400.jpg',70)
productsList.push(whiteFayot)
const KidneyBeans =productModel('KidneyBeans  ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-kidney-600x400.jpg',70)
productsList.push(KidneyBeans)
const Chickpeas   =productModel('Chickpeas   ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-chickpea-garbanzo-600x400.jpg',70)
productsList.push(Chickpeas )
const Chickpeas1   =productModel('Chickpeas1   ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-chickpea-garbanzo-600x400.jpg',70)
productsList.push(Chickpeas1 )
const Chickpeas2   =productModel('Chickpeas2   ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-chickpea-garbanzo-600x400.jpg',70)
productsList.push(Chickpeas2 )
const Chickpeas3   =productModel('Chickpeas3   ',1,'https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-chickpea-garbanzo-600x400.jpg',70)
productsList.push(Chickpeas3 )

const oils = categoryModel('oils','https://www.excelvite.com/wp-content/uploads/2018/11/Healthy-oil.jpg')
categoriesList.push(oils)
const zain   =productModel('zain   ',2,'https://cdn11.bigcommerce.com/s-podjif72xf/images/stencil/1280x1280/products/13827/9169/9504000062330__57481.1594292115.jpg?c=2?imbypass=on',70)
productsList.push(zain )
const espego   =productModel('espego   ',2,'https://dibaonline.de/media/image/product/883/lg/espido-roghan-zeitoon-cooking-oil-with-extra-virgin-olive-oil-5000ml.png',70)
productsList.push(espego )
const extravergin   =productModel('extravergin   ',2,'https://images-na.ssl-images-amazon.com/images/I/71JLJ0MQT8L._SY879_.jpg',70)
productsList.push(extravergin )
const felipoBerd   =productModel('felipoBerd   ',2,'https://www.costco.co.uk/medias/sys_master/products/h74/he9/10039956406302.jpg',70)
productsList.push(felipoBerd )
const hayat   =productModel('hayat   ',2,'https://www.luluhypermarket.com/medias/1144337-01.jpg-515Wx515H?context=bWFzdGVyfGltYWdlc3w2MTkzOXxpbWFnZS9qcGVnfGltYWdlcy9oN2EvaDBhL2gwMC85MjM5MjM2MzQ1ODg2LmpwZ3w1NDFiZTJkMzEyYjE3NTJmODU2Nzc4NzAwNmZiODU1NDM2Y2YxMzBlOWM0NzZhMzg1YjA4MDlkNGQ0OWU1MjNk',70)
productsList.push(hayat )


const soaps = categoryModel('soaps','https://i.ytimg.com/vi/zkIvUfpRIrw/maxresdefault.jpg')
categoriesList.push(soaps)
const dove   =productModel('dove   ',3,'https://www.dove.com/content/dam/unilever/dove/saudi_arabia/pack_shot/6281006473607-1617638-png.png.ulenscale.460x460.png',70)
productsList.push(dove )
const rexona   =productModel('rexona   ',3,'https://cdn1.bigcommerce.com/n-dvzvde/vef0tp/products/8676/images/9391/Rexona_Soap_5.29_OZ_150_Grams__70413.1430724192.1280.1280.jpg?c=2',70)
productsList.push(rexona )
const dial   =productModel('dial   ',3,'https://images.heb.com/is/image/HEBGrocery/000032889',70)
productsList.push(dial )
const garnier   =productModel('garnier   ',3,'https://i.ebayimg.com/images/g/cSQAAOSwzUVdHYJX/s-l300.jpg',70)
productsList.push(garnier )
const camay   =productModel('camay   ',3,'https://imperialsoap.com/wp-content/uploads/2018/10/1-Camay.jpg',70)
productsList.push(camay )



const paths = categoryModel('paths','https://i.ytimg.com/vi/zkIvUfpRIrw/maxresdefault.jpg')
categoriesList.push(paths)
const spaghetti   =productModel('spaghetti   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-spaghetti-600x400.jpg',70)
productsList.push(spaghetti )
const Pappardelle   =productModel('Pappardelle   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-pappardelle-600x400.jpg',70)
productsList.push(Pappardelle )
const Fusilli   =productModel('Fusilli   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-fusilli-600x400.jpg',70)
productsList.push(Fusilli )
const Farfalle   =productModel('Farfalle   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-farfalle-psd-600x400.jpg',70)
productsList.push(Farfalle )
const Penne   =productModel('Penne   ',4,'https://www.jessicagavin.com/wp-content/uploads/2020/07/types-of-pasta-penne-600x400.jpg',70)
productsList.push(Penne )


const flours = categoryModel('flours','https://res.cloudinary.com/grohealth/image/upload/$wpsize_!_cld_full!,w_1200,h_630,c_scale/v1588092404/Low-Carb-Flour.png')
categoriesList.push(flours)
const HodgsonMill   =productModel('HodgsonMill',5,'https://www.world-grain.com/ext/resources/Article-Images/2019/12/Hodgson-Mill_Unbleached-All-Purpose-White-Wheat-Flour_Photo-cred-FDA_E.jpg?1575296844',70)
productsList.push(HodgsonMill )
const ArrowheadMills   =productModel('ArrowheadMills',5,'https://assets.epicurious.com/photos/5a5e769b1e703a366d4197db/6:4/w_1600%2Cc_limit/flour-taste-test-inset-1-12012018.jpg',70)
productsList.push(ArrowheadMills )
const GoldMedal   =productModel('GoldMedal',5,'https://images.albertsons-media.com/is/image/ABS/117100035?$ecom-pdp-desktop$&defaultImage=Not_Available&defaultImage=Not_Available',70)
productsList.push(GoldMedal )
const WhiteLily   =productModel('WhiteLily',5,'https://m.media-amazon.com/images/I/51ewnN4dJTL.jpg',70)
productsList.push(WhiteLily )


//use async storage here 
//then we an listen for product prices changes 

//diffrente use scenario
//admin - all products - categories 
//vendor

//shpould we store these in cache 
//then lsiten to chanegsin db if something changes we update it in local

//product can have no category and will put them in other category 

 const userTypes= ['ADMIN','DISTRIBUTOR']
const model ={
    state:{
        products         : [],
        categories       : [],
        selectedCategoryProducts :[productsList.filter(p=>p.category == 2)] ,
        selectedCategory : 2 , 
        productsCount    : 0,
        categoriesCount  : 0,
    },
    reducers:{
        fetchedProducts : (state,products)=>({
            ...state,
            products :products,
            productsCount : products.length
        }),
        setedSelectedCategoryProducts : (state,products)=>({
            ...state,
            selectedCategoryProducts :products
        }),
        addedProduct : (state,product)=>({
            ...state,
            products :[state.products,product],
            productsCount :state.productsCount +1
        }),
        updatedProduct : (state,product)=>({
            ...state,
            products :[...state.products].map(p=>p.id == product.id ?product : p)
        }),
        removedProduct : (state,product)=>({
            ...state,
            products :[...state.products].filter(p=>!p.id == product.id  ),
            productsCount :state.productsCount -1
        }),


        selectedCategory : (state,category)=>({
            ...state,
            selectedCategory :category
        }),
        fetchedCategories : (state,categories)=>({
            ...state,
            categories :categories
        }),
        addedCategory : (state,category)=>({
            ...state,
            categories :[state.categories,category],
            categoriesCount :state.categoriesCount +1
        }),
        updatedCategory : (state,category)=>({
            ...state,
            categories :[...state.categories].map(c=>c.id == category.id ?category : c)
        }),
        removedCategory : (state,category)=>({
            ...state,
            categories :[...state.categories].filter(c=>!c.id == category.id  ),
            categoriesCount :state.categoriesCount -1
        }),
    },
    effects: (dispatch)=>({

        selectCategory(selectedCategory,state){
            //get the selcted category products 
             const products = state.products.products
             const filterdProducts = [...products].filter(p=>p.category == selectedCategory)
             dispatch.products.selectedCategory(selectedCategory)
             dispatch.products.setedSelectedCategoryProducts(filterdProducts)
        },
        fetchCategories(somthing,state){
             dispatch.products.fetchedCategories(categoriesList)
        },
        addCatgory({name,image},state){
              if(name && image){
                   const newCategory = categoryModel(name,image)
                   dispatch.products.addedCategory(newCategory)
              }
        },
        updateCatgeory({id,updatedFiels},state){
             if(id && updatedFiels)
             {
                 const targetCategory = state.products.categories.filter(c=>c.id == id)[0]
                 dispatch.products.updatedCategory({...targetCategory,...updatedFiels})
              
             }
        },
        removeCatgory(id,state){
             //if we romve category its associeted products should be moved to other catgory 
             //set their category field to 0 
             if(id)
             {
                 const targetCategory = state.products.categories.filter(c=>c.id == id)[0]
                 dispatch.products.removedCategory({...targetCategory,...updatedFiels})
              
             }
        },

     

        fetchProducts(somthing,state){
             //do we fetch all products at app start 
             //get products from asyncstorage
             //get products from firebase
             dispatch.products.fetchedProducts(productsList)
        },
        addProduct({name,category,image,price1,ref,price2,price3,price4},state){
            if(name && category && image && price1 && ref && price2 && price3 && price4){
                const newProduct = productModel(name,category,image,price1,ref,price2,price3,price4)
                dispatch.products.addedProduct(newProduct)
           }
        },
        updateProduct({id,updatedFiels},state){
            if(id && updatedFiels)
            {
                const targetProduct= state.products.products.filter(p=>p.id == id)[0]
                dispatch.products.updatedProduct({...targetProduct,...updatedFiels})
             
            }
        },
        removeProduct(id,state){
            if(id)
            {
                const targetProduct = state.products.products.filter(p=>p.id == id)[0]
                dispatch.products.removedProduct(targetProduct)
            }
        },

    })
}
export default model
