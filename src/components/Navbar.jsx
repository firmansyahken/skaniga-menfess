import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, BarIcon, CloseIcon } from '../assets'
import style from '../styles/navbar.module.css'

const Navbar = () => {
  const token = localStorage.getItem('auth_token')
  const profile = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()
  const [active, setActive] = useState(false)

  function handleLogout() {
    fetch('https://api-skaniga.herokuapp.com/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    }).then(r => r.json())
    .then(function(response) {
      if(response.message === 'Logout Success') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('profile')
        localStorage.removeItem('visit')
        navigate('/signin')
      } 
      localStorage.removeItem('auth_token')
      localStorage.removeItem('profile')
      navigate('/signin')
    })
  }

  return (
    <>
      <div className={style.navbar}>
        <div className={style.container}>
          <div className={style.brand}>
            <img src={Logo} alt='logo'/>
            <h2>Menfess</h2>
          </div>
          <div className={style.link}>
            <Link to='/'>Home</Link>
            <Link to='/menfess'>Menfess</Link>
            {profile ? <p>{profile.name}</p> : '' }
            {token ? <p onClick={handleLogout}>Logout</p> : <Link to='/signin'>Login</Link>}
          </div>
        </div>
      </div>
      <div className={style.navbar_mobile}>
        <div className={style.mobile_container}>
          <div className={style.mobile_brand}>
            <img src={Logo} alt='logo'/>
            <h2>Menfess</h2>
          </div>
          <div className={style.toggle}>
            <img onClick={() => setActive(!active)} src={active ? CloseIcon : BarIcon} alt='icon'/>
          </div>
        </div>  
      </div>
      <div className={active ? style.menu_active : style.menu}>
        <Link to='/'>Home</Link>
        <Link to='/menfess'>Menfess</Link>
        {profile ? <p>{profile.name}</p> : '' }
        {token ? <p onClick={handleLogout}>Logout</p> : <Link to='/signin'>Login</Link>}
      </div>
    </>
  )
}

export default Navbar