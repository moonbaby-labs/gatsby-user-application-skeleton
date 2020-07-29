import React from "react";
import Layout from "../components/layout/layout";
import { useAuth0 } from "@auth0/auth0-react";


/**
 * This is the 404 content component.
 */
export default function NotFound() {
    const {user, isAuthenticated} = useAuth0();

    return (
        <Layout pageName="Not Found" user={user} isAuthenticated={isAuthenticated}>
            <h1>Page Not Found</h1>
        </Layout>
    )
}