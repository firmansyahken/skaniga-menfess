import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../styles/authentication.module.css'

const SignUp = () => {
    const navigate = useNavigate()
    const [error, setError] = useState([])
    const [form, setForm] = useState({
        'name': '',
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
        fetch('https://api-skaniga.herokuapp.com/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(r => r.json())
        .then(function(response) {
            if(response.message === 'Register Success') {
                const token = response.token
                const profile = response.data
                localStorage.setItem('auth_token', token)
                localStorage.setItem('profile', JSON.stringify(profile))
                return navigate('/')
            }

            return setError(response.message)
        
        })
    }

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.header}>
                        <h1>SignUp</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={style.input_group}>
                            <div className={style.input}>
                                <p>Nickname</p>
                                <input onChange={handleInput} name='name' type='text' placeholder='Maximal 18 Karakter' autoComplete='off'/>
                                {error ? <p>{error.name}</p> : ''}
                            </div>
                            <div className={style.input}>
                                <p>E-mail</p>
                                <input onChange={handleInput} name='email' type='email' placeholder='name@gmail.com' autoComplete='off'/>
                                {error ? <p>{error.email}</p> : ''}
                            </div>
                            <div className={style.input}>
                                <p>Password</p>
                                <input onChange={handleInput} name='password' type='password' placeholder='Minimal 4 Karakter' autoComplete='off'/>
                                {error ? <p>{error.password}</p> : ''}
                            </div>
                            <button>Daftar</button>
                        </div>
                    </form>
                    <div className={style.footer}>
                        <p>Sudah Mempunyai Akun?</p>
                        <Link to='/signin'>Masuk Disini</Link>
                    </div>
                </div>
            </div>
        </>
  )
}

export default SignUp