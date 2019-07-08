import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { Modal,ModalBody,ModalHeader, ModalFooter} from 'reactstrap';
import { Button , Icon} from 'semantic-ui-react'
import { urlApi } from '../../support/urlApi';
import swal from 'sweetalert'
import { connect } from 'react-redux'
import PageNotFound from './../pageNotFound'
import queryString from 'query-string'


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    isCategory:[],
    page: 0,
    rowsPerPage: 5,
    isEdit : false,
    editItem : {},
    selecctedFile : null,
    selectFileEdit : null,
    modal : false,
    byCategory:null,
    searchByName:''
  };
 handleChangePage = (event, page) => {
    this.setState({ page });
  };

  componentDidMount(){
    this.getData()
    this.getAllCategory()
    // this.getbYCategory()
    this.getDataUrl()
  }

  getData =() => {
      Axios.get(urlApi + '/getAllProduct')
      .then((res) => this.setState({rows : res.data}) )
      .catch((err) => console.log(err))
  }
  getAllCategory = () => {
    Axios.get(urlApi+'/getAllCategory')
    .then((res)=>this.setState({isCategory : res.data}))
    .catch((err)=>console.log(err))
    
}
  getByCategory = () => {
    var category = this.refs.categoryEdit.value
    // alert(category)
    Axios.get(urlApi+'/getByCategory/'+category)
    .then((res)=>this.setState({rows : res.data}))
    .catch((err)=>console.log(err))
}

onBtnSave =() => {
  var newData = 
  {
      id_produk : this.refs.idEdit.value === "" ? this.state.editItem.id_produk   : this.refs.idEdit.value,
      nama_produk : this.refs.namaEdit.value === "" ? this.state.editItem.nama_produk   : this.refs.namaEdit.value,
      harga : this.refs.hargaEdit.value === "" ? this.state.editItem.harga : this.refs.hargaEdit.value,
      discount : this.refs.discountEdit.value === "" ? this.state.editItem.discount : this.refs.discountEdit.value,
      deskripsi : this.refs.deskripsiEdit.value === "" ? this.state.editItem.deskripsi : this.refs.deskripsiEdit.value ,
      // img : this.refs.imgEdit.value === "" ? this.state.editItem.img : this.imgEdit.inputRef.value,
      id_category : this.refs.categoryEdit.value === "" ? this.state.editItem.category : this.refs.categoryEdit.value
      
  }

  if(this.state.selectFileEdit){
    var fd = new FormData()
    fd.append('edit' , this.state.selectFileEdit)
    fd.append('data' ,JSON.stringify(newData))
    
    // UNTUK DAPETIN PATH IMAGE YANG MAU DIHAPUS
    fd.append('imageBefore' , this.state.editItem.img)
    Axios.put(urlApi+'/updateProduct/'+this.state.editItem.id ,fd)
    .then((res) => {
      alert(res.data)
      this.setState({modal : false})
      this.getData()
    })
  }else{
    Axios.put(urlApi+'/updateProduct/' + this.state.editItem.id , newData)
    .then((res) => {
      alert(res.data)
      this.setState({modal : false})
      this.getData()
    })
  }

}

  onBtnDelete = (val) => {
    Axios.delete(urlApi+'/deleteProduct/'+val.id, {data:val})
    .then((res)=>{
      // alert(res.data)
      if(typeof(res.data)==='string'){
        alert(res.data)

      }
      else{
        swal('Status Delete' , 'Produck Behasil Di Hapus' , 'success')
        this.setState({rows: res.data})
      }
    
    })
    .catch((err)=>console.log(err))
  
  }
  
  onChangeHendlerEdit = (event) => {
    // UNTUK NGE GET FILES
    this.setState({selectFileEdit : event.target.files[0]})
  } 
  valueHendlerEdit = () => {
    var value = this.state.selectFileEdit ? this.state.selectFileEdit.name : 'Pick a Picture'
      return value
  }

  getDataUrl = () => {
    if(this.props.location.search){
      var Obj = queryString.parse(this.props.location.search)
      this.setState({searchByName:Obj.nama ? Obj.nama : ''})
    }
  }


  SearchByName = () => {
    this.pushUrl()
    this.setState({searchByName : this.refs.searchByName.value.toLowerCase()})
  }
  pushUrl = () => {
    var newLink = `/manage`
    var params = []
    if(this.refs.searchByName){
      params.push({
        params:'nama',
        value:this.refs.searchByName.value
      })
    }

    for (var i = 0; i < params.length; i++){
      if(i===0){
        newLink+='?' + params[i].params+'='+params[i].value
      }
    }
    this.props.history.push(newLink)
  }

