import axios from "axios"
import { useState, useEffect } from "react"

const baseurl ='https://blogapi222.herokuapp.com/'

export const useFetch = () => {
    const [category, setcategory] = useState([])
    const [posts, setposts] = useState([])
    const [isloading, setisloading] = useState(false)
    useEffect(() => {
        axios.get(`${baseurl}category/`)
        .then((res)=> setcategory(res.data))
        .then(() => setisloading(true))
                
        axios.get(`${baseurl}post/`)
        .then((res)=> setposts(res.data))
           
      }, [])
return {category,posts,isloading}
}

export const blogCreate = async (token,bloginfo) =>{
    let config;
    if (token){
      config = {headers: {
        Authorization: `Token ${token}`,
      }}
    } else {
      config = {headers: {
     }}
    }
    await axios.post(`${baseurl}post/`, bloginfo, 
     config)
}
// Blog Update
export const blogUpdate = async (id,token,bloginfo) =>{
  let config;
  if (token){
    config = {headers: {
      Authorization: `Token ${token}`,
    }}
  } else {
    config = {headers: {
   }}
  }
  await axios.put( `${baseurl}post/${id}/`, bloginfo, 
   config)
}

export const deleteBlog = async (id,token) => {
     await axios.delete(`${baseurl}post/${id}/`,
     {headers:{
        Authorization: `Token ${token}`,
     }}
     )
 }

export const bloglook = async (user_id,post_id) => {
     await axios.post(`${baseurl}look/`,
     {'user':user_id,'post':post_id}
     )
 }
// Comments
export const useComment = (id,isDelete,isAddComment) =>{
    const [yorum, setyorum] = useState([])
        
    useEffect(() => {
        axios.get(`${baseurl}comments/${id}`)
            .then((res) => setyorum(res.data))

           }, [isDelete,isAddComment])
    
    return {yorum}
}

 export const deleteComment = async (id) =>{
    await axios.delete(`${baseurl}comments/${id}`)
 }

 export const registeruser = async (info) => {
  
   await axios.post(`${baseurl}user/register/`, info)
      
 }

 export const addComment = async (commentinfo) =>{
  await axios.post(`${baseurl}comments/1`, commentinfo
)}

export const likelist = async (blog_id,user_id,setlike) =>{
  axios.get(`${baseurl}likelist/${blog_id}/${user_id}`)
  .then((res) => setlike(res.data))
}

export const addLike = async (likeinfo) =>{
  await axios.post(`${baseurl}likelist/1/1`, likeinfo)
}

export const logout = async () =>{
  await axios.post(`${baseurl}user/auth/logout/`)
}

export const userlogin = async (infologin,setlogininfo,setislogin,setError,history) => {
  await axios.post(`${baseurl}user/auth/login/`, infologin)
  .then((res)=> {setlogininfo(res.data); setislogin(true); history.push('/')})
  .catch((err)=> {setError(err)})
}



