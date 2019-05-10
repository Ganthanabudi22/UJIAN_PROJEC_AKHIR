import React from 'react'
import Axios from 'axios'
import swal from'sweetalert'
import {urlApi} from './../../support/urlApi'


class Category extends React.Component{
    state = {iscategory : [], isAdd : false, isEdit:false, editCategory:[],filter:''}
    componentDidMount (){
        this.getCategory()
    }
    //========================= FUNCTION MENYAMBUNGKAN API =================
    getCategory = () => {
        Axios.get(urlApi+'/getAllCategory')
        .then((res)=>{
            this.setState({iscategory : res.data})
        })
    }
    addCategory = () => {
        var category = this.refs.category.value
        var newData = {category}
        Axios.post(urlApi + '/addCategory', newData)
        .then((res)=>{
            if(typeof(res.data)==="string"){
                alert(res.data)
            }else{
                swal('Status Add' , 'Success Add to Category' , 'success')
                this.setState({iscategory: res.data,isAdd:false})
            }
        
            })
        .catch((err)=>console.log(err))
    }
    deleteCategory=(id)=>{
        Axios.delete(urlApi+'/deleteCategory/'+id)
        .then((res)=>{
            swal('Status Delete' , 'Category Behasil Di Hapus' , 'success')
            this.setState({iscategory:res.data})
        })
        .catch((err)=>console.log(err))
        
    }

    saveBtn = (id) => {
        var category = ''
        if(this.refs.categoryEdit.value === ""){
            this.cancelBtn()
        }else{
            category = this.refs.categoryEdit.value
            var newData = {category}
            Axios.put(urlApi+'/updateCategory/'+id,newData)
            .then((res)=>{
                if(typeof(res.data)==="string"){
                    alert(res.data)
                }else{
                    swal('Status Edit' , 'Success Edit Category' , 'success')
                    this.setState({iscategory: res.data,isAdd:false})
                }
            
                })
            .catch((err)=>console.log(err))
        }
    }


    //========================= AKHIR FUNCTION MENYAMBUNGKAN API =================

    //========================= FUNCTION ===================================
    onBtnFilter = () => {
        var filter_category = this.refs.filtercategory.value
        this.setState({filter : filter_category.toLowerCase()})
    }


    cancelCategory=()=>{
        this.setState({isAdd:false})
    }
    updateCategory = (id) => {
        this.setState({isEdit:true, editCategory :id})
    }
    cancelBtn=()=>{
        this.setState({isEdit:false})
    }


    renderCategory = () => {
        var arrFilter = this.state.iscategory.filter((val)=>{
            return val.category.toLowerCase().startsWith(this.state.filter)
        })
        var data = arrFilter.map((val,index)=>{
            if(this.state.isEdit === true && this.state.editCategory === val.id){
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td><input placeholder={val.category} ref='categoryEdit'/></td>
                        <td><input type='button' className='btn btn-primary' value='SAVE'onClick={()=>this.saveBtn(val.id)}/></td>
                        <td><input type='button' className='btn btn-danger' value='CANCLE' onClick={this.cancelBtn}/></td>                    
                    </tr>
                )
            }
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{val.category}</td>
                    <td><input type='button' className='btn btn-primary' value='Edit' onClick={()=>this.updateCategory(val.id)}/></td>
                    <td><input type='button' className='btn btn-danger' value='Delete' onClick={()=>this.deleteCategory(val.id)}/></td>
                </tr>
            )
        })
        return data
    }

    //========================= AKHIR FUNCTION =============================
    render(){
        return(
            <div>
                <h1 className = 'container' style={{marginLeft : '40%'}}>MANAGE CATEGORY</h1>
                <div className = 'container'>
                    <div className='row'>
                        <div className= 'col-md-1'><input type='button' value='Add User' style={{marginBottom:'10px'}} className='btn btn-primary' onClick={()=>this.setState({isAdd:true})}/></div>
                        <div className= 'col-md-3'><input type='text' placeholder='Filter Kategory' ref= 'filtercategory' onChange={this.onBtnFilter} className= 'form-control'/></div>
                        {/* <div className= 'col-md-1'><input type='button' value='Click' onClick={this.onBtnFilter} className= 'btn btn-info'/></div> */}
                    </div>
                        {
                            this.state.isAdd===true?
                            <div className='row'>
                            <div className='col-3'>
                            <input type='text' className='form-control' ref='category' placeholder='masukkan category'/>
                                </div>
                            <div className='col-3'>
                            <input type='button' className='btn btn-primary' value='Save' onClick={this.addCategory}/>
                            <input type='button' className='btn btn-danger' value='Cancel' onClick={this.cancelCategory}/>
                            </div>
                            
                            
                            </div>
                            : null
                        }
                        <table className='table'>
                            <thead>
                                <th>NO</th>
                                <th>CATEGORY</th>
                                <th>EDIT</th>
                                <th>DELET</th>
                            </thead>
                            <tbody>
                                {this.renderCategory()}
                            </tbody>
                        </table>
                </div>
            </div>
        )
    }

}
export default Category