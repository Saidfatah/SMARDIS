import React from 'react'
import { List } from 'react-native-paper';

const Accordion=({parentArray})=> {
    // parent array 
    // subbArray 
    // childRendrer
    // subChild renderer

    return (
        <List.Section title={TITLE}>
             {parentArray.map((item,i)=> <List.Accordion
                     title={name }
                     titleStyle={styles.Title}
                     style={{
                         ...styles.AcordionHeader,
                         borderBottomLeftRadius: !expanded ?12:0,
                         borderBottomRightRadius:!expanded ?12:0 ,
                         marginBottom: expanded ?0:16 ,
                     }}
                     descriptionStyle={styles.AcordionWrrapper}
                     expanded={expanded}
                     onPress={handlePress}>
                       {/* <View style={styles.accordionContentWrrapper}>
                        {
                        sectorClients.map((sCl,index)=><ClientItem  key={index}  navigation={navigation} client={sCl}  />)
                        }  
                       </View> */}
                 </List.Accordion>
             )}
        </List.Section>
        
    )
}

export default Accordion
