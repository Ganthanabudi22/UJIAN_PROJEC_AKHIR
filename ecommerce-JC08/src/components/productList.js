import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { urlApi } from './../support/urlApi'
import './../support/css/product.css'
import Axios from 'axios';
import swal from 'sweetalert';
import { cartCount } from './../1.actions'
import { connect} from 'react-redux'
import queryString from 'query-string'
import {withRouter} from 'react-router-dom'
// import gambar from './../../../gambar/produk/Background-Kertas-kecil2.jpg'


class ProductList extends React.Component{
    state = {listProduct : [], searchByName:''}

    componentDidMount(){
        this.getDataProduct()
        this.getDataUrl()
    }
    getDataProduct = () => {
        axios.get(urlApi + '/getAllProduct')
        .then((res) => {
            this.setState({listProduct : res.data})
    })
        .catch((err) => console.log(err))
    }
    addProduct = (id) => {
        var newData = {
            user_name_cart : this.props.username,
            id_produk_cart : id,
            qty : 1
        }
        Axios.get(urlApi +'/getCart?id_produk_cart='+id+'user_name_cart='+this.props.username)
        .then((res) => {
            if(res.data.length > 0){
                Axios.put(urlApi+'/updateCart/'+res.data[0].id ,{...newData , qty : parseInt(res.data[0].qty) + newData.qty})
                swal('Add Product' , 'Suksees' , 'success')
            }else{
                Axios.post(urlApi +'/addTocart',newData)
                .then((res) => {
                    swal('Add Product' , 'Suksees' , 'success')
                    this.props.cartCount(this.props.username)
                })
                .catch((err) => console.log(err))
            }
        })
    }

    getDataUrl = () => {
        if(this.props.location.search){
            var Obj = queryString.parse(this.props.location.search)
            this.setState({searchByName:Obj.nama ? Obj.nama:''})
        }
    }

    searchByName = () => {
        this.pushUrl()
        this.setState({searchByName:this.refs.byName.value.toLowerCase()})
    }
        pushUrl = () => {
            var newLink = `/product/search`
            var params = []
            if(this.refs.byName.value){
                params.push({
                    params:'nama',
                    value:this.refs.byName.value
            })
            }
        for(var i = 0; i < params.length; i++){
            if(i===0){
                newLink+='?'+ params[i].params +'='+ params[i].value
            }
        }
        this.props.history.push(newLink)

    }

    renderProdukJsx = () => {
        var arrFiltering = this.state.listProduct.filter((val)=>{
            return (val.nama_produk.toLowerCase().startsWith(this.state.searchByName))
        })
        var jsx = arrFiltering.map((val) => {
            return (
                <div className="card col-md-3 mr-5 mt-3" style={{width: '15rem', backgroundColor:'gray' }}>
                    <Link to={'/product-detail/' + val.id}><img className="card-img-top img" height='250px' style={{marginTop:'10px'}}  src={urlApi+'/'+val.img} alt="Card" /></Link>
                    
                    {/* { Pake if ternary (karena melakukan pengkondisian di dalam return)} */}


                    {   
                        val.discount > 0 ?
                        <div className='discount'>{val.discount}%</div>
                        : null
                    }
                    <div className="card-body">
                    <h4 className="card-text">{val.nama_produk}</h4>

                    {
                        val.discount > 0 ?
                        <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga}</p>
                        : null
                    }

                    <p style={{display:'inline' , marginLeft:'10px',fontWeight:'500'}}>Rp. {val.harga - (val.harga*(val.discount/100))}</p>
                    <input type='button' className='d-block btn btn-primary' onClick={()=> this.addProduct(val.id)} value='Add To Cart' />
                    </div>
                </div>
            )
        //  }
        })

        return jsx
    }
    render(){
        return(
            <div className='container'>
                <div className='col-md-3' style={{paddingTop:'20px',paddingBottom:'20px', marginLeft:'-25px'}}>
                    <input type='text' placeholder='Search By Name' className='form-control form-control-sm' ref='byName' onChange={this.searchByName}/>
                </div>
                <div className='row justify-content-center' style={{backgroundColor:'black'}}>
                    {this.renderProdukJsx()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username : state.user.username
    }
}

export default connect(mapStateToProps,{cartCount})(withRouter(ProductList));