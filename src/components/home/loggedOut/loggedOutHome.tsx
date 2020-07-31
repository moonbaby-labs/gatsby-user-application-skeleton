import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IComponent } from "../../../@types/icomponent";

/**
 * LoggedOutHome provides the content a visitor sees before logging into the application.
 * 
 * @param props 
 */
export default function LoggedOutHome (props: IComponent) {
    const { isAuthenticated } = props;

    return !isAuthenticated && (
        <Container>
            <Row>
                <Col>
                    <h1>You are logged out of the application</h1>
                </Col>
            </Row>
        </Container>
    )
}