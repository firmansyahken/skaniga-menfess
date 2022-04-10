import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Comment from '../pages/Comment'
import Layout from '../pages/Layout'
import Menfess from '../pages/Menfess'
import Post from '../pages/Post'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Search from '../pages/Search'

const Routers = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Home/>} />
                <Route path='/post' element={<Post/>} />
                <Route path='/comment/:id' element={<Comment/>} />
                <Route path='/menfess' element={<Menfess/>} />
                <Route path='/search/:keyword' element={<Search/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Routers