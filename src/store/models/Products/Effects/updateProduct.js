import firestore from '@react-native-firebase/firestore'
import Storage from '@react-native-firebase/storage'


const DISCOUNT_CATEGORY="1111POROMOTION1111"
export default async  (args,state,dispatch)=>{
    try {
    const {id,navigation,name,regions,category,image,ref,price1,price2,price3,price4,discount,subCategory}=args
    let products = [...state.products.products]
    const targetProduct= products.filter(p=>p.ref == ref)[0]
    const targetProductCategories=targetProduct.category
    const targetProductIndex= products.indexOf(targetProduct)
    products[targetProductIndex] = {...targetProduct,targetProduct,name,category,image,price1,price2,price3,price4}
    

    const DISCOUNT= discount>0? (discount/100) : 1
 
    //remove previous man category 
    //don't emove special categories
    let CATEGORY=[]

    if(targetProductCategories.length ==1){
        CATEGORY=[category]
    }else if(targetProductCategories.length >1) {
        CATEGORY=[...targetProductCategories]
        CATEGORY[0]=category
    }

    //if we have applied a discount the product gets added to discountes category
    const hasDscountCategory = CATEGORY.indexOf(DISCOUNT_CATEGORY)
    if(DISCOUNT < 1){
       //but check if it hasn't already been added , maybe admin changed discount from .5 to .3 
       if( hasDscountCategory < 0){
           CATEGORY.push(DISCOUNT_CATEGORY)
       }
    }else{
        //check f product had been in discount category , but admin changed discount to 1 
        if( hasDscountCategory > -1){
            CATEGORY =[...CATEGORY].filter(c=>c!=DISCOUNT_CATEGORY)
        }
    }
 

    const updateResponse= await firestore()
                                .collection("products")
                                .doc(id)
                                .update({
                                    regions,
                                    name,
                                    category:CATEGORY,
                                    image,
                                    price1,
                                    price2,
                                    price3,
                                    price4,
                                    discount:discount||1
                                });
 
 
    dispatch.toast.show({
        type:'success',
        title:'Ajoute ',
        message:`Produit ${name} est modifier avec success`
    })
    dispatch.products.updatedProduct(products)
    navigation.navigate('ADMINproducts')
    } catch (error) {
        console.log(error)
    }
}