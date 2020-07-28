import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Form, Button} from "react-bootstrap";

const Register = () => (
    <Layout pageInfo={{ pageName: "register" }}>
        <SEO title="Register" />
        <h1>Register</h1>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" placeholder="Company name" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Agree that Adam is just great, get a %5 discount." />
            </Form.Group>
            <Button variant="success" type="submit">
                Register
            </Button>
        </Form>
    </Layout>
)

export default Register
