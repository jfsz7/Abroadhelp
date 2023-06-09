import { faLink, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import UserProfile from '../UserProfile/UserProfile';

const TopLink = ({refetch, setRefetch}) => {
    return (
        <div className="top-link-section  ps-2 py-2">
            <UserProfile refetch={refetch} setRefetch={setRefetch}></UserProfile>
        </div>
    );
};

export default TopLink;