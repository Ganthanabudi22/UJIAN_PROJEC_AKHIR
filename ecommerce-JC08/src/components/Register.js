import React from 'react'
import { Link,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { userRegister,loginWithGoogle } from './../1.actions'
import Loader from 'react-loader-spinner'
import firebase from 'firebase'
import Gregister from './../support/img/Hotel-Lev-Fitness-02.jpg'
import { provider } from './../support/google'

class Register extends React.Component{
    state = {error : ''}
    componentWillReceiveProps(newProps){
        if(newProps.error !== ""){
            this.setState({error : newProps.error})
        }
    }
    renderLoadingOrBtn =() => {
        if(this.props.loading === true){
            return <Loader
                    type="Audio"
                    color="#00BFFF"
                    height="50"	
                    width="50"
                    />
        }else{
            return <button type="button"    className="btn btn-primary" style={{width:"300px", marginLeft : "30px"}} onClick={this.onBtnRegisterClick} ><i className="fas fa-sign-in-alt"  /> Sign Up!</button>
        }
    }

    renderErrorMessege = () => {
        if(this.state.error !== ""){
            return <div class="alert alert-danger mt-3" role="alert">
                        {this.state.error}
                    </div>
        }
    }
    onBtnRegisterClick = () => {
        var username = this.refs.username.value
        var namaLengkap = this.refs.namaLengkap.value
        var password = this.refs.password.value
        var email = this.refs.email.value
        var phone = this.refs.phone.value
        if(username === "" || namaLengkap ===""|| password ===""||email === "" ||phone ===null){
            this.setState({error : "Harus diisi semua"})
        }else{
            this.props.userRegister(username,namaLengkap,password,email,phone)
            this.refs.username.value =""
            this.refs.namaLengkap.value =""
            this.refs.password.value =""
            this.refs.email.value =""
            this.refs.phone.value =""
        }
    }   
    loginWithGoogle = () => {
        firebase.auth().signInWithPopup(provider)
        .then((res) =>{
            console.log(res)
            this.props.loginWithGoogle(res.user.email)
        })
        .catch((err) => console.log(err))
    }
    render(){
        // if(this.props.user !== ""){
        //     return <Redirect to='/' />
        // }
        return(
            <div className="myBody " style={{minHeight:"600px"}}>
                    <div className="row">
                        <div className = "col-md-7">
                            <img className = 'loginimg' src={Gregister} style={{width:"850px", height:"500px"}} />
                        </div>
                        <div className="col-md-4" style={{backgroundColor: "black",marginRight:"-90px", marginLeft:"100px", marginBottom:"0px"}}>
                            <form className="border mb-3" style={{padding:"20px", borderRadius:"5%",marginTop:"50px"}} ref="formLogin">
                                <fieldset>
                                    
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" style={{color:"white"}}>Username</label>
                                        <div className="col-sm-9">
                                        <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" required autoFocus/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" style={{color:"white"}}>Nama Lengkap</label>
                                        <div className="col-sm-9">
                                        <input type="text" ref="namaLengkap" className="form-control" id="inputPassword" placeholder="Password" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" style={{color:"white"}}>Password</label>
                                        <div className="col-sm-9">
                                        <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" style={{color:"white"}}>Email</label>
                                        <div className="col-sm-9">
                                        <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email@mail.com" required />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label" style={{color:"white"}}>Phone</label>
                                        <div className="col-sm-9">
                                        <input type="phone" ref="phone" className="form-control" id="inputPhone" placeholder="Ex: 0857xxxxxxxx" required />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <div className="col-12">
                                        {this.renderLoadingOrBtn()}
                                        <div> <button className='btn border-primary mt-2' onClick={this.loginWithGoogle} style={{width:"300px", color:"white", marginLeft : "30px"}} > Login With Google</button> </div>
                                        {this.renderErrorMessege()}
                                        </div>
                                            
                                    </div>
                                    <div className="btn my-auto" style={{color:"white"}}><p>Already have Account? <Link to="/login" className="border-bottom">Login</Link></p></div>
                                    
                                </fieldset>
                            </form>
                        </div>
                    </div>                
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user.username,
        loading : state.user.loading,
        error : state.user.error
    }
} 

export default connect(mapStateToProps,{userRegister,loginWithGoogle})(Register)