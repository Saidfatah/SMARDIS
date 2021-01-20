import React  from 'react'
import { SwipeablePanel } from 'rn-swipeable-panel';
import ProductInfo from './ProductInfo'
import ProductAddToCart from './ProductAddToCart'

const SwipeAbleProductDetails=({selectedProduct,isPanelActive,setIsPanelActive,addCartItem,guest})=> {
 
    const closePanel = () => {
      setIsPanelActive(false);
    };

    
    return <SwipeablePanel  
           fullWidth= {true}
           openLarge= {true}
           showCloseButton= {true}
           onClose= {() => closePanel()}
           onPressCloseButton= {() => closePanel()} 
           isActive={isPanelActive}
           style={{padding:16}}
         >
        <ProductInfo product={selectedProduct} opened={true} />
        <ProductAddToCart {...{selectedProduct, guest, addCartItem}} />
    </SwipeablePanel>
    
}

export default SwipeAbleProductDetails


    

