import React from 'react'
import style from '../styles/chatbox.module.css'

const Chatbox = (props) => {
  const profile = JSON.parse(localStorage.getItem('profile')) || []
  var name = profile.name
  return (
    <>
        <div className={props.name === name ? style.chatbox_right : style.chatbox_left}>
            <div className={style.chat}>
                <h3>{props.name}</h3>
                <p>{props.message}</p>
            </div>
        </div>
    </>
  )
}

export default Chatbox