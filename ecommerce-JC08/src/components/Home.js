import React from 'react'
import Carousel from './carousel'
// import { connect } from 'react-redux'
// import Product from './productList'
// import {Link} from 'react-router-dom'
import '../support/css/home.css'
import Homegym from '../../src/support/img/Homegym-Leg-press-F-3800.jpg'
import Treadmil from '../../src/support/img/F-2177-500x500.jpg'

class Home extends React.Component{
    // state = {search : ''}
    onBtnClick = () => {
        this.setState({search :this.refs.searchBook.value})
    }
    render(){
        return(
            <div className='Home'>
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="my-4">
                            <Carousel />
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-md-8'>
                            <div className='about'>
                                <h3 className='text-center'>About</h3>
                                <hr/>
                                <p>Fitness adalah salah satu jenis olahraga yang saat ini sedang cukup populer dan banyak digandrungi masyarakat urban.
                                    Selain mampu mendapatkan kebugaran, melakukan fitness juga bisa dijadikan metode terbaik dalam meningkatkan massa otot dan membakar lemak. Jika Anda merupakan salah satu orang yang baru mengikuti program latihan fitness, maka ada baiknya Anda mengetahui terlebih dahulu beberapa istilah fitness yang sering kali digunakan oleh orang-orang didalamnya.</p>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <img className='homegym' src={Homegym} alt="Flowers in Chania" />
                        </div>
                        <div className='col-md-6 textHomeGym'>
                        <h3>HOME GYM</h3>
                            <p>Fitness adalah salah satu jenis olahraga yang saat ini sedang cukup populer dan banyak digandrungi masyarakat urban.
                            Selain mampu mendapatkan kebugaran, melakukan fitness juga bisa dijadikan metode terbaik dalam meningkatkan massa otot dan membakar lemak. Jika Anda merupakan salah satu orang yang baru mengikuti program latihan fitness, maka ada baiknya Anda mengetahui terlebih dahulu beberapa istilah fitness yang sering kali digunakan oleh orang-orang didalamnya.</p>
                            <input type='button' className='btn btn-primary' value='GO'/>
                        </div>

                        <div className='col-md-6 textTreadmil'>
                        <h3>HOME GYM</h3>
                            <p>Fitness adalah salah satu jenis olahraga yang saat ini sedang cukup populer dan banyak digandrungi masyarakat urban.
                            Selain mampu mendapatkan kebugaran, melakukan fitness juga bisa dijadikan metode terbaik dalam meningkatkan massa otot dan membakar lemak. Jika Anda merupakan salah satu orang yang baru mengikuti program latihan fitness, maka ada baiknya Anda mengetahui terlebih dahulu beberapa istilah fitness yang sering kali digunakan oleh orang-orang didalamnya.</p>
                            <input type='button' className='btn btn-primary' value='GO'/>
                        </div>
                        <div className='col-md-5'>
                            <img className='homegym' src={Treadmil} alt="Flowers in Chania" />
                        </div>
                        
                    </div>
                    
                </div>
                {/* <Product search={this.state.search}/> */}
            </div>
        )
    }
}


export default Home