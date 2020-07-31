/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { ReactElement } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Navbar from "../navBar/navBar"
import "./_layout.scss";
import { user } from "../../@types/user";


interface ILayout {
  children: ReactElement | ReactElement[];
  isAuthenticated: boolean;
  user: user;
  pageName: string;
}


/**
 * Layout is the overall layout container that encapsulates the entire application.
 * It includes any navigation, sidebar
 * 
 * @param props 
 */
export default function Layout(props: ILayout) {
  const { children, isAuthenticated, user, pageName } = props;

  return (
      <>
        <Container fluid className="px-0 main">
          <Navbar pageName='' user={user} isAuthenticated={isAuthenticated} />
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
    </>
  )
}
