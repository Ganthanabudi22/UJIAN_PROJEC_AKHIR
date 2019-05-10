import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Product from './components/productList'
import TambahPrd from './components/admin/tambahPrd'
import ManageProduct from './components/admin/manageProduct'
import ManageCategory from './components/admin/manageCategory'
import ManageHistory from './components/admin/manageHistory'
import BuktiTrans from './components/buktiTrans'
import PageNotFound from './components/pageNotFound'
import ProductDetail from './components/productDetail'
import ScrollToTop from './components/scrollToTop'
import Cart from './components/cart'
import History from './components/historyTransaksi'
import { Route ,withRouter, Switch } from 'react-router-dom' 
import {connect} from 'react-redux'
import cookie from 'universal-cookie'
import Loader from 'react-loader-spinner'
import { keepLogin,cartCount,cookieChecked } from './1.actions'
import './App.css';


// withRouter => Untuk tersambung ke Reducer dengan connect, 
// tapi di dalam komponen ada routing

const objCookie = new cookie()
class App extends Component {
  componentDidMount(){
    
    var terserah = objCookie.get('userData')
    if(terserah){
      this.props.keepLogin(terserah)
      this.props.cartCount(terserah)
    }else{
      this.props.cookieChecked()
    }
  }
  
  render() {
    if(this.props.cookie){
    return (
      <div>
          <Navbar/>
          <ScrollToTop>
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/login' component={Login} exact/>
                <Route path='/register' component={Register} exact/>
                <Route path='/product' component={Product} exact/>
                <Route path='/cart' component={Cart} exact/>
                <Route path='/manage' component={ManageProduct} exact/>
                <Route path='/manageHistory' component={ManageHistory} exact/>
                <Route path='/buktiTrans/:id' component={BuktiTrans} exact/>
                <Route path='/tambahPrd' component={TambahPrd} exact/>
                <Route path='/category' component={ManageCategory} exact/>
                <Route path='/history' component={History} exact/>
                <Route path='/product-detail/:id' component={ProductDetail} exact/>
                <Route path='*' component={PageNotFound} exact/>
            </Switch>
          </ScrollToTop>
      </div>
    );
  }
  return <div className='centervh'>
            <Loader
              type="Bars"
              color="#00BFFF"
              height="100"	
              width="100"
              />
        </div>
  }
}

const mapStateToProps = (state) => {
  return {
    cookie : state.user.cookie,
    id : state.user.id
  }
}

export default withRouter(connect(mapStateToProps,{keepLogin,cartCount,cookieChecked})(App));
