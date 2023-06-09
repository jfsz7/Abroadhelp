import React from 'react';
import './ResponsiveTopLink.css';
import pic from '../../../../images/qsPage/Ava.png'
import { Container } from 'react-bootstrap';
import leftSideNav from '../../../Utilities/Utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import UserProfile from '../../UserProfile/UserProfile';
const ResponsiveTopLink = ({refetch, setRefetch}) => {
    return (
        <div>
            <div className="d-none w-100 resp-top-link d-flex">
                <div className="nv-btn">
                    <div className="category-section py-1 d-flex justify-content-md-between justify-content-sm-between justify-content-xsm-between">
                        <a onClick={leftSideNav} id='navBtn' style={{ fontSize: '1.4rem' }} className='btn text-decoration-none text-white ms-0-xsm ms-4 d-none d-sm-block d-block-tblt d-xsm-block d-md-none'><FontAwesomeIcon icon={faBars} /></a>
                    </div>
                </div>
                
            </div>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <Container>
                        <UserProfile refetch={refetch} setRefetch={setRefetch} ></UserProfile>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveTopLink;