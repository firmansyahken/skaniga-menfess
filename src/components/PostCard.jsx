import React from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/postcard.module.css'

const PostCard = (props) => {
  return (
    <>
        <div className={style.card}>
            <div className={style.content}>
                <p>To: {props.to}</p>
                <h3>{props.content}</h3>
                <p>from: {props.from}</p>
            </div>
            <div className={style.navigation}>
                <Link to={'/comment/'+props.id}>Lihat Tanggapan</Link>
            </div>
        </div>
        
    </>
  )
}

export default PostCard