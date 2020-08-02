import React, { useEffect } from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { useAuth0 } from "@auth0/auth0-react"
import LoggedOutHome from "../components/home/loggedOut/loggedOutHome"
import LoggedInHome from "../components/home/loggedIn/loggedInHome"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"


/**
 * This is the front page when users come to the site.
 * Needs 2 components based on user state.
 * 1. What will users see when they are logged out of the application?
 * 2. What will users see when they are logged into the application?
 */
export default function Index() {
  const { user, isAuthenticated } = useAuth0();

  const EXCHANGE_RATES = gql`
      query {
        allAuthors {
          id
        }
      }
    `;
  
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  return (
    <Layout pageName="Home" user={user} isAuthenticated={isAuthenticated}>
      <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
      <LoggedOutHome user={user} isAuthenticated={isAuthenticated} />
      <LoggedInHome user={user} isAuthenticated={isAuthenticated} />
    </Layout>
  )
}

