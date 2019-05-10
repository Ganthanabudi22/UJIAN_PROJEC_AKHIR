import React from 'react'
import Axios from 'axios'
import swal from 'sweetalert'
import {urlApi} from '../support/urlApi'
import { link } from 'fs';
import {connect} from 'react-redux'
import { Link } from '@material-ui/core';

class BuktiTrans extends React.Component {
    state = {selecctedFile : null}

    valueHandler = () => {
        var value = this.state.selecctedFile ? this.state.selecctedFile.name : 'Pick a Picture'
        return value
    }
    onChangeHendler = (event) => {
        //untuk mendapatkan file image
        this.setState({selecctedFile : event.target.files[0]})
    }
    onBtnSave = () => {
        if (this.refs.input.value === "") {
            swal('warning' , 'You have not entered a photo' , 'info')
        }else {
            var id = this.props.match.params.id
            var fd =new FormData()
            fd.append('edit', this.state.selecctedFile)
            Axios.put(urlApi+'/uploadTransaction/'+id,fd)
            
            .then((res)=>{
                swal('Status Add' , res.data , 'success')
                this.refs.input.value = ""
            })
        }
    }
    render () {
        return (
            <div className ='container' style={{textAlign:'center'}}>
                <h1>MASUKKAN BUKTI TRANSFER</h1>
                    <div className="form-group row"style={{marginTop:'20%'}}>
                    <div className="col-md-10" style ={{textAlign:'center', marginLeft : '7%'}}>
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Image</label>
                            <input style={{display : 'none'}} ref = 'input' type = 'file' onChange={this.onChangeHendler}/>   
                            <input className = 'form control btn-success' onClick={()=>this.refs.input.click()} type = 'button' value ={this.valueHandler()}  />
                    </div>
                    <div className="col-md-10" style={{marginLeft : '10%', marginTop : '5%'}}>
                        <Link to="/history"> <input className = 'form control btn-primary' onClick = {this.onBtnSave} type = 'button' value = 'TAMBAH BUKTI PRMBAYARAN'/></Link>
                    </div>
                    </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        id : state.user.id,
        username : state.user.username
    }
}

export default connect(mapStateToProps)(BuktiTrans);