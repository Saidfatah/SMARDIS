import React,{useState} from 'react'
import {Text,StyleSheet,TouchableOpacity,View} from 'react-native'
import AutoComplete from 'react-native-autocomplete-input'
import Label from '../../../Common/Label'
import {colors} from '../../../Common/Colors'
import FontAweasomeIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons';


const CITIES = [
    "Aïn Harrouda",
    "Bouskoura",        
    "Casablanca",        
    "Médiouna", 
    "Mohammadia",  
    "Tit Mellil", 
    "Ben Yakhlef",  
    "Bejaâd",
    "Ben Ahmed",
    "Benslimane",
    "Berrechid", 
    "Boujniba",
    "Boulanouare",
    "Bouznika",
    "Deroua",
    "El Borouj",       
    "El Gara",       
    "Guisser",       
    "Hattane",       
    "Khouribga",       
    "Loulad",       
    "Oued Zem",       
    "Oulad Abbou",       
    "Oulad H'Riz Sahel",       
    "Oulad M'rah",       
    "Oulad Saïd",       
    "Oulad Sidi Ben Daoud",       
    "Ras El Aïn",       
    "Settat",       
    "Sidi Rahhal Chataï",       
    "Soualem",       
    "Azemmour",       
    "Bir Jdid",       
    "Bouguedra",       
    "Echemmaia",       
    "El Jadida",       
    "Hrara",       
    "Ighoud",       
    "Jamâat Shaim",       
    "Jorf Lasfar",       
    "Khemis Zemamra",       
    "Laaounate",       
    "Moulay Abdallah",       
    "Oualidia",       
    "Oulad Amrane",       
    "Oulad Frej",       
    "Oulad Ghadbane",       
    "Safi",       
    "Sebt El Maârif",       
    "Sebt Gzoula",       
    "Sidi Ahmed",       
    "Sidi Ali Ban Hamdouche",       
    "Sidi Bennour",       
    "Sidi Bouzid",    
    "Sidi Smaïl",    
    "Youssoufia",    
    "Fès",    
    "Aïn Cheggag",    
    "Bhalil",    
    "Boulemane",    
    "El Menzel",    
    "Guigou",    
    "Imouzzer Kandar",    
    "Imouzzer Marmoucha",    
    "Missour",    
    "Moulay Yaâcoub",    
    "Ouled Tayeb",    
    "Outat El Haj",    
    "Ribate El Kheir",    
    "Séfrou",    
    "Skhinate",    
    "Tafajight",    
    "Arbaoua",    
    "Aïn Dorij",    
    "Dar Gueddari",    
    "Had Kourt",    
    "Jorf El Melha",    
    "Kénitra",    
    "Khenichet",    
    "Lalla Mimouna",    
    "Mechra Bel Ksiri",    
    "Mehdia",    
    "Moulay Bousselham",    
    "Sidi Allal Tazi",    
    "Sidi Kacem",    
    "Sidi Slimane",    
    "Sidi Taibi",    
    "Sidi Yahya El Gharb",    
    "Souk El Arbaa",    
    "Akka",    
    "Assa",
    "Bouizakarne",
    "El Ouatia",
    "Es-Semara",
    "Fam El Hisn",
    "Foum Zguid",   
    "Guelmim",
    "Taghjijt",
    "Tan-Tan",     
    "Tata",         
    "Zag",
    "Marrakech",
    "Ait Daoud",
    "Amizmiz",  
    "Assahrij",
    "Aït Ourir",
    "Ben Guerir",
    "Chichaoua",
    "El Hanchane",
    "El Kelaâ des Sraghna",
    "Essaouira",
    "Fraïta",
    "Ghmate",
    "Ighounane",
    "Imintanoute",
    "Kattara",
    "Lalla Takerkoust",
    "Loudaya",
    "Lâattaouia",
    "Moulay Brahim",
    "Mzouda",
    "Ounagha",
    "Sid L'Mokhtar",
    "Sid Zouin",
    "Sidi Abdallah Ghiat",
    "Sidi Bou Othmane",
    "Sidi Rahhal",
    "Skhour Rehamna",
    "Smimou",
    "Tafetachte",
    "Tahannaout",
    "Talmest",
    "Tamallalt",
    "Tamanar",
    "Tamansourt",
    "Tameslouht",
    "Tanalt",
    "Zeubelemok",
    "Meknès‎",
    "Khénifra",
    "Agourai",
    "Ain Taoujdate",
    "MyAliCherif",
    "Rissani",
    "Amalou Ighriben",
    "Aoufous",
    "Arfoud",
    "Azrou",
    "Aïn Jemaa",
    "Aïn Karma",
    "Aïn Leuh",
    "Aït Boubidmane",
    "Aït Ishaq",
    "Boudnib",
    "Boufakrane",
    "Boumia",
    "El Hajeb",
    "Elkbab",
    "Er-Rich",
    "Errachidia",
    "Gardmit",
    "Goulmima",
    "Gourrama",
    "Had Bouhssoussen",
    "Haj Kaddour",
    "Ifrane",
    "Itzer",
    "Jorf",
    "Kehf Nsour",
    "Kerrouchen",
    "M'haya",
    "M'rirt",
    "Midelt",
    "Moulay Ali Cherif",
    "Moulay Bouazza",
    "Moulay Idriss Zerhoun",
    "Moussaoua",
    "N'Zalat Bni Amar",
    "Ouaoumana",
    "Oued Ifrane",
    "Sabaa Aiyoun",
    "Sebt Jahjouh",
    "Sidi Addi",
    "Tichoute",
    "Tighassaline",
    "Tighza",
    "Timahdite",
    "Tinejdad",
    "Tizguite",
    "Toulal",
    "Tounfite",
    "Zaouia d'Ifrane",
    "Zaïda",
    "Ahfir",
    "Aklim",
    "Al Aroui",
    "Aïn Bni Mathar",
    "Aïn Erreggada",
    "Ben Taïeb",
    "Berkane",
    "Bni Ansar",
    "Bni Chiker",
    "Bni Drar",
    "Bni Tadjite",
    "Bouanane",
    "Bouarfa",
    "Bouhdila",
    "Dar El Kebdani",
    "Debdou",
    "Douar Kannine",
    "Driouch",
    "El Aïoun Sidi Mellouk",
    "Farkhana",
    "Figuig",
    "Ihddaden",
    "Jaâdar",
    "Jerada",
    "Kariat Arekmane",
    "Kassita",
    "Kerouna",
    "Laâtamna",
    "Madagh",
    "Midar",
    "Nador",
    "Naima",
    "Oued Heimer",
    "Oujda",
    "Ras El Ma",
    "Saïdia",
    "Selouane",
    "Sidi Boubker",
    "Sidi Slimane Echcharaa",
    "Talsint",
    "Taourirt",
    "Tendrara",
    "Tiztoutine",
    "Touima",
    "Touissit",
    "Zaïo",
    "Zeghanghane",
    "Rabat",       
    "Salé",
    "Ain El Aoua",  
    "Harhoura",   
    "Khémisset",
    "Oulmès", 
    "Rommani",
    "Sidi Allal El Bahraoui",
    "Sidi Bouknadel",
    "Skhirate",
    "Tamesna",
    "Témara",
    "Tiddas",
    "Tiflet",
    "Touarga",
    "Agadir",
    "Agdz",
    "Agni Izimmer",
    "Aït Melloul",
    "Alnif",
    "Anzi",
    "Aoulouz",
    "Aourir",
    "Arazane",
    "Aït Baha",
    "Aït Iaâza",
    "Aït Yalla",
    "Ben Sergao",
    "Biougra",
    "Boumalne-Dadès",
    "Dcheira El Jihadia",
    "Drargua",
    "El Guerdane",
    "Harte Lyamine",
    "Ida Ougnidif",
    "Ifri",
    "Igdamen",
    "Ighil n'Oumgoun",
    "Imassine",
    "Inezgane",
    "Irherm",
    "Kelaat-M'Gouna",
    "Lakhsas",
    "Lakhsass",
    "Lqliâa",
    "M'semrir",
    "Massa (Maroc)",
    "Megousse",
    "Ouarzazate",
    "Oulad Berhil",
    "Oulad Teïma",
    "Sarghine",
    "Sidi Ifni",
    "Skoura",
    "Tabounte",
    "Tafraout",
    "Taghzout",
    "Tagzen",
    "Taliouine",
    "Tamegroute",
    "Tamraght",
    "Tanoumrite Nkob Zagora",
    "Taourirt ait zaghar",
    "Taroudannt",
    "Temsia",
    "Tifnit",
    "Tisgdal",
    "Tiznit",
    "Toundoute",
    "Zagora",
    "Afourar",
    "Aghbala",
    "Azilal",
    "Aït Majden",
    "Beni Ayat",
    "Béni Mellal",
    "Bin elouidane",
    "Bradia",
    "Bzou",
    "Dar Oulad Zidouh",
    "Demnate",
    "Dra'a",
    "El Ksiba",
    "Foum Jamaa",
    "Fquih Ben Salah",
    "Kasba Tadla",
    "Ouaouizeght",
    "Oulad Ayad",
    "Oulad M'Barek",
    "Oulad Yaich",
    "Sidi Jaber",
    "Souk Sebt Oulad Nemma",
    "Zaouïat Cheikh",
    "Tanger‎",
    "Tétouan‎",
    "Akchour",
    "Assilah",
    "Bab Berred",
    "Bab Taza",
    "Brikcha",
    "Chefchaouen",
    "Dar Bni Karrich",
    "Dar Chaoui",
    "Fnideq",
    "Gueznaia",
    "Jebha",
    "Karia",
    "Khémis Sahel",
    "Ksar El Kébir",
    "Larache",
    "M'diq",
    "Martil",
    "Moqrisset",
    "Oued Laou",
    "Oued Rmel",
    "Ouazzane",
    "Point Cires",
    "Sidi Lyamani",
    "Sidi Mohamed ben Abdallah el-Raisuni",
    "Zinat",
    "Ajdir‎",
    "Aknoul‎",
    "Al Hoceïma‎",
    "Aït Hichem‎",
    "Bni Bouayach‎",
    "Bni Hadifa‎",
    "Ghafsai‎",
    "Guercif‎",
    "Imzouren‎",
    "Inahnahen‎",
    "Issaguen (Ketama)‎",
    "Karia (El Jadida)‎",
    "Karia Ba Mohamed‎",
    "Oued Amlil‎",
    "Oulad Zbair‎",
    "Tahla‎",
    "Tala Tazegwaght‎",
    "Tamassint‎",
    "Taounate‎",
    "Targuist‎",
    "Taza‎",
    "Taïnaste‎",
    "Thar Es-Souk‎",
    "Tissa‎",
    "Tizi Ouasli‎",
    "Laayoune‎",
    "El Marsa‎",
    "Tarfaya‎",
    "Boujdour‎",
    "Awsard",
    "Oued-Eddahab",
    "Stehat",
    "Aït Attab",
]


