import React, { useContext } from 'react';
import './LeftNavBar.css';
import { faAddressCard, faGauge, faLifeRing, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../../App';
const LeftNavBar = () => {
    const {user} = useContext(UserContext)
    return (
        <div id='leftSideNavBar' className="left-menu-section d-flex flex-column justify-content-between" style={{ visibility: window.innerWidth <= 991 ? 'hidden' : 'visible', top: '0%' }}>
            <div className="menu-section">
                <ul className='menu-items list-group'>
                    <NavLink to="/dashboard" className='text-decoration-none text-dark'><li className='menu-item'><FontAwesomeIcon icon={faGauge} className='pe-2' /> Home</li></NavLink>
                    <NavLink to={`/user-profile/${user?._id}`} className='text-decoration-none text-dark'><li className='menu-item'><FontAwesomeIcon icon={faAddressCard} className='pe-2' /> User Profile</li></NavLink>
                    <NavLink to="/blog-page" className='text-decoration-none text-dark'><li className='menu-item'><FontAwesomeIcon icon={faPenNib} className='pe-2' /> Blog</li></NavLink>
                </ul>
            </div>
        </div>
    );
};

export default LeftNavBar;