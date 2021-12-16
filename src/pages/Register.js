import { Button, Form, Row, Col} from "react-bootstrap";
import React, {  useState} from "react";
import { useHistory } from "react-router";
import { registeruser } from "../utils/Functions";
import * as Yup from "yup";
import { Formik } from "formik";

const signUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Display Name is required!!")
    .min(2, "Too short")
    .max(15, "Must be 15 char or less"),
  email: Yup.string().email("Invalid Email").required("Email is required!!"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have a uppercase")
    .matches(/[!?.@#$%^&*()-+]+/, "Password must have a special char"),
  password2: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const history = useHistory();
  const [Error, setError] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let registerinfo = {};
    data.forEach(function (value, key) {
      registerinfo[key] = value;
    });
    await registeruser(registerinfo)
    .then(()=> {sessionStorage.setItem('username',registerinfo.username);
    sessionStorage.setItem('password',registerinfo.password);history.push('/login')})
    .catch((err)=> {setError(err)} )
       
  };
   
  return (
    <div className="col-6 container mt-5">
      <h2 className="text-center text-danger fw-bold fs-1 mb-5"><i className="bi bi-person-plus-fill me-2" /> Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema}
      >
        {({
          handleChange,
          values,
          errors,
          touched,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                
                  name="username"
                  type="text"
                  onBlur={handleBlur}
                  value={values.username}
                  onChange={handleChange}
                  // error={touched.username && Boolean(errors.username)}
                  // helperText={touched.username && errors.username}
                  placeholder="Enter user name"
                />
                <div className="lora_sm text-danger m-1">{touched.username && errors.username}</div>
                <div className="lora_sm text-danger m-1">{touched.username && Boolean(errors.username)}</div>
                <div className="lora_sm text-danger m-1">{Error?.response?.data?.username}</div>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
              name="first_name"
              placeholder="Enter first name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last_name" placeholder="Enter last name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              name="email" 
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              // helperText={touched.email && errors.email}
              placeholder="Enter E-mail" />
                <div className="lora_sm text-danger m-1">{touched.email && Boolean(errors.email)}</div>
                <div className="lora_sm text-danger m-1">{touched.email && errors.email}</div>
                <div className="lora_sm text-danger m-1">{Error?.response?.data?.email}</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                onBlur={handleBlur}
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  // helperText={touched.password && errors.password}
                placeholder="Enter password"
              />
              <div className="lora_sm text-danger m-1">{touched.password && Boolean(errors.password)}</div>
              <div className="lora_sm text-danger m-1">{touched.password && errors.password}</div>
              <div className="lora_sm text-danger m-1">{Error?.response?.data?.password}</div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>re-Password</Form.Label>
              <Form.Control 
              name="password2" 
              onBlur={handleBlur}
              value={values.password2}
              onChange={handleChange}
              error={touched.password2 && Boolean(errors.password2)}
              // helperText={touched.password2 && errors.password2}
              placeholder="Enter re-Password" />

              <div className="lora_sm text-danger m-1">{touched.password2 && Boolean(errors.password2)}</div>
              <div className="lora_sm text-danger m-1">{touched.password2 && errors.password2}</div>
              <div className="lora_sm text-danger m-1">{Error?.response?.data?.password2}</div>
            </Form.Group>

            <Button variant="danger" type="submit" className="container">
              Register
            </Button>
            { Error?.message?.toLowerCase().includes('network') ?  <h3  className="mt-5 alert alert-danger" role="alert">Server Error</h3>: null}
            { Error?.userError ?  <h3  className="mt-5 alert alert-danger" role="alert">{Error?.userError} </h3>: null}
          </Form>
          
        )}
      </Formik>
    </div>
  );
};

export default Register;
