import './App.css';
import AppRouter from './router/AppRouter';
import { BlogContext } from "./context/BlogContext"
import { useState } from 'react';
// import { ToastContainer } from "react-toastify";

import { useFetch } from './utils/Functions';

function App() {
  const [date, setDate] = useState(Date().slice(4, 21));
  const [islogin,setislogin] = useState(false)
  const [logininfo, setlogininfo] = useState([])
  const [isChange,setisChange] = useState(false)
  const [BlogInfo , setBlogInfo] = useState([])

  const {category,posts} = useFetch()
 
  return (
    <div >
      <BlogContext.Provider value={{ isChange,setisChange,islogin,setislogin,logininfo, setlogininfo ,category, posts , date , setDate, BlogInfo , setBlogInfo}}>

        <AppRouter />

      </BlogContext.Provider>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;