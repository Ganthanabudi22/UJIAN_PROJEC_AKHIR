import axios from 'axios'
import {urlApi} from './../support/urlApi'
import cookie from 'universal-cookie'

const objCookie = new cookie()
export const onLogin = (paramUsername,password) => { 
    return(dispatch)=>{
        // INI UNTUK MENGUBAH LOADING MENJADI TRUE
        dispatch({
            type: 'LOADING',
        })

        // GET DATA DARI FAKE API JSON SERVER
        axios.get(urlApi + '/login?user_name='+paramUsername+'&password='+password)
        
        // KALO BERHASIL NGE GET, DIA MASUK THEN
        .then((res) => {
            console.log(res)

        // IF USERNAME DAN PASSWORD SESUAI MAKA RES.DATA ADA ISINYA
            if(res.data.length > 0){
                if (res.data[0].verived===0){
                    dispatch(
                        {
                            type : 'LOGIN_VERIVED'
                        }
                    )
                }else{
                    console.log(res)
                dispatch(
                    {
                        type : 'LOGIN_SUCCESS',
                        payload : res.data
                        // {
                        //      username : res.data[0].username,
                        //      role : res.data[0].role,
                        //      id : res.data[0].id
                        // }
                    }
                )
                }
                
            }else{
                dispatch({
                    type : 'USER_NOT_FOUND',
                    payload : ['','Username Atau Password Anda Salah']
                })
            }
            
        })
        .catch((err) => {
            dispatch({
                type : 'SYSTEM_ERROR'
            })
        })
    }
}



export const keepLogin = (cookie) => {
    return(dispatch) => {
        axios.get(urlApi + '/getAllUser/' + cookie)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data
                        // {
                        //      username : res.data[0].username,
                        //      role : res.data[0].role
                        // }
                })
            }
        })
        .catch((err) => console.log(err))
    }
} 

export const cookieChecked = () => {
    return {
        type : 'COOKIE_CHECKED'
    }
}

export const resetUser = () => {
    return {
        type : 'RESET_USER'
    }
}

export const userRegister = (a,b,c,d,e) => { // userRegister('fikri')
    return(dispatch)=>{
        dispatch({
            type : 'LOADING'
        })
        var newData = {user_name : a,nama_lengkap:b, password : c, email : d, phone : e}
        // Mengecek Username availablity

        axios.get(urlApi +'/getAllUser/' + a)
        .then((res) => {
            if(res.data.length > 0){
                alert('kalo ada')
                dispatch({
                    type : 'USERNAME_NOT_AVAILABLE'
                })
            }
            else{
                axios.post(urlApi +'/addUser',newData)
                .then((res) => {
                    alert('periksa email anda')
                    dispatch({
                    type : 'REGISTER_VERIVED',
                    //Mengirim Payload dalam bentuk Object
                    //payload : { username : newData.username, id : res.data.id, email : c} 
                    payload : a
                },
                    // Parameter Ketiga agar cookie bisa diakses di semua komponen
                    // objCookie.set('userData',a,{path : '/'}),
                )}
                )
                .catch((err) => console.log(err))
            }
        })
        .catch((err) => {
            dispatch({
                type : 'SYSTEM_ERROR'
            })
        })
    }
}

export const loginWithGoogle = (email) => {
    return(dispatch) => {
        axios.get(urlApi + '/users?username=' + email)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type :'LOGIN_SUCCESS',
                    payload : res.data
                },
                    objCookie.set('userData',email,{path : '/'})
                )
            }else{
                axios.post(urlApi + '/users', {username : email,role :'user'})
                .then((res) => {
                    dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload : res.data
                    },
                        objCookie.set('userData',email,{path : '/'})
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}



