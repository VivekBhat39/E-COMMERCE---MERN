import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './component/Home';
import Header from './component/Header';
import AllProduct from './component/AllProduct';
import About from './component/About';
import Contact from './component/Contact';
import AdminLogin from './component/admin/AdminLogin';
import CheckOut from './component/CheckOut';
import Cart from './component/Cart';
import Footer from './component/Footer';
import Sidebar from './component/Sidebar';
import Dashboard from './component/admin/Dashboard';
import AddProduct from './component/admin/AddProduct';
import Products from './component/admin/Products';
import Orders from './component/admin/Orders';
import SignUp from './component/customer/SignUp';
import SignIn from './component/customer/Signin';
import OrderConfirmation from './component/customer/OrderConfirmation ';
import Customers from './component/admin/Customers';
import CustomerOrders from './component/customer/CustomerOrders';

function Layout() {
  const location = useLocation();

  // Hide Header & Footer for SignIn and SignUp pages
  const hideHeaderFooter = location.pathname === '/signup' || location.pathname === '/signin' || location.pathname === '/adminLogin';

  return (
    <div style={{ textAlign: "center" }}>
      {!hideHeaderFooter && <Header />}

      {/* Added margin for spacing */}
      <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allProduct' element={<AllProduct />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/checkOut' element={<CheckOut />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/customer-orders" element={<CustomerOrders />} />
          {/* <Route path='/adminLogin' element={<AdminLogin />} /> */}

          {/* Hide Header & Footer on these routes */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/adminLogin' element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path='/admin' element={<Sidebar />} >
            <Route index element={<Dashboard />} />
            <Route path='/admin/addproduct' element={<AddProduct />} />
            <Route path='/admin/addproduct/:productId' element={<AddProduct />} />
            <Route path='/admin/products' element={<Products />} />
            <Route path='/admin/orders' element={<Orders />} />
            <Route path='/admin/customers' element={<Customers />} />
          </Route>
        </Routes>
      </div>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
