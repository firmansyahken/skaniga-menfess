import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../styles/authentication.module.css'

const SignIn = () => {
    const navigate = useNavigate()
    const [error, setError] = useState([])
    const [active, setActive] = useState(false)
    const [form, setForm] = useState({
        'email': '',
        'password': ''
    })

    useEffect(() => {
        if(localStorage.getItem('auth_token')) return navigate('/')
    }, [])

    function handleInput(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('https://api-skaniga.herokuapp.com/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(r => r.json())
        .then(function(response) {
            if(response.message === 'Login Success') {
                const token = response.token
                const profile = response.data
                localStorage.setItem('auth_token', token)
                localStorage.setItem('profile', JSON.stringify(profile))
                return navigate('/')
            } else if(response.message === 'Login Fail') {
                setActive(!active)
            }

            return setError(response.message)
        
        })
    }
  return (
    <>
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.header}>
                    <h1>SignIn</h1>
                    {active ? <p>Username / Password Invalid</p> : ''}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={style.input_group}>
                        <div className={style.input}>
                            <input onChange={handleInput} name='email' type='email' placeholder='Masukkan Email' autoComplete='off'/>
                            {error ? <p>{error.email}</p> : ''}
                        </div>
                        <div className={style.input}>
                            <input onChange={handleInput} name='password' type='password' placeholder='Masukkan Password' autoComplete='off'/>
                            {error ? <p>{error.password}</p> : ''}
                        </div>
                        <button>Masuk</button>
                    </div>
                </form>
                <div className={style.footer}>
                    <p>Tidak Mempunyai Akun?</p>
                    <Link to='/signup'>Daftar Disini</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignIn