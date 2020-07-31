import React, { ReactElement } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './profileIcon.css';
import { Dropdown } from 'react-bootstrap';
import { user } from '../@types/user';


interface IProfProps {
    user: user;
    isAuthenticated: boolean;
}

export default function ProfileIcon(props: IProfProps) {
    const {user, isAuthenticated} = props;
    const {logout} = useAuth0();

    const GetBadge: () => ReactElement = () => {
        if (!user.picture) {
            const initials: string = user.name.split(" ").map(word => word.charAt(0)).join("").toUpperCase();
            return <span className="app_profile_badge_initials"> {initials} </span>
        }

        return <span className="app_profile_badge_initials" style={{backgroundImage: `url('${user.picture}')`, backgroundSize: 'cover'}}></span>
    }

    return (
        isAuthenticated && (
            <div className="app_profile_dropdown">
                <Dropdown>
                    <Dropdown.Toggle>
                        <GetBadge />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
          )
    )
}