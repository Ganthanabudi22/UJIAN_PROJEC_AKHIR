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
    import Select from '@material-ui/icons/SelectAll'
    import {connect  } from 'react-redux'
    import { Link } from 'react-router-dom'
    import Axios from 'axios';
    import { urlApi } from './../../support/urlApi';
    import { TableHead } from '@material-ui/core';
    import { cartCount} from './../../1.actions'
    import PageNotFound from '../pageNotFound';
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
        status : [],
        statusNumber:4
    };
    componentDidMount(){
        this.getData()
        // this.getDatalDetail()
        this.getDataStatus()
    }

    getData = () => {
        Axios.get(urlApi + '/getAllOrderAdmin')
        .then((res) => {
            this.setState({rows : res.data})
        })
        .catch((err) => console.log(err))
    }

    getDataBy = () => {
        var status = this.refs.dropdown.value
        Axios.get(urlApi + '/getAllByStatus/'+ status)
        .then((res) => {
            this.setState({rows : res.data})
        })
        .catch((err) => console.log(err))
    }

    getDataStatus = () => {
        Axios.get(urlApi+'/getAllStatus')
        .then((res)=>{
            this.setState({status:res.data})
        })
        .catch((err)=> console.log(err))
    }

    OnBtnUpdateStatus = (id) => {
        Axios.put(urlApi+'/updateAdmin/'+id)
        .then((res)=>{
            swal('Status Diubah' , 'Status Berhasil Diubah' , 'success')
            this.getData()
        })
        .catch((err)=>console.log(err))
    }
    OnBtnUpdateStatusBatal = (id) => {
        Axios.put(urlApi+'/updateAdminBatal/'+id)
        .then((res)=>{
            swal('Status Diubah' , 'Status Berhasil Diubah' , 'success')
            this.getData()
        })
        .catch((err)=>console.log(err))
    }
    




    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    renderHistoryJsx = () => {
        var arrFiltering = this.state.rows.filter((val)=>{
            return(val.status==this.state.statusNumber || this.state.statusNumber >3)
        })
        var jsx =arrFiltering.slice(this.state.page * this.state.rowsPerPage,  this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
        .map((row,index) => {
            return (
                    <TableRow key={row.id}>
                        <TableCell>{index+1}</TableCell>
                    <TableCell>
                        {row.id}
                    </TableCell><TableCell>
                        {row.user_name}
                    </TableCell>
                    <TableCell>
                        {row.tgl}
                    </TableCell>
                            {/* <TableCell>{row.item.length}</TableCell> */}
                    <TableCell>{formatMoney(row.total_belanja)} </TableCell>
                    <TableCell>
                        {row.status}
                    </TableCell>
                    <TableCell>
                        <Link to={'/product-detail/' + row.id}><img src={urlApi+'/'+row.bukti} width='50px'/></Link>
                    </TableCell>
                    {row.status == 'SEDANG DI PEROSES'?
                        <TableCell>
                            <input type='button' value='UPDATE STATUS' disabled className='btn btn-success mr-2'/>
                        </TableCell>
                        :
                        <TableCell>
                            <input type='button' value='UPDATE STATUS' onClick={()=>this.OnBtnUpdateStatus(row.id)} className='btn btn-success mr-2'/>
                        </TableCell>
                    }
                    {row.status == 'SEDANG DI PEROSES'?
                        <TableCell>
                            <input type='button' value='BATAL'disabled className='btn btn-danger mr-2'/>
                        </TableCell>
                    :
                        <TableCell>
                            <input type='button' value='BATAL' onClick={()=>this.OnBtnUpdateStatusBatal(row.id)} className='btn btn-danger mr-2'/>
                        </TableCell>
                    }
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
                    <select onChange={this.getDataBy} ref='dropdown' className='form-control' style={{marginTop:'10%'}}>
                        <option value=''> Select Status </option>
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
                            <TableRow style={{textAlign:'center'}}>
                                <TableCell style={{fontSize:'24px', fontWeight:'600'}}>NO</TableCell>
                                <TableCell style={{fontSize:'24px', fontWeight:'600'}}>ID</TableCell>
                                <TableCell style={{fontSize:'24px', fontWeight:'600'}}>USERNAME</TableCell>
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