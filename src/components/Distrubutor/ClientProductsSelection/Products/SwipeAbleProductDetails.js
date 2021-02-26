import React ,{useState,useEffect} from 'react'
import { SwipeablePanel } from 'rn-swipeable-panel';
import ProductInfo from './ProductInfo'
import ProductAddToCart from './ProductAddToCart'
import DropDown from '../../../Common/DropDown'
import { View } from 'react-native';


const SwipeAbleProductDetails=({scheduelId,selectedProduct,sector,isPanelActive,setIsPanelActive,addCartItem,guest,client})=> {
    const [selectedProductPanel, setSelectedProductPanel] = useState(null)
     
    useEffect(() => {
      if(selectedProduct  ){
         if(selectedProduct.subs && selectedProduct.subs.length > 0){
           return setSelectedProductPanel(selectedProduct.subs[0])
         } 
         setSelectedProductPanel(selectedProduct)
      }
    }, [selectedProduct])
    
    const closePanel = () => {
      setIsPanelActive(false);
    };
    
    const PROPS={
            fullWidth: true,
            showCloseButton: true,
            closeOnTouchOutside: true,
           openLarge: true,
           onClose:() => closePanel(),
           onPressCloseButton:() => closePanel(),
           isActive:isPanelActive,
           style:{
             padding:16,
              flex:1,
          } 
    }
    return <SwipeablePanel  {...PROPS} >
          <View style={{
            display:"flex",
            justifyContent:"space-between",
            flex:1,
            backgroundColor:'#fff',
            marginTop:16
          }} >
          {
             selectedProduct && selectedProduct.subs && selectedProduct.subs.length > 0
              ?<DropDown 
               data={selectedProduct.subs.map(p=>({value : p, label :p.name}))} 
               keyExtractor={item=>item.value.id }
               setSelected={setSelectedProductPanel} 
               defaultValue={selectedProductPanel && selectedProductPanel.name}
               selected={selectedProductPanel}
              />
              :null
           }
           {
             selectedProductPanel && <ProductInfo product={selectedProductPanel} client={client} opened={true} />
           }
        
           {
             selectedProductPanel && <ProductAddToCart {...{
               client,
               setIsPanelActive,
               scheduelId,
               selectedProduct:selectedProductPanel,
               sector,
               guest,
               addCartItem
           }} />
           }
        
          </View>
    </SwipeablePanel>
    
}

export default SwipeAbleProductDetails


    

