import React from 'react';
import { IComponent } from '../../../@types/icomponent';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery , gql } from '@apollo/client';


/**
 * LoggedInHome component is used to display the content on home page when user is logged in.
 * When not authenticated, the component will return null.
 * 
 * @param props 
 */
export default function LoggedInHome(props: IComponent) {
    const {user, isAuthenticated} = props;

    if (!isAuthenticated) {
        return null
    }

    const EXCHANGE_RATES = gql`
    query {
        allAuthors {
        id
        }
    }
    `;

    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    return isAuthenticated && (
        <Container>
            <Row>
                <Col>
                    <h1>User is logged in</h1>
                </Col>
            </Row>
        </Container>
    )
}