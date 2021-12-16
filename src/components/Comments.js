import React, { useState, useContext } from 'react'
import { addComment, useComment } from '../utils/Functions'
import { BlogContext } from '../context/BlogContext'
import DeleteComment from '../components/DeleteComment';


const Comments = () => {
    const [isAddComment, setisAddComment] = useState(false)
    const [contentValue, setcontentValue] = useState()

    const { BlogInfo, logininfo } = useContext(BlogContext);
    const { yorum } = useComment(BlogInfo.id, isAddComment)
        
    // ADD COMMENTS
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let commentinfo = {};
        data.forEach(function (value, key) {
            commentinfo[key] = value;
        });
        commentinfo['user_id'] = logininfo.user.id
        commentinfo['post_id'] = BlogInfo.id

        addComment(commentinfo)
        .then(() => setisAddComment(!isAddComment))
        .then(()=> setcontentValue(''))
    }

    return (
        <div className="d-flex flex-column"  >
            {/* //add comments */}
            <div className="d-flex flex-row justify-content-center mt-3">

                <form className='col-12' onSubmit={handleSubmit}>

                    <p className='text-center'>
                        <a className="btn btn-primary btn-sm" data-bs-toggle="collapse" href="#collapseExample" role="button"
                            aria-expanded="false" aria-controls="collapseExample">
                            <i className="bi bi-chat-right-text">  add comment</i>
                        </a>
                    </p>
                    <div className="collapse" id="collapseExample">
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name='content' value={contentValue} onChange={(e)=> setcontentValue(e.target.value)}
                                style={{ height: '100px' }}></textarea>
                        </div>
                        <input className='btn btn-danger btn-sm col-12' type="submit" value="ADD" />
                    </div>
                </form>

            </div>
            {/* Comments List */}
            Comments:
            <hr />
            {yorum.map((item) => (
                <div key={item.id} className='border rounded-3 m-2 p-2 lora shadow-lg lora_sm'>
                    <p className='m-0 fw-bold mb-2 patrick fs-6'>{item.content} </p>
                    <p className='m-0'>from: {item.user} </p>
                    <p className='mb-1'>published time: {item.time_stamp.slice(0, 10)} - {item.time_stamp.slice(11, 19)} </p>
                    
                  <DeleteComment className='d-inline' user_id={item.user_id} id={item.id} setisAddComment={setisAddComment} isAddComment={isAddComment}/>
                </div>
            ))}

        </div>

    )
}

export default Comments
