import React from 'react';
import './Blog.css';
import DashboardHeader from '../../Header/DashboardHeader/DashboardHeader';
import { Container } from 'react-bootstrap';
import leftSideNav from '../../Utilities/Utilities';
import LeftNavBar from '../LeftNavBar/LeftNavBar';
import QuestionsBlock from '../QuestionsBlock/QuestionsBlock';
import TopLink from '../TopLink/TopLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BlogPost from './BlogPost/BlogPost';
const Blog = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <Container fluid>
                <div className="ouestion-answer-section">
                    <div className="category-section py-1">
                        <div className='navIconDiv d-flex flex-row'>
                            <a onClick={leftSideNav} id='navBtn' style={{ fontSize: '1.4rem' }} className='btn text-decoration-none text-dark ms-0-xsm d-none d-sm-block d-block-tblt d-xsm-block d-md-none'>
                                <FontAwesomeIcon icon={faBars} />
                            </a>
                            {/* <button className="w-100 mx-2 btn btn-secondary blog-write-btn-fs fw-blod fs-5 collapsed d-flex flex-row align-items-center justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2"> <i class="fa-solid fa-pen-nib pe-2 pt-2 fa-fade"></i> Write a blog</button> */}
                        </div>
                    </div>
                    <div className="hero-section-content d-flex rsp-SideP position-relative ">
                        <LeftNavBar></LeftNavBar>
                        <BlogPost></BlogPost>
                        <div className="resp-condition">
                            <TopLink></TopLink>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Blog;