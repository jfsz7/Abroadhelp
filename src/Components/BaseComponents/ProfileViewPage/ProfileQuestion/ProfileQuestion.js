import React, { useContext, useState } from 'react';
import './ProfileQuestion.css';
import { faEllipsisVertical, faEye, faMessage, faArrowUp, faArrowDown, faArrowCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Button, Dropdown, FloatingLabel, Form } from 'react-bootstrap';
import { UserContext } from '../../../../App';
import axios from 'axios';
import { baseUrl } from '../../../../services/api';
import profile1 from '../../../../images/qsPage/Ava.png';

import { toast } from 'react-toastify';
const ProfileQuestion = ({posts}) => {
    const [modalShow, setModalShow] =useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [refetch, setRefetch] = useState(0)
    const {user, setUser} = useContext(UserContext)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [selected, setSelected] = useState('')

    const handleComment = async(id) => {
        setSelected(id)
        await axios.get(`${baseUrl}/comments/getCommentByPostId/${id}`).then(res =>{
            if(res.data.status){
              setComments(res.data.result)
            }
          })
        setIsVisible(!isVisible);
    };
   
    
    const handleDelete = async(id) =>{
        await axios.delete(`${baseUrl}/posts/${id}`).then(res => {
            if(res.data.status){
                toast.success(res.data.message)
                setRefetch(refetch+1)
                
            }else{
                toast.error(res.data.message)
            }
        })
        
    }
    const handleReputation = async(id) =>{
        await axios.patch(`${baseUrl}/user/updateUserInfoById/${id}`).then(res => {
            if(res.data.status){
                toast.success(res.data.message)
                setRefetch(refetch+1)
                
            }else{
                toast.error(res.data.message)
            }
        })
        
    }
    const handleLikes = async({id, task}) =>{
        if(task === 'addComments'){
            await axios.patch(`${baseUrl}/posts/${id}`, {task:task, userId: user?._id, commentBody: comment, commentedBy: user?._id, postId: id}).then(res => {
                if(res.data.status){
                    toast.success(res.data.message)
                    setRefetch(refetch+1)
                    handleComment(id)
                    setComment('')
                }else{
                    toast.error(res.data.message)
                }
            })
        }else{
            await axios.patch(`${baseUrl}/posts/${id}`, {task:task, userId: user?._id}).then(res => {
                if(res.data.status){
                    toast.success(res.data.message)
                    setRefetch(refetch+1)
                    
                }else{
                    toast.error(res.data.message)
                }
            })
        }
        
    }
    return (
        <div className="middle-question-block-profile">
              {
            posts.map(post =>     <div className="question-block shadow-sm mb-3">
            <div className="d-flex justify-content-between">
                <div className="qs-user d-flex flex-row">
                    <img src={profile1} alt="user image"  height={35} width={35} />
                    <div className="user-details d-flex flex-column ps-2">
                        <span><Link className='text-decoration-none' to={`/user-profile/${post?.postBy?._id}`}>{post?.postBy?.username}</Link></span>
                        <span>{formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}</span>
                    </div>
                </div>
                <div className='position-relative'>
                    <Dropdown>
                        <Dropdown.Toggle className='p-0 bg-trs'>
                            <FontAwesomeIcon icon={faEllipsisVertical} className='cursor3dot' />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='p-1'>
                            <Button onClick={()=> handleDelete(post._id)} className='w-100'>Delete</Button>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="qs-details d-flex flex-col align-items-center w-75">
                <div className="qs-text">
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: post?.content }} />

                   {
                    post?.postImg && <div className='mt-2 mb-2'>
                    <img src={post.postImg} className='mx-auto' alt='hello' />
                    </div>
                   }
                </div>
            </div>
            <div className="tag-section d-flex flex-row pt-2">
                <div className="qs-tag">
                    <button onClick={()=>handleLikes({id: post?._id, task: 'addLike'})} className='btn p-0'><FontAwesomeIcon className='p-0' icon={faArrowCircleUp} /></button>
                    <span className='px-2'>{post.likes}</span>
                    <button  onClick={()=>handleLikes({id: post?._id, task: 'removeLike'})} className='btn p-0'><FontAwesomeIcon icon={faArrowAltCircleDown} /></button>
                </div>
                <div className="viewer-action d-flex align-items-center ps-2">
                    <span className='pe-3'><FontAwesomeIcon className='pe-1' icon={faMessage} />{post.comments}</span>
                    <button onClick={()=>{ setSelected(post?._id)
                   
                     handleComment(post._id) 
                        }} className="ans-btn me-2 py-1 btn btn-dark" >Answer</button>
                </div>
            </div>
            
            {
                post?._id === selected && <div >
                <div className='mb-3'>
                    {
                        comments?.length > 0 &&
                        comments?.map(c => <div className='comment-div mb-3'>
                            <div className='d-flex justify-content-start align-items-start'><div className='me-3'><img src={profile1} style={{height: '35px', width: '35px' }} alt='img'/></div><div><p><strong>{c.commentedBy?.username}</strong></p><p className='comment-para'><small>{c.commentBody}</small></p>
                            <button className='ans-btn  btn btn-dark' onClick={()=> handleReputation(c.commentedBy?._id)}>Upvote</button>
                            </div></div>
                            
                        </div>)
                    }
                </div>
                    <div className="card card-body">
                        <FloatingLabel controlId="answer-box" label="Type your answer">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                                required
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                            />
                        </FloatingLabel>
                        <div className="answer-action-btn d-flex flex-row justify-content-end mt-2">
                            <button onClick={() => setSelected('')} type='submit' className='btn btn-secondary w-25 me-2'>Close</button>
                            <button onClick={()=>handleLikes({id: post?._id, task: 'addComments'})}type='submit' className='btn btn-secondary w-25'>Submit</button>
                        </div>
                    </div>
                </div>
            }
        </div>)
          }

        </div>
    );
};

export default ProfileQuestion;