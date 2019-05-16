import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { connect } from 'react-redux'
import { cartCount } from './../1.actions'
import swal from 'sweetalert';

class ProductDetail extends React.Component{
    state = {product : {}, qty:1}
    componentDidMount(){
        this.getDataApi()
    }
    
    getDataApi = () => {
        var id = this.props.match.params.id
        Axios.get(urlApi+'/getProductBy/'+id)
        .then((res) => {
            if(res.data.error){
                alert(res.data.msg)
            }else{
                this.setState({product : res.data[0]})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // qtyValidation =() => {
    //     var qty = this.refs.inputQty.value
    //     if(qty < 1) {
    //         this.refs.inputQty.value = 1
    //     }
    // }

    kurang=()=>{
        if(this.state.qty>1){

            this.setState({qty:this.state.qty-1})
        }
    }
    tambah=()=>{
        this.setState({qty:this.state.qty+1})
    }

    addToCart = () => {
        var newData = {
            user_name_cart : this.props.username,
            id_produk_cart : this.state.product.id,
            catatan : this.refs.catatan.value,
            qty : this.state.qty
        }
                Axios.post(urlApi + '/addTocart',newData)
                .then((res) => {
                    if(res.data.error){
                        swal("Error", res.data.msg, "error")
                    }else{
                        swal('Status Add' , 'Success Add to Cart' , 'success')
                        this.props.cartCount(this.props.username)
                    }
                    
                    
                })
                .catch((err) => console.log(err))
        
        
    
    }

    loginDulu = () => {
        swal('LogIn Dulu' , 'Anda Harus Login Telebih Dahulu' , 'warning')
        
    }

    render(){
        var {nama_produk,img,discount,deskripsi,harga} = this.state.product
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                    <div className="card" style={{width: '100%'}}>
                        <img className="card-img-top" src={urlApi+'/'+img} alt="Card image cap" />
                        <div className="card-body">
                        </div>
                    </div>
                    </div>

                    <div className='col-md-8'>
                        <h1 style={{color:'#4C4C4C'}}>{nama_produk}</h1>
                        <div style={{backgroundColor:'#D50000',
                                        width:"50px",
                                        height:'22px',
                                        color : 'white',
                                        textAlign:'center',
                                        display:'inline-block'}} >
                            {discount}%
                        </div>
                        <span style={{fontSize:'12px',
                                        fontWeight:'600',
                                        color:'#606060',
                                        marginLeft:'10px',
                                        textDecoration:'line-through'}}> Rp. {harga} </span>

                        <div style={{fontSize:'24px',
                                        fontWeight : '700',
                                        color:'#FF5722',
                                        marginTop:'20px'}}>Rp. {harga - (harga * (discount/100))}</div>

                            <div className='col-5' style={{marginTop:'20px'}}>JUMLAH</div>
                            <div className='col-5' style={{marginTop:'20px'}}>
                                <div className='row'>
                                    <div className='col-3'>
                                        <i class="fas fa-minus" onClick={this.kurang} style={{cursor:'pointer'}}></i>
                                    </div>
                                    <div className='col-6' style={{textAlign:"center",marginLeft:'-30px'}} >
                                    <span>{this.state.qty}</span>

                                    </div>
                                    <div className='col-3'>
                                        <i class="fas fa-plus" onClick={this.tambah} style={{cursor:'pointer'}}></i>

                                    </div>
                                    
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'15px',
                                            color:'#606060',
                                            fontWeight:'700',
                                            fontSize:'14px'}}>Catatan Untuk Penjual (Opsional)
                                </div>
                                <input type='text' style={{marginTop:'13px'}} ref='catatan' placeholder='Contoh "Cek Terlebih Dahulu"' className='form-control'/>
                            </div>
                        {/* </div> */}
                        <div className='row mt-4'>
                            <div className='col-md-8' style={{marginLeft:'15px'}}>
                                <p style={{color:'#606060',fontStyle:'italic'}}>{deskripsi}</p>
                            </div>

                        </div>
                        {this.props.username === "" 
                        ?
                            <div className='row mt-4' style={{marginLeft:'15px'}}>
                                <input type='button' disabled className='btn btn-success col-md-3' onClick={this.loginDulu} value='ADD TO CART'></input>   
                            </div>
                        :
                            <div className='row mt-4' style={{marginLeft:'15px'}}>
                                <input type='button' className='btn btn-success col-md-3' value='ADD TO CART' onClick={this.addToCart}></input>   
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        cart : state.cart.count
    }
}

export default connect(mapStateToProps,{cartCount})(ProductDetail);