const AutoCompleteCities=({dispatch,selectedCities})=> {
    const [query, setquery] = useState("")

    const findCity=(query)=> {
        if (query === '') {
          return [];
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        return CITIES.filter(city => city.search(regex) >= 0).slice(0,10);
    }
  
    const Item=({ item, i })=>{
      const IS_SELECTED= selectedCities.filter(sc=>sc== item)[0] != undefined

      return <TouchableOpacity key={item + i} onPress={() =>{
        if(selectedCities.indexOf(item)>-1)return setquery("")
            dispatch({type:"SET_SELECTED_CITIES",value:[...selectedCities,item.toLowerCase()]})
            setquery("")
        }}>

       <View style={{
         padding:8,
         display:"flex",
         justifyContent:"flex-start",
         alignItems:"center",
         flexDirection:'row',
       }} >
         {
           IS_SELECTED
           ? <Icon  name={"checkmark-circle"}  size={20}  color={colors.GREEN} />
           : null
         }
        
       <Text style={{color:colors.BLACK}} >{item}</Text>
       </View>
    </TouchableOpacity> 
    }


    const SelectedItem=({ item, i })=>{

      const remove=()=>{
        dispatch({type:"SET_SELECTED_CITIES",value:[...selectedCities.filter(sc=>sc != item )]})
      }
      return <View style={styles.selectedProduct} >
         <Text style={{marginRight:16}} >{item}</Text>
         <TouchableOpacity onPress={remove}>
            <FontAweasomeIcon name="remove" size={20}  color={colors.RED} />
         </TouchableOpacity>
      </View>
    }

    const cities = findCity(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View>
        <Label label="Les regions du produit " mga={16} />
         <AutoComplete
         autoCapitalize="none"
         autoCorrect={false}
         containerStyle={styles.autocompleteContainer}
         data={cities.length === 1 && comp(query, cities[0]) ? [] : cities}
         defaultValue={query}
         placeholder="Chercher une ville"
         onChangeText={text => setquery(text)}
         keyExtractor={(item,i)=>item+i}
         renderItem={({ item, i }) =><Item  key={i+item} {...{ item, i }} />}
         inputContainerStyle={styles.inputStye}
         listContainerStyle={{
           width:'100%',
         }}
         listStyle={{
           width:'100%',
           flex:1,
           margin:0,
         }}
        />


        <View style={{display:'flex',flexDirection:'row',flexWrap:"wrap"}} >
         {
           selectedCities.map((item,i)=><SelectedItem  {...{ item, i,key:i+item }} />)
         }
        </View>
      </View>
    )
}

export default AutoCompleteCities

var styles = StyleSheet.create({
      autocompleteContainer: {
        flex: 1,
      },
      itemText: {
        fontSize: 15,
        margin: 2
      },
      inputStye:{
          borderColor:colors.BLACK,
          borderRadius:12,
          borderWidth:2,
          backgroundColor:'transparent'
      },
      descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 25
      },
      infoText: {
        textAlign: 'center'
      },
      titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
      },
      directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
      },
      openingText: {
        textAlign: 'center'
      },
      selectedProduct: { 
        padding:8 ,
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:'row',
        marginTop:4,
        marginRight:4,
        borderWidth:2,
        borderRadius:12,
        borderColor:colors.BLACK
       }
});
