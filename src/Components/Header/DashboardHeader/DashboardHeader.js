import React, { useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, Container, Form } from "react-bootstrap";
import logo from "../../../images/Logo.png";
import pp from "../../../images/dahsboard-pp.jpg";
import "./DashboardHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faBell,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import axios from "axios";
import { baseUrl } from "../../../services/api";
const DashboardHeader = ({ search, setSearch, setSearchResult }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    axios.post(`${baseUrl}/posts/getAllPost`, { filter: "all" }).then((res) => {
      if (res.data.status) {
        setPosts(res.data.result);
      }
    });
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    if (searchText !== "") {
      const results = posts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResult(results);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (user?._id) {
        axios
          .get(`${baseUrl}/notifications/userId/${user?._id}`)
          .then((res) => setNotification(res.data.result));
      }
      return () => {
        clearInterval(interval); // Clear the interval when the component is unmounted
      };
    }, 5000);
  }, [user?._id]);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser({});
    navigate("/");
  };
  return (
    <div>
      <div className="site-header-section bg-dark relative">
        <Navbar className="px-4" expand="lg">
          <Container>
            <Navbar.Brand>
              <Link
                className="text-decoration-none fw-bold header-icons logo"
                to={"/dashboard"}
              >
                AbroadHelp
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="">
              <Nav className="me-auto">
                <Nav.Link className="menu-item-bg" href="/dashboard">
                  <Link className="text-decoration-none" to={"/dashboard"}>
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link className="menu-item-bg" href="/dashboard">
                  <Link className="text-decoration-none" to={"/blog-page"}>
                    Blog
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Form onClick={()=> navigate('/dashboard')}  onSubmit={handleSearch} className="d-flex order-cls">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" className="header-srch">
              Search
            </Button>
          </Form>
          <div className="sign-ind-user-link w-50 p-2 d-flex align-items-center justify-content-center">
            <div className="username-section d-flex flex-row align-items-center justify-content-end">
              <div className="user-img pe-2">
                <Link
                  className="text-decoration-none"
                  to={`/user-profile/${user?._id}`}
                >
                 <div className="profile-img-style">{user?.email?.slice(0,1)}</div>
                </Link>
              </div>
              <div className="username-link d-flex flex-column pe-2">
                <span className="text-white">Login as</span>
                <p className="fw-bold">
                  <a className="text-decoration-none text-primary" href="/">
                    <Link
                      className="text-decoration-none"
                      to={`/user-profile/${user?._id}`}
                    >
                      {user?.username}
                    </Link>
                  </a>
                </p>
              </div>
              <span className="d-flex align-items-center">
                <FontAwesomeIcon
                  className="fa-sm"
                  icon={faArrowAltCircleDown}
                />
              </span>
            </div>
            <div onClick={() => setShow(!show)} className="ms-4 header-icons">
              <FontAwesomeIcon icon={faBell} />
            </div>

            <div onClick={handleSignOut} className="ms-4 header-icons">
              <span className="me-2">Logout</span>
              <FontAwesomeIcon icon={faSignOut} />
            </div>
          </div>
        </Navbar>
      </div>
      {show && (
        <div className="notification-div">
         {
          notification.length === 0 ?
          <p>No notification available!</p>
          :
       <>    {notification?.map((n) => (
        <p>{n?.message}</p>
      ))}</>
         }
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
