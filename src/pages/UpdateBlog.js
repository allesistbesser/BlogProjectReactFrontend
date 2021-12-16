import { Button, Form, Row, Col } from "react-bootstrap";
import { BlogContext } from "../context/BlogContext";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { blogUpdate } from "../utils/Functions";


const UpdateBlog = () => {
  const history = useHistory();

  const {
    setisChange,
    isChange,
    logininfo,
    category,
    BlogInfo,
    setBlogInfo,
  } = useContext(BlogContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let bloginfo = {};
    data.forEach(function (value, key) {
      bloginfo[key] = value;
    });

    bloginfo["user_id"] = logininfo.user.id;
    
    blogUpdate(BlogInfo.id,logininfo.key,bloginfo)
    .then(() => {
        setisChange(!isChange);
        history.push("/");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogInfo({ ...BlogInfo, [name]: value });
  };

  return (
    <div className="d-flex flex-column">
      <h2 className="text-center mt-3">&#60;Update Blog&#62;</h2>
      <div className="col-5 mb-4 container">
        <img src={BlogInfo.image} className="card-img-top shadow-lg rounded-pill" style={{ height: '300px' }} alt={BlogInfo.title} />
      </div>
      <Form onSubmit={handleSubmit} className="col-10 ms-5">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category_id" defaultValue={BlogInfo.category_id}>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={BlogInfo.title}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Title"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Conetent</Form.Label>
          <Form.Control
            name="content"
            value={BlogInfo.content}
            onChange={handleInputChange}
            as="textarea"
            rows={9}
            placeholder="............"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="image"
            value={BlogInfo.image}
            onChange={handleInputChange}
            placeholder="Enter image url"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState" className="col-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" defaultValue={BlogInfo.status}>
              <option>draft</option>
              <option>published</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Button variant="danger" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateBlog;
