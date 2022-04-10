import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon } from '../assets'
import style from '../styles/searchinput.module.css'

const SearchInput = () => {
  const navigate = useNavigate()

  function handleInput(e) {
      if(e.keyCode === 13) {
          if(e.target.value.length < 1 && e.target.value === '') {
              return alert('Masukkan Kata Pencarian')
          }
          navigate('/search/'+e.target.value)
      }
  }

  return (
    <>
        <div className={style.search}>
            <img src={SearchIcon} alt='icon'/>
            <input onKeyUp={handleInput} type='text' placeholder='Cari Pengirim' autoComplete='off'/>    
        </div>
    </>
  )
}

export default SearchInput