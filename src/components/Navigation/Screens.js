//admin screen 
import AdminCat    from '../AdminPanel/Catalogue/Catalogue'  
import AdminCateg  from '../AdminPanel/Categories/Categories'
import AdminAddCateg  from '../AdminPanel/Categories/Add category/AddCategory'
import AdminCategP  from '../AdminPanel/Categories/Category page/CategoryPage'
import AdminCl    from '../AdminPanel/Clients/Clients List/Clients'
import AdminAddCl    from '../AdminPanel/Clients/Add client/AddClient'
import AdminClientP    from '../AdminPanel/Clients/client Page/ClientPage'
import AdminDash  from '../AdminPanel/DashBoard/AdminDashBoard'
import AdminDist    from '../AdminPanel/Distrubutors/Distrubutors'
import AdminAddDist    from '../AdminPanel/Distrubutors/Add distrubutor/AddDistrubutor'
import AdminDistPage    from '../AdminPanel/Distrubutors/Distrubutor page/DistrubutorPage'
import AdminOrders  from '../AdminPanel/Orders/OrdersValidated'
import AdminProds  from '../AdminPanel/Products/Products'
import AdminaddProd  from '../AdminPanel/Products/Add product/AddProduct'
import AdminProductP  from '../AdminPanel/Products/Product Page/ProductPage'
import AdminSls     from '../AdminPanel/Sales/Sales'
import AdminSch   from '../AdminPanel/Schedule/Schedule'
import AdminListSch   from '../AdminPanel/Schedule/ListOfSchedules/ListOfSchedules'
import AdminSec     from '../AdminPanel/Sectors/Sectors'
import AdminAddSec     from '../AdminPanel/Sectors/Add sector/AddSector'
import AdminAddAdmin     from '../Auth/Admin/AddNewAdmin'
import AdminRegisterDist   from '../Auth/Admin/RegisterDistrubutor'

//Distrubutor screens
import DistrubutorDash from '../Distrubutor/DashBoard/DistrubutorDashBoard'
import DistrubutorSect  from '../Distrubutor/sectors/sectors'
import DistrubutorTodays   from '../Distrubutor/TodaysOrders/TodaysOrders'
import DistrubutorCat  from '../Distrubutor/Catalogue/Catalogue'
import DistrubutorClient     from '../Distrubutor/ClientProductsSelection/ClientDelivry'
import DistrubutorCrt   from '../Cart/Cart'
import DistrubutorVc   from '../Distrubutor/validatedCommands/ValidatedCommands'
import Distrubutorbt   from '../Distrubutor/validatedCommands/BillTable'

//common 
import Log    from '../Auth/Login/Login'
import Autho    from '../Auth/Authorizer/Authorizer'


export const AdminAddClient    = AdminAddCl ;
export const AdminAddSector    = AdminAddSec ;
export const AdminClientPage   = AdminClientP ;
export const AdminClients      = AdminCl ;
export const AdminCatalogue    = AdminCat  ;
export const AdminCategories   = AdminCateg ;
export const AdminCategoryPage = AdminCategP ;
export const AdminAddCategory  = AdminAddCateg ;
export const AdminDashBoard    = AdminDash ;
export const AdminSales        = AdminSls ;
export const AdminSectors      = AdminSec ;
export const AdminSchedule     = AdminSch ;
export const AdminProducts     = AdminProds ;
export const AdminProductPage  = AdminProductP ;
export const AdminAddProduct   = AdminaddProd;
export const AdminAddNewAdmin  = AdminAddAdmin ;
export const AdminDistrubutors    = AdminDist ;
export const AdminAddDistrubutor   = AdminAddDist ;
export const AdminDistrubutorPage    = AdminDistPage ;
export const AdminOrdersValidated = AdminOrders ;
export const AdminListOfSchedules = AdminListSch ;
export const AdminRegisterDistrubutor= AdminRegisterDist ;


export const DistrubutorSectors   = DistrubutorSect  ;
export const DistrubutorCatalogue = DistrubutorCat ;
export const DistrubutorDashBoard = DistrubutorDash  ;
export const DistrubutorCart= DistrubutorCrt ;
export const DistrubutorClientDelivry = DistrubutorClient  ;
export const DistrubutorTodaysOrders  = DistrubutorTodays  ;
export const DistrubutorValidatedCommands= DistrubutorVc  ;
export const DistrubutorBillTable= Distrubutorbt ;

export const Login= Log ;
export const Authorizer= Autho  ;



