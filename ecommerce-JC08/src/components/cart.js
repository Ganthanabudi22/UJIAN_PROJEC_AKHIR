import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
import {connect  } from 'react-redux'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import PageNotFound from './pageNotFound'
import { urlApi } from '../support/urlApi';
import { TableHead } from '@material-ui/core';
import { cartCount, resetCount,loadingOut} from './../1.actions'
import swal from 'sweetalert';
import Loader from 'react-loader-spinner'
import { stat } from 'fs';

function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

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
    page: 0,
    rowsPerPage: 5,
    edit : -1,
    total : 0,
    loading : false
  };
  
  renderBtnOrLoading = () => {
    if(this.state.loading === true){
        return <Loader
                type="Audio"
                color="#00BFFF"
                height="100"	
                width="100"
                />
    }
    else{
      return (
        <div>
            <input type='button' className='btn btn-primary mr-3' onClick={this.onCheckout} value='Checkout Now' />
            <Link to='/'> <input type='button' className='btn btn-success' value='Continue Shopping' /></Link>
        </div>
      ) 
    }
  }
  componentDidMount(){
      this.getData()

  }
    

  getData = () => {
    Axios.get(urlApi +'/getCart?user_name_cart='+this.props.username)
    .then((res) => {
      if(res.data.error){
        swal("Error", res.data.msg, "error")
      }else{
        this.setState({rows : res.data})
      }
    })
    .catch((err) => console.log(err))
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  
  qtyValidation = () => {
      if(this.refs.qtyEdit.value < 1) {
          this.refs.qtyEdit.value = 1
      }
  }
  onBtnSave =(id) => {
      var qty = ''
      if(typeof(this.refs.qtyEdit.value) === ""){
          this.cancelBtn()
      }else{
          qty = this.refs.qtyEdit.value
          var newData = {qty}
          Axios.put(urlApi+'/updateCart/'+id ,newData)
          .then((res)=>{
              if(typeof(res.data)==="string"){
                  alert(res.data)
              }else{
                swal('Status Edit' , 'Success Edit qty' , 'success')
                  this.setState({edit:-1})
                  this.getData()

              }
          
              })
          .catch((err)=>console.log(err))
      
  }

    
  }
  onBtnDelete = (id) => {
      Axios.delete(urlApi+'/deleteCart/'+id)
      .then((res)=>{
        swal('Status Delete' , 'Cart Behasil Di Hapus' , 'success')
        this.props.cartCount(this.props.username)
        this.getData()
    })
    .catch((err)=>console.log(err))
  }
  totalHarga = () => {
    var sum = 0
    for(var i = 0 ; i< this.state.rows.length ; i ++){
        sum+= ((this.state.rows[i].harga - (this.state.rows[i].harga*(this.state.rows[i].discount/100)))*this.state.rows[i].qty)
    }
    return sum
  }
  onCheckout =() => {
    this.setState({loading:true})
    Axios.post(urlApi+'/checkOut', {user_name : this.props.username, total_belanja : this.totalHarga()})
    
    .then((res)=>{
        if(res.data.error){
            swal("Error", res.data.msg, "error")
        }else{
            this.setState({loading:false})
            swal("Success", res.data, "success")
            this.getData()
            this.props.cartCount(this.props.username)

        }
    })
    .catch((err)=>console.log(err))
    }



  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    if(this.props.cart === 0 && this.props.username > ''){
      return (
        <div className='container'>
        <Paper className='mt-4'>
                <div className='row justify-content-center p-4'>
                    <div className='col-md-4'>
                      <Link to='/product'> <input type='button' className='btn btn-success' value='Your Cart is Empty, Continue Shopping' /></Link>
                    </div>
                </div>
          </Paper>
          </div>
      )
    }
    if(this.props.username.length > 0){

    
    return (
        <div className='container'>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>NO</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>NAMA</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>HARGA</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>DISC</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>QTY</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>TOTAL</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>ACT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
                        <TableRow key={row.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>
                            {row.nama_produk}
                        </TableCell>
                        <TableCell>{formatMoney(row.harga)}</TableCell>
                        <TableCell>{row.discount} %</TableCell>
                        {this.state.edit === index ? 
                        <TableCell>
                            <input style={{width : '50px'}} defaultValue={row.qty} onChange={this.qtyValidation} type='number' ref='qtyEdit' className='form-control'/>
                        </TableCell>
                        : <TableCell>
                              {row.qty}
                          </TableCell>}
                        <TableCell>
                            {formatMoney(row.qty*(row.harga - (row.harga*(row.discount/100))))}
                        </TableCell>
                        {this.state.edit === index ?  
                        <TableCell>
                            <input type='button' value='cancel' onClick={() => this.setState({edit : -1})} className='btn btn-danger mr-2'/>
                            <input type='button' value='save' onClick={()=>this.onBtnSave(row.id)} className='btn btn-success mr-2'/>
                        </TableCell>  
                        :
                        <TableCell>
                            <input type='button' value='edit' onClick={() => this.setState({edit : index})} className='btn btn-primary mr-2'/>
                            <input type='button' value='delete' onClick={()=>this.onBtnDelete(row.id)} className='btn btn-danger mr-2'/>
                        </TableCell>}

                        </TableRow>
                    ))}
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
            <Paper className='mt-4'>
                <div className='row justify-content-center pt-4'>
                    <div className='col-md-4' style={{textAlign:'center'}}>
                        {this.renderBtnOrLoading()}
                        {/* <input type='button' className='btn btn-primary mr-3' onClick={this.onCheckout} value='Checkout Now' /> */}
                        {/* <Link to='/'> <input type='button' className='btn btn-success' value='Continue Shopping' /></Link> */}
                    </div>
                </div>
                <div className='row justify-content-center pb-4 mt-3'>
                    <div>
                      <div style={{fontWeight:'800', fontSize:'30px',textAlign:'center'}}> Total Belanja : {formatMoney(this.totalHarga())}</div>
                      
                    </div>
                </div>
            </Paper>
        </div>
    )
  } return <PageNotFound/>;
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        cart : state.cart.count,
        username : state.user.username
    }
}

export default  connect(mapStateToProps,{cartCount,resetCount,loadingOut})(withStyles(styles)(CustomPaginationActionsTable));