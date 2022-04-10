import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SearchIcon } from '../assets'
import PostCard from '../components/PostCard'
import style from '../styles/menfess.module.css'

const Search = () => {
  const params = useParams()
  const keyword = params.keyword
  const [posts, setPost] = useState([])

  useEffect(() => {
      fetch('https://api-skaniga.herokuapp.com/api/post/search/'+keyword).then(r => r.json())
      .then(function(response) {
          const data = response.data
          setPost(data)
      })
  }, [keyword])

  return (
      <>
        <div className='container'>
            <div className={style.header}>
                <h2>Hasil Pencarian Untuk: <q>{keyword}</q></h2>
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
      </>
  )
}

export default Search