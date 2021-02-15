import React  from 'react'
import { SwipeablePanel } from 'rn-swipeable-panel';
import ProductInfo from './ProductInfo'
import ProductAddToCart from './ProductAddToCart'

const SwipeAbleProductDetails=({scheduelId,selectedProduct,sector,isPanelActive,setIsPanelActive,addCartItem,guest,client})=> {
 
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
        <ProductAddToCart {...{setIsPanelActive,scheduelId,selectedProduct,sector, guest, addCartItem}} />
    </SwipeablePanel>
    
}

export default SwipeAbleProductDetails


    

