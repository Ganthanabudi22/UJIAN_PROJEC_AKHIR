import React from 'react'
import { Link ,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogin,cartCount } from './../1.actions'
import Loader from 'react-loader-spinner'
import cookie from 'universal-cookie'
import Glogin from  './../support/img/Hotel-Lev-Fitness-02.jpg'
import Dumble from '../support/img/barbell-clipart-bodybuilding.png'

// MENYIMPAN DATA DI BROWSER
const Cookie = new cookie()
class Login extends React.Component{
        
    // KE TRIGER KALAU ADA PERUBAHAN PROPS YAITU GLOBAL STATE
    componentWillReceiveProps(newProps){
        console.log(newProps)
        if(newProps.username !== ""){
            this.props.cartCount(newProps.username)        
        Cookie.set('userData',newProps.username,{path :'/'})}
    }
    onBtnLoginClick = () => {
        var username = this.refs.username.value
        var password = this.refs.password.value
        this.props.onLogin(username,password)

    }

    renderBtnOrLoading = () => {
        if(this.props.loading === true){
            return <Loader
                    type="Audio"
                    color="#00BFFF"
                    height="50"	
                    width="50"
                    />
        }else{
            return <button type="button" className="btn btn-primary" onClick={this.onBtnLoginClick} style={{width:"300px"}} ><i className="fas fa-sign-in-alt" /> Login</button>
        }
        
    }
    renderErrorMessege = () => {
        if(this.props.error !== ""){
            return <div class="alert alert-danger mt-3" role="alert">
                        {this.props.error}
                    </div>
        }
    }

    render(){
        if(this.props.username !== ""){
            return <Redirect to='/'/>
        }
        return(
            <div className="myBody" style={{minHeight:"600px"}}>
                <div className="row" >
                    <div className = "col-md-4" style={{backgroundColor: "black",marginRight:"-20px"}}>
                        <form className="border mb-3" style={{padding:"20px", borderRadius:"5%",marginTop:"50px"}} ref="formLogin">
                            <fieldset>
                                <div className="form-group-row justify-content-sm-center">
                                    <img className = 'loginimg' src={Dumble} style={{width:"75px", height:"125px",marginLeft:"130px"}} />
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" style={{color:"white"}}>Username</label>
                                    <div className="col-sm-9">
                                    <input type="text" ref="username" className="form-control" id="inputEmail" placeholder="Username" required autoFocus/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label"style={{color:"white"}}>Password</label>
                                    <div className="col-sm-9">
                                    <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                                    </div>
                                </div>
                                
                                <div className="form-group row">
                                    <div className="col-12" style={{textAlign:'center'}}>
                                        {this.renderBtnOrLoading()}
                                        {this.renderErrorMessege()}
                                    </div>
                                        
                                </div>
                                <div className="btn my-auto" style={{color:"white"}}><p>Don't have Account? <Link to="/register" className="border-bottom">Sign Up!</Link></p></div>
                            </fieldset>
                        </form>
                        
                    </div>
                    <div className = "col-md-7">
                        <img className = 'loginimg' src={Glogin} style={{width:"850px", height:"500px"}} />
                    </div>
                </div>                
            </div>
        )
    }
}
const mapsStateToProps =(state) => {
    return{
        username : state.user.username,
        loading : state.user.loading,
        error : state.user.error,
    }
}


export default connect(mapsStateToProps,{ onLogin,cartCount })(Login)