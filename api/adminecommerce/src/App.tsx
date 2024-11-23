import { Admin, Resource, ShowGuesser, EditGuesser, ListGuesser, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonIcon from '@mui/icons-material/Person';
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./component/Dashboard";
import { authProvider } from "./authProvider";
import { CategoryList, CategoryCreate, CategoryEdit } from "./component/category";
import { ProductList, ProductCreate, ProductEdit } from "./component/product";
import { UserList, UserEdit } from "./component/users";
import { CartList, CartShow } from "./component/Carts";
import { OrderList, OrderShow } from "./component/Orders";
import ProductImageUpdate from "./component/ProductImageUpdate";

export const App = () => (
  <Admin authProvider={authProvider} layout={Layout} dataProvider={dataProvider} dashboard={Dashboard}>

    {/* <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
    <Resource name="users" list={UserList} show={ShowGuesser}  icon={UserIcon} /> */}
    <Resource name="users" list={UserList} edit={UserEdit} icon={PersonIcon} />
    <CustomRoutes>
      <Route path="/products/:id/update-image" element={<ProductImageUpdate />} />
    </CustomRoutes>
    <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} icon={CategoryIcon} />
    <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} icon={Inventory2Icon}/>
    <Resource name="carts" list={CartList} show={CartShow} icon={ShoppingCartIcon}/>
    <Resource name="orders" list={OrderList} show={OrderShow} icon={LocalAtmIcon}/>
  </Admin>
);
