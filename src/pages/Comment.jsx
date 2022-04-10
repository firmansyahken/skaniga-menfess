import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PlaneIcon } from '../assets'
import Chatbox from '../components/Chatbox'
import style from '../styles/comment.module.css'

const Comment = () => {
    const token = localStorage.getItem('auth_token')
    const profile = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const [post, setPost] = useState([])
    const [comments, setComment] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('https://api-skaniga.herokuapp.com/api/post/'+id).then(r => r.json())
        .then(function(response) {
            const dataPost = response.post[0]
            const dataComment = response.comments
            setPost(dataPost)
            setComment(dataComment)
        })
    }, [message])

    function handleSubmit(e) {
        e.preventDefault()
        
        if(!profile && !token) {
            alert('Login terlebih dahulu jika ingin memberikan tanggapan')
            return navigate('/signin')
        }

        const formData = {
            'post_id': id,
            'user_id': profile.id,
            'message': message
        } 

        fetch('https://api-skaniga.herokuapp.com/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(formData)
        }).then(r => r.json())
        .then(function(response) {
            if(response.message === 'Comment Success') {
                setMessage('')
                return e.target.reset()
            }
        })
    }

  return (
    <>
        <div className='container'>
            <div className={style.header}>
                <p>To: {post.to}</p>
                <h3>{post.content}</h3>
                <p>from: {post.from}</p>    
            </div>
            <form onSubmit={handleSubmit}>
                <div className={style.input}>
                    <input onChange={(e) => setMessage(e.target.value)} type='text' placeholder='Tulis Tanggapanmu' autoComplete='off'/>
                    <button><img src={PlaneIcon} alt='icon'/></button>
                </div>
            </form>
            <div className={style.main}>
                {comments.map(comment => {
                    return <Chatbox 
                        key={comment.id}
                        name={comment.name}
                        message={comment.message}
                    />
                })}
            </div>
        </div>
    </>
  )
}

export default Comment