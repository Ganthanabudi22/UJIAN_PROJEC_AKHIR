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
import { urlApi } from '../support/urlApi';
import { TableHead } from '@material-ui/core';
import { cartCount} from './../1.actions'
import PageNotFound from './pageNotFound';
import queryString from 'query-string'
import swal from 'sweetalert';

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
    historyDetail : [],
    isDetail : false
  };
  componentDidMount(){
      this.getData()
  }

  getData = () => {
    if (this.props.location.search) {
      var params = queryString.parse(this.props.location.search)
      var status = params.status
      this.getDataBy(status)
    }else {
    this.getDataBy('ALL')
    }

  }

  getDatalDetail = (id_detail) => {
    Axios.get(urlApi + '/getAllDetail/'+id_detail)
    .then((res) => {
        this.setState({historyDetail : res.data,isDetail:true})
    })
    .catch((err) => console.log(err))
  }

  getDataBy = (status) => {
    // var status = this.refs.dropdown.value
    Axios.get(urlApi + '/getAllByStatus?status='+ status+'&user_name='+this.props.username)
    .then((res) => {
      if(status==='ALL'){
        this.props.history.push('/history')

      }else{
        this.props.history.push('/history?status='+status)

      }
        this.setState({rows : res.data})
    })
    .catch((err) => console.log(err))

    
}


  // statusSudahBerubah = () => {
  //   swal('STATUS' , 'TUNGGU STATUS DARI ADMIN' , 'warning')
  // }



  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  // onBtnDetail = (item) => {

  // }

  renderHistoryJsx = () => {
          var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row,index) => (
            <TableRow key={row.id}>
            <TableCell>{index+1}</TableCell>
            <TableCell>
                {row.tgl}
            </TableCell>
            {/* <TableCell>{row.item.length}</TableCell> */}
            <TableCell>{formatMoney(row.total_belanja)} </TableCell>
            <TableCell>
                {row.status}
            </TableCell>
            <TableCell>
                <a href={urlApi+'/'+row.bukti}target="_blank" title={'Click untuk melihat gambar'}><img src={urlApi+'/'+row.bukti} style={{width:'70px', height:'70px',cursor:'pointer'}}/></a>
            </TableCell>
            <TableCell>
                <input type='button' value='Detail' onClick={()=>this.getDatalDetail(row.id)} className='btn btn-danger mr-2'/>
              {row.status == 'SUDAH DIBAYAR' || row.status == 'SEDANG DI PEROSES'
              ?
              // <input type='button' value='Upload' onClick={this.statusSudahBerubah}  className='btn btn-primary mr-2'/>
              null
              :
              <Link to={'/buktiTrans/'+row.id}> <input type='button' value='Upload'  className='btn btn-primary mr-2'/></Link>    
              }
              
            </TableCell>
            
            </TableRow>
        ))
      return jsx
  }
  




  renderHistoryDetail = () => {
    var jsx = this.state.historyDetail.map((row,index) => {
      return(
        <TableRow key={index}>
          <TableCell>{index+1}</TableCell>
          <TableCell>
              {row.nama_produk}
          </TableCell>
          <TableCell>{row.qty}</TableCell>
          <TableCell>{row.total} </TableCell>
        </TableRow>
      )
    })
    return jsx
  }


  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    if(this.props.username){
    return (
        <div className='container'>
          <div className = 'row'>
                <div className ='col-md-2'>
                    <select onChange={()=>this.getDataBy(this.refs.dropdown.value)} ref='dropdown' className='form-control' style={{marginTop:'10%'}}>
                        <option value='ALL'> Select Status </option>
                        <option value='BELUM DIBAYAR'>{'BELUM BAYAR'}</option>
                        <option value='SUDAH DIBAYAR'>{'SUDAH DIBAYAR'}</option>
                        <option value='SEDANG DI PEROSES'>{'SEDANG DI PEROSES'}</option>
                    </select>
                </div>
            </div>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>NO</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>TANGGAL</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>TOTAL</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>STATUS</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>BUKTI</TableCell>
                            <TableCell style={{fontSize:'24px', fontWeight:'600'}}>ACT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.renderHistoryJsx()}
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
            { this.state.isDetail ? <Paper className='mt-3'>
              <Table>
                <TableHead>
                <TableRow>
                    <TableCell style={{fontSize:'24px', fontWeight:'600'}}>NO</TableCell>
                    <TableCell style={{fontSize:'24px', fontWeight:'600'}}>NAMA</TableCell>
                    <TableCell style={{fontSize:'24px', fontWeight:'600'}}>QTY</TableCell>
                    <TableCell style={{fontSize:'24px', fontWeight:'600'}}>TOTAL</TableCell>
                </TableRow>                
                </TableHead>
                <TableBody>
                        {this.renderHistoryDetail()}

                </TableBody>
                <TableFooter>
                        <TableRow>
                          <TableCell> <input type='button' className='btn btn-primary' value='close' onClick={()=> this.setState({isDetail:false, historyDetail:[]})} /> </TableCell>
                        </TableRow>
                </TableFooter>      
              </Table>
            </Paper> : null}
        </div>
    );
  } return <PageNotFound />
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        username : state.user.username,
        cart : state.cart.count
    }
}

export default connect(mapStateToProps,{cartCount})(withStyles(styles)(CustomPaginationActionsTable));