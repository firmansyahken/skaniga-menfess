import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import SearchInput from '../components/SearchInput'
import style from '../styles/menfess.module.css'

const Menfess = () => {
  const [posts, setPost] = useState([])
  const [page, setPage] = useState(1)
  const [active, setActive] = useState(false)

  useEffect(() => {
      fetch('https://api-skaniga.herokuapp.com/api/post?page='+page).then(r => r.json())
      .then(function(response) {
          const data = response.data.data
          setPost([...posts, ...data])
          if(response.data.next_page_url === null) {
            return setActive(false)
          }
          setActive(!active)
      })
  }, [page])

  function loadMore() {
    setPage(page + 1)
  }

  return (
      <>
        <div className='container'>
            <SearchInput/>
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
            { active ? <div className={style.loadmore}>
                <button onClick={loadMore}>Tampilkan Lebih Banyak</button>
            </div> : '' }
        </div>  
      </>
  )
}

export default Menfess