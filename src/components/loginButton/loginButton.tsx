import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface ILoginProps {
    isAuthenticated: boolean;
}

/**
 * Button used to log into the application.
 */
export default function LoginButton(props: ILoginProps) {
    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = props;

    return (
        !isAuthenticated && (
            <button className="login-button" onClick={() => loginWithRedirect()}>Register / Log In</button>
        )
    )
}