import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext"
import Comments from "../components/Comments";
import { deleteBlog, bloglook, addLike, likelist } from "../utils/Functions";
import { useHistory } from "react-router-dom";

const Details = () => {
    const history = useHistory()
    const { BlogInfo, logininfo } = useContext(BlogContext);
    const [like, setlike] = useState({})
    const [likechange, setlikechange] = useState(Boolean)
    const [isdelete, setisdelete] = useState(false)
    
    const addlike = () => {
        let likeinfo = {}
        likeinfo['user_id'] = logininfo.user.id
        likeinfo['post_id'] = BlogInfo.id
        addLike(likeinfo)
            .then(() => setlikechange(!likechange))
            .then(() => setisdelete(false))
    }

    useEffect(() => {
        likelist(BlogInfo.id,logininfo.user.id,setlike)
    }, [likechange])

    useEffect(() => {
        bloglook(logininfo.user.id, BlogInfo.id)
    }, [])

   
    const handledelete = () => {
        deleteBlog(BlogInfo.id,logininfo.key)
            .then(() => history.push('/'))
    }

    return (
        <div className="d-flex flex-row col-xl-7 col-11" >
            <div className="card m-3 shadow-lg rounded-3 p-2 col-8" style={{ height: '770px' }} >
                <p className="card-text lora fs-3 text-center shadow-lg" >{BlogInfo.category}</p>
                <div className="d-flex flex-row" >
                    <div className="col-6" >
                        <img src={BlogInfo.image} className="card-img-top shadow-lg rounded" style={{ height: '300px' }} alt={BlogInfo.title} />
                    </div>
                    <ul className="list-group list-group-flush lora ms-4 col-4">
                        <p className="fs-4 mb-4 fw-bold text-danger">{BlogInfo.title}</p>
                        <li className="list-group-item">
                            Publish Date:
                            <div className="fw-bold">
                                {BlogInfo.publish_date.slice(0, 10)}
                            </div>
                        </li>
                        <li className="list-group-item">
                            Last Update
                            <div className="fw-bold">
                                {BlogInfo.last_update.slice(0, 10)}
                            </div>
                        </li>
                        <li className="list-group-item">Author:
                            <div className="fw-bold">
                                {BlogInfo.user}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="card-body nunito">

                    <p className="card-text shadow-sm p-2 border" style={{ height: "280px", overflow: 'scroll', position: 'relative', left: '-15px' }}>{BlogInfo.content}</p>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-evenly" style={{ height: '300px' }}>
                    <span className="me-3 lora"><b>{BlogInfo.comment_count}</b> Comment</span>
                    <span className="lora me-2"><b>{like[1]?.like_count}</b>  Like</span>

                    <a className="align-top icon" onClick={addlike}>
                        {like[0]?.length > 0 ? <i className="btn text-danger fs-2 bi bi-heart-fill "></i> : <i className="btn text-danger fs-2 bi bi-heart "></i>}
                    </a>
                    {logininfo.user.id === BlogInfo.user_id ? <>
                        <button className='btn btn-primary me-2 rounded-pill' onClick={() => history.push('/updateblog')}><i className="bi bi-pencil-square"></i> Update</button>
                        <div className="">
                            <button className='d-block btn btn-danger ms-2 rounded-pill' onClick={() => setisdelete(true)}><i className="bi bi-trash-fill"></i> Delete</button>
                            {isdelete ?
                                <div > <button className='btn-sm btn-white rounded-pill mt-2 ms-2' onClick={handledelete}> Yes </button>  <button className='btn-sm btn-dark rounded-pill' onClick={() => setisdelete(false)}> No </button> </div>
                                : null}
                        </div></> : null}

                </div>
            </div>
            <div className='d-flex flex-column col-4' style={{ height: "800px", overflow: 'scroll' }}>
            <Comments/>

            </div>
        </div>

    );
};

export default Details;

