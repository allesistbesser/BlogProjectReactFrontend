import React, {useContext} from "react";
import {BlogContext} from "../context/BlogContext"
import { useHistory } from "react-router";

const Post = ({post}) => {

  const history = useHistory();

  const {setBlogInfo, islogin} = useContext(BlogContext)
 
  const handleClick = ()=>{
    setBlogInfo(post);
    islogin ? history.push("/detail"): history.push("/login");
  }
 
  return (
        
      <div onClick={handleClick} className="card m-3 shadow-lg rounded-3 ps-1 pe-1 post_img" style={{width:"320px", height:"550px" , cursor:'pointer'}}>
        <p className="lora fs-3 text-danger" style={{transform: 'rotate(-90deg)', position:'relative', left:'-138px', top:'20px'}}>{post.category}</p>
        <img  src={post.image} className="card-img-top ms-5 shadow-lg" style={{position:'relative', top:'-40px', width:"250px", height:'200px', borderRadius: '50px 20px'}}alt={post.title} />
        <div className="card-body lora">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text lora_sm" style={{ height:"80px", overflow:'hidden'}} >{post.content}</p>
        </div>
        <ul className="list-group list-group-flush lora_sm">
          <li className="list-group-item">
            Publish Date:{post.publish_date.slice(0,10)}
          </li>
          <li className="list-group-item">
            Last Update{post.last_update.slice(0,10)}
          </li>
          <li className="list-group-item">Author:{post.user}</li>
        </ul>
        <div className="card-body">
          <span  className="card-link ">
          <i className="bi bi-chat-fill me-2"></i>{post.comment_count}
          </span>
          <span className="card-link">
          <i className="bi bi-heart-fill me-2"></i>{post.like_count}
          </span>
          <span className="card-link">
          <i className="bi bi-eye-fill me-2"></i>{post.postview_count}
          </span>
        </div>
      </div>
    
  );
};

export default Post;