printDataCategory=()=>{
  var data = this.state.isCategory.map((val)=>{
    return (
      <option value={val.category}>{val.category}</option>
    )
  })
  return data
}
  renderJsx = () => {
    var arrFiltering = this.state.rows.filter((val)=>{
      return(val.nama_produk.toLowerCase().startsWith(this.state.searchByName))
    })

    var jsx =  arrFiltering.slice(this.state.page * this.state.rowsPerPage,  this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val) => {
        return (
            <TableRow key={val.id}>
                <TableCell>{val.id_produk}</TableCell>
                <TableCell component="th" scope="row">
                {val.nama_produk}
                </TableCell>
                <TableCell>Rp. {val.harga}</TableCell>
                <TableCell>{val.discount}</TableCell>
                <TableCell>{val.category}</TableCell>
                <TableCell><img src={urlApi+'/'+val.img} width='50px'/></TableCell>
                <TableCell>{val.deskripsi}</TableCell>
                <TableCell>
                <Button onClick={()=> this.setState({modal:true, editItem :val})} animated color='teal'>
                <Button.Content visible>Edit</Button.Content>
                <Button.Content hidden>
                    <Icon name='edit' />
                </Button.Content>
                </Button>
                <Button animated color='red' onClick={()=> this.onBtnDelete(val)}>
                <Button.Content visible>Delete</Button.Content>
                <Button.Content hidden>
                    <Icon name='delete'/>
                </Button.Content>
                </Button>
                </TableCell>
            </TableRow>
        )
    })
    return jsx
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    // var {id,nama_produk, harga, discount, deskripsi,img,category} = this.state.editItem
    if(this.props.role === 'admin')
    {
    return (
    <div className='container'>
    <div className='conatiner mt-10'>
        <a href="/tambahPrd" class="btn btn-info" role="button">Add Product</a>
    </div>
      <div className = 'row'>
        <div className = 'col-md-2'>
          <select onChange={this.getByCategory} className='form-control form-control-sm' ref='categoryEdit'>
            {this.printDataCategory()}
          </select>
        </div>
        <div className='col-md-3'>
          <input type='text' placeholder='Search Name' className='form-control' ref='searchByName' onChange={this.SearchByName}/>
        </div>
      </div>
    
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
          <TableHead>
              <TableRow>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>ID</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>NAMA</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>HARGA</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>DISC</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>CAT</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>IMG</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>DESK</TableCell>
              </TableRow>
          </TableHead>
            <TableBody>
               {this.renderJsx()}

              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
      {/* {============= EDIT PRODUCT SECTION ====================} */}

      {/* ================================= OPEN MODAL ========================================== */}
      <div>
      <Modal isOpen={this.state.modal} toggle={()=> this.setState({modal:false})} className={this.props.className}>
          <ModalHeader toggle={()=> this.setState({modal:false})}>Edite Product ~ {this.state.editItem.nama_produk}</ModalHeader>
          <ModalBody>
            <div className = "row">
              <div className ="col-md-3">
                <img src={urlApi+'/'+ this.state.editItem.img} width='100px' alt= 'broken'/>
                <input type = 'file' onChange={this.onChangeHendlerEdit} style={{display:'none'}} ref='imgEdit'/>
                <input type = 'button' className = 'btn btn-primary' value = {this.valueHendlerEdit()} onClick={()=> this.refs.imgEdit.click()}/>
              </div>
              <div className ="col-md-9">
                <input type = "text" className = "form-control" placeholder={this.state.editItem.id_produk} ref='idEdit'/>
                <input type = "text" className = "form-control mt-3" placeholder={this.state.editItem.nama_produk} ref='namaEdit'/>
                <input type = "number" className = "form-control mt-3" placeholder={this.state.editItem.harga} ref='hargaEdit'/>
                <input type = "number" className = "form-control mt-3" placeholder={this.state.editItem.discount} ref='discountEdit'/>
                <select className='form-control form-control-sm' ref='categoryEdit'>
                      {this.printDataCategory()}
                </select>
                <textarea className="form-control" id="exampleFormControlTextarea1" ref='deskripsiEdit' placeholder={this.state.editItem.deskripsi} rows={3} defaultValue={""} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onBtnSave}>Do Something</Button>{' '}
            <Button color="secondary" onClick={()=> this.setState({modal:false})}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
        {/* ================================== AKHIR ===================================== */}


      {/* {============= END OF EDIT PRODUCT SECTION ====================} */}
      </div>
    );
  } return <PageNotFound/>
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    role : state.user.role
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));