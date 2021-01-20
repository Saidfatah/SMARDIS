//admin screen 
import  AdminCat    from '../AdminPanel/Catalogue/Catalogue'  
import AdminCateg  from '../AdminPanel/Categories/Categories'
import AdminCl    from '../AdminPanel/Clients/Clients'
import AdminDash  from '../AdminPanel/DashBoard/AdminDashBoard'
import AdminDist    from '../AdminPanel/Distrubutors/Distrubutors'
import AdminOrders  from '../AdminPanel/Orders/OrdersValidated'
import AdminProds  from '../AdminPanel/Products/Products'
import AdminSls     from '../AdminPanel/Sales/Sales'
import AdminSec     from '../AdminPanel/Sectors/Sectors'
import AdminSch   from '../AdminPanel/Schedule/Schedule'
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



export const AdminCatalogue = AdminCat  ;
export const AdminCategories= AdminCateg ;
export const AdminClients   = AdminCl ;
export const AdminDashBoard = AdminDash ;
export const AdminDistrubutors    = AdminDist ;
export const AdminOrdersValidated = AdminOrders ;
export const AdminProducts = AdminProds ;
export const AdminSales    = AdminSls ;
export const AdminSectors  = AdminSec ;
export const AdminSchedule = AdminSch ;
export const AdminAddNewAdmin= AdminAddAdmin ;
export const AdminRegisterDistrubutor= AdminRegisterDist ;


export const DistrubutorSectors= DistrubutorSect  ;
export const DistrubutorCatalogue= DistrubutorCat ;
export const DistrubutorDashBoard= DistrubutorDash  ;
export const DistrubutorCart= DistrubutorCrt ;
export const DistrubutorClientDelivry= DistrubutorClient  ;
export const DistrubutorTodaysOrders= DistrubutorTodays  ;
export const DistrubutorValidatedCommands= DistrubutorVc  ;
export const DistrubutorBillTable= Distrubutorbt ;

export const Login= Log ;



