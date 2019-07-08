import React from 'react'
import Carousel from './carousel'
// import { connect } from 'react-redux'
// import Product from './productList'
import {Link} from 'react-router-dom'
import '../support/css/home.css'
import Homegym from '../../src/support/img/Homegym-Leg-press-F-3800.jpg'
import Treadmil from '../../src/support/img/F-2177-500x500.jpg'
import Sepeda from '../../src/support/img/IMG_20150407_150714.jpg'
import Orbitrack from '../../src/support/img/N12901753A_1.jpg'


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
                                    Selain mampu mendapatkan kebugaran, melakukan fitness juga bisa dijadikan metode terbaik dalam meningkatkan massa otot dan membakar lemak. Jika Anda merupakan salah satu orang yang baru mengikuti program latihan fitness, maka ada baiknya Anda mengetahui terlebih dahulu beberapa istilah fitness yang sering kali digunakan oleh orang-orang didalamnya.  
                                    <br/><br/>" Untuk Informasi Kesediaan Barang dan Tujuan Pengiriman Mohon Hubungi WA: 0987123456 "</p>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <img className='homegym' src={Homegym} alt="Flowers in Chania" />
                        </div>
                        <div className='col-md-6 textHomeGym'>
                        <h3>HOME GYM</h3>
                            <p>Home Gym merupakan alat olah raga multi fungsi untuk membentuk tubuh dan memperkuat otot-otot di berbagai 
                                bagian tubuh seperti dada, lengan, paha dan perut. Hanya dengan sebuah alat, agan dapat melakukan berbagai 
                                fariasi gerakan. Dengan memiliki Home Gym, agan dapat melakukan latihan chest press, seated row, leg extension, 
                                leg curl, lat pulldown, rowing, dan lain-lain. arena Home Gym sangat sesuai untuk digunakan baik oleh pria maupun wanita.
                                Dengan memiliki Home Gym, agan bisa melakukan program fitness yang telah Anda susun secara teratur.</p>
                            <Link to = '/product'><input type='button' className='btn btn-primary' value='GO'/></Link>
                        </div>

                        <div className='col-md-6 textTreadmil'>
                        <h3>TREADMIL</h3>
                            <p>Treadmill adalah alat yang mampu membantu kita untuk berjalan, berlari, bahkan berjalan menanjak tanpa berpindah tempat. 
                                Alat ini terinspirasi dari cara kerja alat penggilingan pada saat belum ditemukannya mesin. Dimana pada saat itu semua 
                                pekerjaan untuk menggiling dan menghasilkan tepung masih menggunakan tenaga manusia atau hewan. </p>
                            {/* <input type='button' className='btn btn-primary' value='GO'/> */}
                            <Link to = '/product'><input type='button' className='btn btn-primary' value='GO'/></Link>
                        </div>
                        <div className='col-md-5'>
                            <img className='homegym' src={Treadmil} alt="Flowers in Chania" />
                        </div>

                        <div className='col-md-5'>
                            <img className='homegym' src={Sepeda} alt="Flowers in Chania" />
                        </div>
                        <div className='col-md-6 textHomeGym'>
                        <h3>SEPEDA STATIS</h3>
                            <p>Bersepeda statis adalah olahraga yang dilakukan dengan cara mengayuh sepeda di tempat. 
                                Olahraga ini sangat baik dilakukan saat tubuh tidak dapat berlari atau berolahraga berat, 
                                karena memiliki masalah pada sendi, lutut, ataupun punggung. Para ahli menyepakati bahwa 
                                olahraga dengan sepeda statis adalah jenis olahraga yang tidak membahayakan sendi. Bersepeda 
                                statis juga memiliki beragam manfaat yang baik untuk kesehatan tubuh.</p>
                            {/* <input type='button' className='btn btn-primary' value='GO'/> */}
                            <Link to = '/product'><input type='button' className='btn btn-primary' value='GO'/></Link>
                        </div>

                        <div className='col-md-6 textTreadmil'>
                        <h3>ORBITRACK</h3>
                            <p>ORBITRACK adalah alat olahraga yang di adopsi dari treadmill dan sepeda statis .</p>
                            {/* <input type='button' className='btn btn-primary' value='GO'/> */}
                            <Link to = '/product'><input type='button' className='btn btn-primary' value='GO'/></Link>

                        </div>
                        <div className='col-md-5'>
                            <img className='homegym' src={Orbitrack} alt="Flowers in Chania" />
                        </div>
                        
                    </div>
                    
                </div>
                {/* <Product search={this.state.search}/> */}
            </div>
        )
    }
}


export default Home