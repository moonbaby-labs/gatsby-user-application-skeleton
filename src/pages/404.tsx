import React from "react";
import Layout from "../components/layout/layout";
import { useAuth0 } from "@auth0/auth0-react";


/**
 * This is the 404 content component.
 */
export default function NotFound() {
    const user = {
        email: '',
        name: '',
        picture: ''
    }

    return (
        <Layout pageName="Not Found" user={user} isAuthenticated={false}>
            <h1>Page Not Found</h1>
        </Layout>
    )
}