import React, { useContext } from 'react';
import './UserProfile.css';
import Card from 'react-bootstrap/Card';
import github from './../../../images/social/github.png';
import facebook from './../../../images/social/facebook.png';
import instagram from './../../../images/social/instagram.png';
import ppic from '../../../images/qsPage/Ava.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faFlagUsa } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AskQsModal from '../AskQsModal/AskQsModal';
import { Button } from 'react-bootstrap';
import { UserContext } from '../../../App';

const UserProfile = ({refetch, setRefetch}) => {
    const [modalShow, setModalShow] = React.useState(false);
    const {user, setUser} = useContext(UserContext)

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className="user-profile-card d-flex flex-column">
                <Button variant="dark" onClick={() => setModalShow(true)} className='mb-2'>Ask question</Button>
                <AskQsModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    refetch={refetch}
                    setRefetch={setRefetch}
                />
                <Card className='user-card text-center py-3'>
                    <div className="card-img-ppics d-flex flex-column align-items-center text-center">
                    <div style={{height: "120px", width: "120px", borderRadius: "100%"}} className="profile-img-style">{user?.email?.slice(0,1)}</div>
                        <Card.Title className='mb-3'><a className='text-decoration-none text-dark h6' href='/'><Link className='text-decoration-none' to={`/user-profile/${user?._id}`}>@{user?.username}</Link></a></Card.Title>
                    </div>
                    <Card.Body>

                        <Card.Text className='mb-3'>
                            <div>
                                <p className='fw-bold mb-0'><FontAwesomeIcon icon={faFlagUsa} /> {user?.country}</p>
                                <p className='fw-semibold'>{user?.university}</p>
                            </div>
                            <span className='me-2'><FontAwesomeIcon icon={faAward} /></span>
                            <span>{user?.reputation}</span>
                 
                        </Card.Text>
                        <Card.Text>
                            <div className="btm-icon-section d-flex justify-content-center pb-3">
                                <a href="https://github.com/" className='tex-decoration-none pe-3'><span><img src={github} alt="git" /></span></a>
                                <a href="https://www.facebook.com/" className='tex-decoration-none pe-3'><span><img src={facebook} alt="fb" /></span></a>
                                <a href="https://www.instagram.com/" className='tex-decoration-none pe-3'><span><img src={instagram} alt="insta" /></span></a>
                            </div>
                        </Card.Text>

                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default UserProfile;