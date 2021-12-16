import React, {useContext, useState} from 'react'
import { BlogContext } from '../context/BlogContext'
import { deleteComment } from '../utils/Functions'


const DeleteComment = ({user_id,id,setisAddComment,isAddComment}) => {
     const {logininfo} = useContext(BlogContext)
    const [isDelete, setisDelete] = useState(false)
    
  
    const handleDelete = async (id,user_id) => {
        if (user_id === logininfo.user.id){
            deleteComment(id)
            .then(() => setisDelete(false))
            .then(()=> setisAddComment(!isAddComment))
        }
    }

    return (
        <div className='d-flex flex-row align-items-center'>
            {user_id === logininfo.user.id ? 
                     <button className='btn-danger m-2 rounded-circle' onClick={() => setisDelete(true)}><i className="bi bi-trash-fill"></i></button>
                    : null}
                    {isDelete && user_id === logininfo.user.id  ?
                        <div className='d-flex flex-row'>
                            <span className='ms-2 me-2 fw-bold'> Delete comment? </span>
                            <button className='me-1  btn-danger' onClick={() => handleDelete(id,user_id)}> Yes</button>
                            <button className='me-1  btn-primary' onClick={() => setisDelete(false)}> No </button>
                        </div>
                        : null}
        </div>
    )
}

export default DeleteComment
