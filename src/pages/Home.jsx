import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PencilIcon } from '../assets'
import PostCard from '../components/PostCard'
import SearchInput from '../components/SearchInput'
import style from '../styles/home.module.css'

const Home = () => {
    const [posts, setPost] = useState([])
    const [close, setClose] = useState(false) 

    useEffect(() => {
        if(localStorage.getItem('visit')) setClose(!close)
    }, [])

    useEffect(() => {
        fetch('https://api-skaniga.herokuapp.com/api/post/latest').then(r => r.json())
        .then(function(response) {
            const data = response.data
            setPost(data)
        })
    }, [])

    function handleClose() {
        localStorage.setItem('visit', true)
        setClose(!close)
    }

  return (
    <>
        <div className='container'>
            <div className={style.header}>
                <h1>Selamat Datang di Skaniga Menfess</h1>
                <Link to='/post'><img src={PencilIcon} alt='icon'/></Link>
            </div>
            <SearchInput/>
            <div className={style.head}>
                <h1>Terbaru</h1>
                <Link to='/menfess'>Lihat Semua</Link>
            </div>
            <div className={style.main}>
                { posts.map(post => {
                    return <PostCard
                        key={post.id} 
                        id={post.id} 
                        to={post.to}
                        from={post.from}
                        content={post.content}
                    />
                }) }
            </div>
        </div>
        { close ? '' : <div className={style.notice}>
            <div className={style.content}>
                <h2>Info Maszeh</h2>
                <ul>
                    <li> Dilarang membuat menfess berunsur sara, dan hal negatif lainnya.</li>
                    <li> Tidak mengatas namakan orang lain</li>
                    <li> Saling menjaga privasi</li>
                    <li> Para Admin ganteng-ganteng:v</li>
                </ul>
                <div className={style.footer}>
                    <div>
                        <p>Terima kasih</p>
                        <p>Pamekasancode Team</p>
                    </div>
                    <div>
                        <button onClick={handleClose}>Oke, Paham!</button>
                    </div>
                </div>
            </div>
        </div> }
    </>
  )
}

export default Home