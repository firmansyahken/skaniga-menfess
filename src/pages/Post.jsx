import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../styles/post.module.css'

const Post = () => {
    const navigate = useNavigate()
    const [error, setError] = useState([])
    const [form, setForm] = useState({
        'to': '',
        'from': '',
        'content': ''
    })

    function handleInput(e) {
        setForm({...form, [e.target.name]:e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('https://api-skaniga.herokuapp.com/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(r => r.json())
        .then(function(response) {
            if(response.message === 'Post Success') {
                e.target.reset()
                alert('Menfess Berhasil Dibuat!')
                return navigate('/')
            }
            setError(response.message)
        })
    }
  return (
    <>
        <div className='container'>
            <div className={style.header}>
                <h1>Buat Menfess</h1>
                <p>Tidak berunsur Sara, Rasisme dan hal negatif lainnya.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={style.input_group}>
                    <div className={style.input}>
                        <p>To </p>
                        <input onChange={handleInput} name='to' type='text' placeholder='Inisial Nama' autoComplete='off'/>
                        {error ? <p>{error.to}</p> : ''}
                    </div>
                    <div className={style.input}>
                        <p>From</p>
                        <input onChange={handleInput} name='from' type='text' placeholder='Inisial Nama' autoComplete='off'/>
                        {error ? <p>{error.from}</p> : ''}
                    </div>
                    <div className={style.input}>
                        <p>Pesan</p>
                        <textarea onChange={handleInput} name='content' placeholder='Maximal 150 Karakter'></textarea>
                        {error ? <p>{error.content}</p> : ''}
                    </div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default Post