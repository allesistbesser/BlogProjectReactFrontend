import React, { useContext, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Button, Nav, Form, FormControl, Container, Offcanvas } from 'react-bootstrap';
import { useHistory } from "react-router";
import { BlogContext } from "../context/BlogContext"
import { logout , postsearch} from '../utils/Functions';


const Header = () => {

 
  
  const { islogin, setislogin, setlogininfo, logininfo } = useContext(BlogContext);
  const history = useHistory();
  const [searchitem , setsearchitem] = useState('')
  const [searchResult , setsearchResult] = useState()

  const handlelogout = () => {
    logout()
      .then(() => { setislogin(false); setlogininfo('') })
  }
  const handleOnchange = (e) => {
    setsearchitem(e.target.value)
    if (searchitem === '') {setsearchResult()}
  }

  return (
    <div>
      <Navbar className='p-0 rounded shadow-lg' bg={islogin ? 'warning' : 'info'} expand={false}>
        <Container fluid>
          <Navbar.Brand className='btn' onClick={() => history.push("/")}>
            <img
              src="https://knockknockwhoisthere.files.wordpress.com/2016/08/blog-logo-animated-ws_720x342.gif"
              width="120"
              height="50"
              className="d-inline-block align-top rounded icon"
              alt="Blog logo"
            /> 
            </Navbar.Brand>
          <h3 className='lora fw-bold text-primary'> Blog Project (Django/React) </h3>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton >
              <Offcanvas.Title id="offcanvasNavbarLabel">Menü</Offcanvas.Title>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                {islogin ? <p className='text-danger fw-bold fs-4'>&#60; {logininfo.user.first_name} &#62;</p>:  <p className='text-danger fw-bold fs-4'>&#60;Please login &#62;</p> }
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {!islogin ? <Nav.Link onClick={() => history.push("/login")}><i className="bi bi-person-circle" /> Login</Nav.Link> : null}
                {!islogin ? <Nav.Link onClick={() => history.push("/register")}><i className="bi bi-person-plus-fill" /> Register</Nav.Link> : null}
                {islogin ? <Nav.Link onClick={() => history.push("/newblog")}><i className="bi bi-plus-circle-fill" /> New Blog</Nav.Link> : null}
                {islogin ? <Nav.Link onClick={() => { handlelogout(); history.push('/') }}><i className="bi bi-box-arrow-right" /> Logout</Nav.Link> : null}
                {islogin ? <Nav.Link onClick={() => history.push('/profil')}><i className="bi bi-person" /> Profil</Nav.Link> : null}

              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search Blog in Content in Database"
                  className="me-2"
                  aria-label="Search"
                  value={searchitem} 
                  onChange={(e)=> handleOnchange(e)}
                />
                <Button onClick={()=> {postsearch(searchitem,setsearchResult)}} variant="outline-success">Search</Button>
                
              </Form>
              {searchResult ? <>  <p className='mt-3 fw-bold'>{searchResult?.length} Blog Found</p>  </> :  null}
             
              
              {searchResult?.map((item)=>(
                <div key={item.id} className='mt-2 fs-6 text-primary'>
                 
                <div > {item.title}</div>
                </div>
              ))}
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
