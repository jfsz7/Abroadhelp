import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Dashboard from './Components/BaseComponents/Dashboard/Dashboard';
import Blog from './Components/BaseComponents/Blog/Blog';
import ProfileViewPage from './Components/BaseComponents/ProfileViewPage/ProfileViewPage';
import About from './Components/BaseComponents/About/About';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from './services/api';
import RequireAuth from './Components/Shared/RequireAuth';
import TakeEmail from './Components/ForgotPass/TakeEmail';
import Forgotpass from './Components/ForgotPass/Forgotpass';
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"))
  useEffect(()=>{
    if(token){
      axios.post(`${baseUrl}/user/autosignin`, {token: token}).then(res =>{
        if(res.data.status){
          setUser(res.data.result)
        }
      })
    }
  },[token])
  return (
    <div className="App">
          <UserContext.Provider value={{ user, setUser }}>

      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/take-email' element={<TakeEmail />}></Route>
        <Route path='/forget-pass/:email' element={<Forgotpass />}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>}></Route>
        <Route path='/user-profile/:id' element={<RequireAuth><ProfileViewPage /></RequireAuth>}></Route>
        <Route path='/blog-page' element={<RequireAuth><Blog /></RequireAuth>}></Route>
      </Routes>
      <ToastContainer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
