import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { baseUrl } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TakeEmail = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const handleSend = async () =>{
        await axios.post(`${baseUrl}/user/getVerificationCode`, {email: email}).then(res=>{
            if(res.data.status){
               toast.success('Code is sent to your email!')
               setTimeout(()=>{
                navigate(`/forget-pass/${res.data.result}`)
               },2000)
            }else{
                toast.error('failed to send the code!')
            }
        })
    }
    return (
        <div>
            <Container>
                <div style={{height: '100vh'}} className='d-flex justify-content-center align-items-center'>
                <div className="data-submit-field text-start">
            <h1 className="field-heading text-center">Enter Email to receive code!</h1>
                <div class="mb-3">
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control shadow-sm"
                  id="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <button onClick={handleSend} className="btn btn-bg text-white d-block mx-auto">
                Send Code
              </button>
                </div>
                </div>
            </Container>
        </div>
    );
};

export default TakeEmail;