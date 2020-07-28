/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col } from "react-bootstrap"
import Navbar from "./navBar"
import "./layout.css";


/**
 * 
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>
          <LoginButton />
        {children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">{process.env.GATSBY_SAMPLE_APP} Gatsby {process.env.GATSBY_APP_SAMPLE} </a>
        </footer>
      </div>
 */

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const Layout = ({ children }) => {
/**
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
**/
  const {user, isAuthenticated} = useAuth0();

  return (
    <>
      <Auth0Provider
      domain="projectreports.us.auth0.com"
      clientId="mtzNRkzuiCL0wNSL9S7SCv2CXDxU0jHH"
      redirectUri={'http://localhost:8000/callback'}
    >

      <Container fluid className="px-0 main">
        <Navbar pageInfo={pageInfo} />
        <Row noGutters>
          <Col>
            <Container className="mt-5">
              <main>{children}</main>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container fluid className="px-0">
        <Row noGutters>
          <Col className="footer-col">
            <footer>
              <span>
                © {new Date().getFullYear()}, Developed By
                {` `}
                <a href="https://lunarcollective.io">Lunar Collective</a>
              </span>
            </footer>
          </Col>
        </Row>
      </Container>
    </Auth0Provider>
      
    </>
  )
}


export default Layout
