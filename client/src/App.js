import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import EditUserScreen from './Screens/EditUserScreen';
import ProductListScreen from './Screens/ProductListScreen';
import EditProductScreen from './Screens/EditProductScreen';
import OrderListScreen from './Screens/OrderListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      
        <main className="py-3">
          <Container>
            <Route path="/order/:id" component={OrderScreen}/>
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/user/:id/edit" component={EditUserScreen} />
            <Route path="/admin/productlist" component={ProductListScreen} exact/>
            <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact/>
            <Route path="/admin/product/:id/edit" component={EditProductScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route exact path="/page/:pageNumber" component={HomeScreen} />
            <Route exact path="/search/:keyword/page/:pageNumber" component={HomeScreen} />
            <Route exact path="/" component={HomeScreen} />
          </Container>
          
        </main>
      
      <Footer />
    </Router>
  );
}

export default App;
