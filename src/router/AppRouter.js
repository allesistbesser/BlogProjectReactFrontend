import { useContext } from "react";
import {BlogContext} from "../context/BlogContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Posts from "../components/Posts";
import Header from "../pages/Header";
import Details from "../pages/Details.js";
import Login from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import UpdateBlog from "../pages/UpdateBlog";
import Profil from "../pages/Profil";
import Register from "../pages/Register";


const AppRouter = () => {

  const {islogin} = useContext(BlogContext)
  return (
    
      <Router>
        <Header />
         <Switch>
        
          {!islogin ? <Route exact path="/login" component={Login} />:null}
          {!islogin ? <Route exact path="/register" component={Register} />:null}
          {islogin ? <Route exact path="/newblog" component={NewBlog} /> : null} 
          {islogin ? <Route exact path="/detail" component={Details} /> : null} 
          {islogin ? <Route exact path="/updateblog" component={UpdateBlog} /> : null} 
          {islogin ? <Route exact path="/profil" component={Profil} /> : null}
          <Route exact path="/" component={Posts} />
        </Switch>
      </Router>
      
  );
};

export default AppRouter;
