
import React from "react"
import Layout from "../components/layout/layout";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


/**
 * This is the callback page after authentication.
 * When authentication succeeds, users should be redirected back to the home page.
 * When authentication fails, users will see a fail message.
 * 
 * @todo need to implement functionality to redirect to page that they were on when logging in.
 */
export default function Callback() {
    const { user, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        window.location.href = process.env.GATSBY_BASE_URL;
    }

    return (
        <>
            <Layout pageName={'Finish login'} user={user} isAuthenticated={isAuthenticated}>
                <h1>Unable to login</h1>
            </Layout>
        </>
    )
}