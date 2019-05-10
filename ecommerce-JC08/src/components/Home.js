import React from 'react'
import Carousel from './carousel'
import { connect } from 'react-redux'
import Product from './productList'

class Home extends React.Component{
    state = {search : ''}
    onBtnClick = () => {
        this.setState({search :this.refs.searchBook.value})
    }
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="my-4">
                            <Carousel />
                        </div>
                        {this.props.id}
                    </div>
                </div>
                <Product search={this.state.search}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        id : state.user.id
    }
}

export default connect(mapStateToProps)(Home)