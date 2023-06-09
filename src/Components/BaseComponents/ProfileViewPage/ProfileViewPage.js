import React, { useEffect, useState } from 'react';
import './ProfileViewPage.css';
import DashboardHeader from '../../Header/DashboardHeader/DashboardHeader';
import { Container } from 'react-bootstrap';
import leftSideNav from '../../Utilities/Utilities';
import LeftNavBar from '../LeftNavBar/LeftNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faBars, faFlagUsa } from '@fortawesome/free-solid-svg-icons';
import pics from '../../../images/qsPage/Ava.png';
import github from './../../../images/social/github.png';
import facebook from './../../../images/social/facebook.png';
import instagram from './../../../images/social/instagram.png';
import ProfileQuestion from './ProfileQuestion/ProfileQuestion';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../services/api';
import Loader from '../../Shared/Loader';
import draftToHtml from 'draftjs-to-html';
const ProfileViewPage = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(id){
          axios.get(`${baseUrl}/user/getUserInfoById/${id}`).then(res =>{
            if(res.data.status){
              setUser(res.data.result)
            }
          })
        }
      },[id])
      useEffect(()=>{
        if(id){
          axios.get(`${baseUrl}/posts/getPostByUserId/${id}`).then(res =>{
            if(res.data.status){
                const newPost = [];
                for (const i of res.data.result) {
                  const content = draftToHtml(JSON.parse(i.desc));
                  console.log(content);
                  newPost.push({ ...i, content: content });
                }
                // console.log(newPost)
                setLoading(false)

              setPosts(newPost)
          
            }
          })
        }
      },[id])
      if(loading){
        return <Loader></Loader>
      }
    return (
        <div >
            <DashboardHeader></DashboardHeader>
            <Container fluid>
                <div className="ouestion-answer-section">
                    <div className="category-section d-flex justify-content-md-between justify-content-sm-between justify-content-xsm-between">
                        <div className='navIconDiv d-flex flex-row'>
                            <a onClick={leftSideNav} id='navBtn' style={{ fontSize: '1.4rem' }} className='btn text-decoration-none text-dark ms-0-xsm ms-4 d-none d-sm-block d-block-tblt d-xsm-block d-md-none'>
                                <FontAwesomeIcon icon={faBars} />
                            </a>
                        </div>
                    </div>
                    <div className="hero-section-content d-flex rsp-SideP position-relative">
                        <LeftNavBar></LeftNavBar>
                        <div className='w-100 d-flex justify-content-center'>
                            <div className="profile-section">
                                <Container>
                                    <div className="user-profile-post py-3 rounded d-flex flex-column justify-content-center align-items-center">
                                        <div className='w-25 text-center pb-3'>
                                        <div style={{height: "120px", width: "120px", borderRadius: "100%", marginRight:"20px"}} className="profile-img-style mx-auto">{user?.email?.slice(0,1)}</div>
                                        </div>
                                        <h1 className='h5'>{user?.username}</h1>
                                        
                                        <span >{user?.major}</span>
                                        <div className="user-info d-flex flex-wrap justify-content-center pb-2">
                                            <span className='px-3'>{user?.email}</span>
                                            <span className='fw-bold'><FontAwesomeIcon icon={faFlagUsa} /> {user?.country}</span>
                                            <p className='fw-semibold px-3 d-flex justify-center'>{user?.university}</p>
                                        </div>
                                        <div className='d-flex'>
                                            <div className="btm-archive-section d-flex justify-content-center pb-3 pe-3">
                                                <span className='me-2'><FontAwesomeIcon icon={faAward} /></span>
                                                <span>{user?.reputation}</span>
                                                {/* <span className='ms-2'>[8]</span> */}
                                            </div>
                                            <div className="btm-icon-section d-flex justify-content-center">
                                                <a href="https://github.com/" className='tex-decoration-none px-1'><span><img src={github} alt="git" /></span></a>
                                                <a href="https://www.facebook.com/" className='tex-decoration-none px-1'><span><img src={facebook} alt="fb" /></span></a>
                                                <a href="https://www.instagram.com/" className='tex-decoration-none px-1'><span><img src={instagram} alt="insta" /></span></a>
                                            </div>
                                        </div>

                                    </div>
                                    <ProfileQuestion posts={posts}></ProfileQuestion>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProfileViewPage;