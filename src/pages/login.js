import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Form, Button, Container, Row, Col} from "react-bootstrap";

const Login = () => (
  <Layout pageInfo={{ pageName: "login" }}>
    <SEO title="Login" />
      <Container>
          <h1>Login</h1>
          <Row>
              <Col>
                  <Form>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Login
                      </Button>
                  </Form>
              </Col>

              <Col>
                  Don't Have an Account?<br/>
                  <Link to="/register">
                    <Button variant="info">Register</Button>
                  </Link>
              </Col>
          </Row>
      </Container>
  </Layout>
)

export default Login
