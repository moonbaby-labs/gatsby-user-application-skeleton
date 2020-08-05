import React, { useEffect } from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { useAuth0 } from "@auth0/auth0-react"

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/home/checkout/CheckoutForm";

import { Container, Row, Col } from 'react-bootstrap';

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

const redirectToCheckout = async event => {

    event.preventDefault()

    const stripe = await stripePromise

    const { error } = await stripe.redirectToCheckout({
        items: [{ sku: process.env.GATSBY_BUTTON_SKU_ID, quantity: 1 }],
        successUrl: `${window.location.origin}/page-2/`,
        cancelUrl: `${window.location.origin}/`,
    })

    if (error) {
        console.warn("Error:", error)
    }
}

const Checkout = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        <Layout pageName="Home" user={user} isAuthenticated={isAuthenticated}>
            <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
            <Container>
                <Row>
                    <Col>
                        <div className="App">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Checkout