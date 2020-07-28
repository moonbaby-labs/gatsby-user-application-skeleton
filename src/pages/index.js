import React from "react"
import { Row, Col, Container } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
    <Container className="text-center">
      <Row>
        <Col>
          <p>
            Welcome to the Form App Project.<br/>
            Built with Love using React, Node.js, and Express.
          </p>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage
