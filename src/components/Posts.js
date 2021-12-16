import React, { useState } from 'react'
import Post from '../components/Post';
import { useFetch } from '../utils/Functions';
import {  FormControl} from 'react-bootstrap';

const Posts = () => {
    const [searchitem , setsearchitem] = useState('')
    const {posts,isloading} = useFetch()
  
    return (
        <div >
            <div className='col-3' style={{position:'relative',left:'40%'}}>
            { isloading ? null: <img
              src="https://www.scudamores.com/assets/damsel/assets/img/load.gif"
              width="250"
              height="100"
              className="d-inline-block mt-5 rounded"
              alt="Blog logo"
            /> }
              <FormControl className='float-end col-4 m-2' id='search'value={searchitem} onChange={(e)=> setsearchitem(e.target.value)} placeholder='Search in Content or Category'/>
             
              </div>
            <div className="container-fluid d-flex flex-wrap mt-5">
            {posts.map((post)=>(
                <div key={post.id}>
                   { post.content.toLowerCase().includes(searchitem.toLocaleLowerCase()) || post.category.toLowerCase().includes(searchitem.toLocaleLowerCase()) ? 
               <Post post={post} /> : null}
               </div>
            ))}
            </div>
        </div>
    )
}

export default Posts
