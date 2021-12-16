import React, { useState , useContext} from 'react'
import { Card, FormControl, Form} from 'react-bootstrap';
import { BlogContext } from '../context/BlogContext';

const Profil = () => {
    const [profilinfo, setprofilinfo] = useState({})
    const {logininfo} = useContext(BlogContext)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setprofilinfo({ ...profilinfo, [name]: value });
      };
    
    return (
        <div>
            <Card className='container mt-3 shadow-lg lora' style={{ width: '25rem', padding:'4px' }}>
                <Card.Img  className='container'style={{width:'150px' }} variant="top" src='https://c8.alamy.com/zoomsde/9/d4c59d90389444e3b1166312d2f7fa51/p9mywr.jpg' />
                <Card.Body>
                    <Form.Label className='fw-bold mt-2'htmlFor="username">User Name</Form.Label>
                    <FormControl
                     name="username"
                     value={logininfo.user.username}
                     onChange={handleInputChange}
                     id="username"/>

                
                    <Form.Label className='fw-bold mt-2'htmlFor="firstname">First Name</Form.Label>
                    <FormControl
                     name="first_name"
                     value={logininfo.user.first_name}
                     onChange={handleInputChange}
                     id="firstname"/>

                    <Form.Label className='fw-bold mt-2'htmlFor="lastname">Last Name</Form.Label>
                    <FormControl
                     name="last_name"
                     value={logininfo.user.last_name}
                     onChange={handleInputChange}
                     id="lastname"/>

                    <Form.Label className='fw-bold mt-2'htmlFor="email">Email</Form.Label>
                    <FormControl
                    type='email'
                     name="email"
                     value={logininfo.user.email}
                     onChange={handleInputChange}
                     id="email"/>

                    <p className='fw-bold mt-2'>Joined Date: {logininfo.user.date_joined}</p>
                    <p className='fw-bold'>Last Login: {logininfo.user.last_login}</p>
                   <Card.Link href="#">Update Profil</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Profil
