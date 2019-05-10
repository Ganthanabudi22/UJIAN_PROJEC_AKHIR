import React from 'react'
import Axios from 'axios'
import swal from 'sweetalert'
import { urlApi } from '../../support/urlApi'

class TambahPrd extends React.Component {
    state={error:'',iscategory : [], selecctedFile : null}
componentDidMount() {
this.getDataCategory()
}
getDataCategory = () => {
    Axios.get(urlApi+'/getAllCategory')
    .then((res)=>{
        this.setState({iscategory:res.data})
    })
}

valueHandler = () => {
    var value = this.state.selecctedFile ? this.state.selecctedFile.name : 'Pick a Picture'
    return value
}
onChangeHendler = (event) => {
    //untuk mendapatkan file image
    this.setState({selecctedFile : event.target.files[0]})
}

addData = () => {
    if(this.refs.discount.value === ""){
        this.refs.discount.value = 0
    var data = {
        id_produk : this.refs.id_produk.value,
        nama_produk : this.refs.nama_produk.value,
        harga : this.refs.harga.value,
        discount : this.refs.discount.value,
        id_category : this.refs.category.value,
        deskripsi : this.refs.deskripsi.value
    }
        if(this.refs.id_produk.value === "" || this.refs.nama_produk.value === "" || this.refs.harga.value ==="" ||  this.refs.discount.value === "" || this.refs.category.value === "" || this.refs.input.value === ""){
            swal('Status Add' , 'Data Belum Lengkap Atau salah' , 'warning')
            
        }else{
            var fd = new FormData()
            fd.append('image', this.state.selecctedFile, this.state.selecctedFile.name)    
            fd.append('data',JSON.stringify(data))
            Axios.post(urlApi+'/addProduct', fd)
            .then ((res)=> {
                if(res.data.error){
                    // this.setState({error : res.data.msg})
                    alert(res.data.msg)
                }else{
                    
                        swal('Status Add' , res.data , 'success')
                        this.refs.id_produk.value = ""
                        this.refs.nama_produk.value = ""
                        this.refs.harga.value = ""
                        this.refs.discount.value = ""
                        this.refs.category.value = ""
                        this.refs.deskripsi.value = ""
                }
            }) 
            .catch((err)=>{
                console.log(err)
            })
        }
    }

}


printDataCategory=()=>{
    var data = this.state.iscategory.map((val)=>{
    return (
    <option value={val.id}>{val.category}</option>
    )
    })
    return data
}

    render() {
        return(
            <div>
            <h1>TAMBAH PRODUCT</h1>
            <div>
                <a href="/manage" class="btn btn-info" role="button">kembali Product</a>
            </div>
                <div className = 'container'>
                    <div className = 'row justify-conten-center'>
                    <div className = "col-md-7">
                    
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Id Product</label>
                        <div className="col-md-10">
                            <input type="text" className="form-control" ref = 'id_produk'  placeholder="id_produk" />
                        </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Nama</label>
                        <div className="col-md-10">
                            <input type="text" className="form-control" ref='nama_produk' placeholder="Nama Product" />
                        </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Harga</label>
                        <div className="col-md-10">
                            <input type="number" className="form-control" ref='harga'  placeholder="Harga" />
                        </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Discount</label>
                        <div className="col-md-10">
                            <input type="number" className="form-control" ref = 'discount'  placeholder="Discount"/>
                        </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Catagory</label>
                        <div className="col-md-10">
                            <select className='form-control form-control-sm' ref='category'>
                            {this.printDataCategory()}
                            </select>
                        </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Image</label>
                        <div className="col-md-10">
                            <input style={{display : 'none'}} ref = 'input' type = 'file' onChange={this.onChangeHendler}/>   
                            <input className = 'form control btn-success' onClick={()=>this.refs.input.click()} type = 'button' value ={this.valueHandler()}  />
                        </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Deskripsi</label>
                        <div className="col-md-10">
                            <textarea className="form-control" id="exampleFormControlTextarea1" ref='deskripsi' rows={3} defaultValue={""} />
                        </div>
                        </div>
                        <div className="form-group row">
                        <div className="col-md-10">
                            <input className="btn btn-info"  type = 'button' onClick={this.addData} value ="TAMBAG"/>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TambahPrd