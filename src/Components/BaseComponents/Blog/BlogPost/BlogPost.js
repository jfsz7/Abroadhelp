import React, { useContext, useEffect, useState } from "react";
import "./BlogPost.css";
import {
  faEllipsisVertical,
  faEye,
  faMessage,
  faArrowUp,
  faArrowDown,
  faArrowCircleUp,
  faArrowAltCircleDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import profile1 from "../../../../images/qsPage/Ava.png";
import profile2 from "../../../../images/qsPage/aizan.png";
import profile3 from "../../../../images/qsPage/linuxoid.png";
import profile4 from "../../../../images/qsPage/lola.png";
import banner from "../../../../images/computer.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  Dropdown,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import BlogPostForm from "./../BlogPostForm/BlogPostForm";
import WriteBlogModal from "../../WriteBlogModal/WriteBlogModal";
import axios from "axios";
import { baseUrl } from "../../../../services/api";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../App";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import Loader from "../../../Shared/Loader";
const BlogPost = () => {
  function removeClassOnClick(id) {
    const docElem = document.getElementById(id);
    docElem.classList.remove("show");
  }
  const [modalShow, setModalShow] = React.useState(false);
  const [blogs, setBlogs] = useState([]);
  const [refetch, setRefetch] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseUrl}/blogs`).then((res) => {
      if (res.data.status) {
        const newPost = [];
        for (const i of res.data.result) {
          const content = draftToHtml(JSON.parse(i.desc));
          console.log(content);
          newPost.push({ ...i, content: content });
        }
        // console.log(newPost)
        setLoading(false);

        setBlogs(newPost);
      }
    });
  }, [refetch]);
  const handleDelete = async (id) => {
    await axios.delete(`${baseUrl}/blogs/${id}`).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        setRefetch(refetch + 1);
      } else {
        toast.error(res.data.message);
      }
    });
  };
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="middle-question-block">
      <div className="write-blog-btn sticky-top mb-1">
        <button
          onClick={() => setModalShow(true)}
          className="w-100 btn btn-secondary blog-write-btn-fs fw-blod fs-5 d-flex rounded-1 flex-row align-items-center justify-content-center"
          type="button"
        >
          {" "}
          <i class="fa-solid fa-pen-nib pe-2 pt-2 fa-fade"></i> Write a blog
        </button>
      </div>
      <WriteBlogModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        refetch={refetch}
        setRefetch={setRefetch}
      ></WriteBlogModal>
      {blogs.map((post) => (
        <div className="question-block shadow-sm mb-3">
          <div className="d-flex justify-content-between">
            <div className="qs-user d-flex flex-row">
              <img src={profile1} alt="user image" height={35} width={35} />
              <div className="user-details d-flex flex-column ps-2">
                <span>
                  <Link
                    className="text-decoration-none"
                    to={`/user-profile/${user?.postBy?._id}`}
                  >
                    {post?.postBy?.username}
                  </Link>
                </span>
                <span>
                  {formatDistanceToNow(new Date(post?.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
            <div className="position-relative">
              <Dropdown>
                <Dropdown.Toggle className="p-0 bg-trs">
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="cursor3dot"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-1">
                  <Button
                    onClick={() => handleDelete(post._id)}
                    className="w-100"
                  >
                    Delete
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="qs-details d-flex flex-col align-items-center w-75">
            <div className="qs-text">
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post?.content }} />
              {post?.postImg && (
                <div className="mt-2 mb-2">
                  <img
                    src={post.postImg}
                    className="w-50 mx-auto"
                    alt="hello"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPost;
