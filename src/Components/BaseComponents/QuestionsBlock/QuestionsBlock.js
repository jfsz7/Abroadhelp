import React, { useContext, useEffect, useState } from "react";
import "./QuestionsBlock.css";
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
import profile1 from "./../../../images/qsPage/Ava.png";
import profile2 from "./../../../images/qsPage/aizan.png";
import profile3 from "./../../../images/qsPage/linuxoid.png";
import profile4 from "./../../../images/qsPage/lola.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  Dropdown,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import BlogPostForm from "../Blog/BlogPostForm/BlogPostForm";
import { Link } from "react-router-dom";
import AskQsModal from "../AskQsModal/AskQsModal";
import CategoryTag from "./../CategoryTag/CategoryTag";
import axios from "axios";
import { baseUrl } from "../../../services/api";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import { UserContext } from "../../../App";
import Loader from "../../Shared/Loader";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const QuestionsBlock = ({ searchResult, search, refetch, setRefetch }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [cat, setCat] = useState("all");
  const { user, setUser } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };
  const handleComment = async (id) => {
    setSelected(id);
    await axios
      .get(`${baseUrl}/comments/getCommentByPostId/${id}`)
      .then((res) => {
        if (res.data.status) {
            const newPost = [];
            for (const i of res.data.result) {
              const content = draftToHtml(JSON.parse(i?.commentBody));
              newPost.push({ ...i, content: content });
            }
            // console.log(newPost)
            setComments(newPost);

          }
      });
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    axios.post(`${baseUrl}/posts/getAllPost`, { filter: cat }).then((res) => {
      if (res.data.status) {
        const newPost = [];
        for (const i of res.data.result) {
          const content = draftToHtml(JSON.parse(i.desc));
          console.log(content);
          newPost.push({ ...i, content: content });
        }
        // console.log(newPost)
        setLoading(false);

        setPosts(newPost);
      }
    });
  }, [refetch, cat]);

  const handleDelete = async (id) => {
    await axios.delete(`${baseUrl}/posts/${id}`).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        setRefetch(refetch + 1);
      } else {
        toast.error(res.data.message);
      }
    });
  };
  const handleReputation = async (id) => {
    await axios
      .patch(`${baseUrl}/user/updateUserInfoById/${id}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          setRefetch(refetch + 1);
        } else {
          toast.error(res.data.message);
        }
      });
  };
  const handleLikes = async ({ id, task }) => {
    if (task === "addComments") {
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      await axios
        .patch(`${baseUrl}/posts/${id}`, {
          task: task,
          userId: user?._id,
          commentBody: content,
          commentedBy: user?._id,
          postId: id,
        })
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message);
            setRefetch(refetch + 1);
            handleComment(id);
            setComment("");
            setEditorState('')
          } else {
            toast.error(res.data.message);
          }
        });
    } else {
      await axios
        .patch(`${baseUrl}/posts/${id}`, { task: task, userId: user?._id })
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message);
            setRefetch(refetch + 1);
          } else {
            toast.error(res.data.message);
          }
        });
    }
  };
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="middle-question-block">
      <div>
        <div onClick={() => setModalShow(true)} class="input-group my-2">
          <input
            type="text"
            className="qs-input form-control border-2 border-dark"
            placeholder="type your question"
            aria-label="type your question"
          />
        </div>
        <CategoryTag setCat={setCat} cat={cat}></CategoryTag>
      </div>
      <AskQsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        refetch={refetch}
        setRefetch={setRefetch}
      />

      {!search ? (
        <>
          {posts.map((post) => (
            <div className="question-block shadow-sm mb-3">
              <div className="d-flex justify-content-between">
                <div className="qs-user d-flex flex-row">
                  <img src={profile1} alt="user image" height={35} width={35} />
                  <div className="user-details d-flex flex-column ps-2">
                   {
                    post?.postBy?._id ?
                    <>
                     <span>
                      <Link
                        className="text-decoration-none"
                        to={`/user-profile/${post?.postBy?._id}`}
                      >
                        {post?.postBy?.username}
                      </Link>
                    </span>
                    </>
                    :
                    <>
                     <span>
                      <Link
                        className="text-decoration-none"
                        to={`/user-profile/${post?.populatedField?._id}`}
                      >
                        {post?.populatedField?.username}
                      </Link>
                    </span></>
                   }
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
                    <div className="w-100 mt-2 mb-2">
                      <img
                        src={post.postImg}
                        className="image-style mx-auto"
                        alt="hello"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="tag-section d-flex flex-row pt-2">
                <div className="qs-tag">
                  <button
                    onClick={() =>
                      handleLikes({ id: post?._id, task: "addLike" })
                    }
                    className="btn p-0"
                  >
                    <FontAwesomeIcon className="p-0" icon={faArrowCircleUp} />
                  </button>
                  <span className="px-2">{post.likes}</span>
                  <button
                    onClick={() =>
                      handleLikes({ id: post?._id, task: "removeLike" })
                    }
                    className="btn p-0"
                  >
                    <FontAwesomeIcon icon={faArrowAltCircleDown} />
                  </button>
                </div>
                <div className="viewer-action d-flex align-items-center ps-2">
                  <span className="pe-3">
                    <FontAwesomeIcon className="pe-1" icon={faMessage} />
                    {post.comments}
                  </span>
                  <button
                    onClick={() => {
                      setSelected(post?._id);

                      handleComment(post._id);
                    }}
                    className="ans-btn me-2 py-1 btn btn-dark"
                  >
                    Answer
                  </button>
                </div>
              </div>

              {post?._id === selected && (
                <div>
                  <div className="mb-3">
                    {comments?.length > 0 &&
                      comments?.map((c) => (
                        <div className="comment-div mb-3">
                          <div className="d-flex justify-content-start align-items-start">
                            <div className="me-3">
                              <img
                                src={profile1}
                                style={{
                                  height: "35px",
                                  width: "35px",
                                  borderRadius: "50%",
                                }}
                                alt="img"
                              />
                            </div>
                            <div>
                              <p>
                                <strong>{c.commentedBy?.username}</strong>
                              </p>
                              <div dangerouslySetInnerHTML={{ __html: c?.content }} />

                              <button
                                className="ans-btn  btn btn-dark"
                                onClick={() =>
                                  handleReputation(c.commentedBy?._id)
                                }
                              >
                                Upvote
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="card card-body">
                    <div className="txt-area mt-3">
                      {/* <textarea name='desc' style={{ minHeight: '200px' }} placeholder='Type your question' id="details-Qs" className='area-h w-100 p-2 required'></textarea> */}
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        toolbar={{
                          options: ["inline", "list"],
                          inline: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: [
                              "bold",
                              "italic",
                              "underline",
                              "strikethrough",
                              "monospace",
                            ],
                          },
                          list: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ["unordered", "ordered"],
                          },
                        }}
                      />
                    </div>
                    <div className="answer-action-btn d-flex flex-row justify-content-end mt-2">
                      <button
                        onClick={() => setSelected("")}
                        type="submit"
                        className="btn btn-secondary w-25 me-2"
                      >
                        Close
                      </button>
                      <button
                        onClick={() =>
                          handleLikes({ id: post?._id, task: "addComments" })
                        }
                        type="submit"
                        className="btn btn-secondary w-25"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          {searchResult?.map((post) => (
            <div className="question-block shadow-sm mb-3">
              <div className="d-flex justify-content-between">
                <div className="qs-user d-flex flex-row">
                  <img src={profile1} alt="user image" height={35} width={35} />
                  <div className="user-details d-flex flex-column ps-2">
                    <span>
                      <Link
                        className="text-decoration-none"
                        to={`/user-profile/${post?.postBy?._id}`}
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
                    <div className="w-100 mt-2 mb-2">
                      <img
                        src={post.postImg}
                        className="image-style mx-auto"
                        alt="hello"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="tag-section d-flex flex-row pt-2">
                <div className="qs-tag">
                  <button
                    onClick={() =>
                      handleLikes({ id: post?._id, task: "addLike" })
                    }
                    className="btn p-0"
                  >
                    <FontAwesomeIcon className="p-0" icon={faArrowCircleUp} />
                  </button>
                  <span className="px-2">{post.likes}</span>
                  <button
                    onClick={() =>
                      handleLikes({ id: post?._id, task: "removeLike" })
                    }
                    className="btn p-0"
                  >
                    <FontAwesomeIcon icon={faArrowAltCircleDown} />
                  </button>
                </div>
                <div className="viewer-action d-flex align-items-center ps-2">
                  <span className="pe-3">
                    <FontAwesomeIcon className="pe-1" icon={faMessage} />
                    {post.comments}
                  </span>
                  <button
                    onClick={() => {
                      setSelected(post?._id);

                      handleComment(post._id);
                    }}
                    className="ans-btn me-2 py-1 btn btn-dark"
                  >
                    Answer
                  </button>
                </div>
              </div>

              {post?._id === selected && (
                <div>
                  <div className="mb-3">
                    {comments?.length > 0 &&
                      comments?.map((c) => (
                        <div className="comment-div mb-3">
                          <div className="d-flex justify-content-start align-items-start">
                            <div className="me-3">
                              <img
                                height={35}
                                width={35}
                                src={profile1}
                                style={{
                                  height: "35px",
                                  width: "35px",
                                  borderRadius: "50%",
                                }}
                                alt="img"
                              />
                            </div>
                            <div>
                              <p>
                                <strong>{c.commentedBy?.username}</strong>
                              </p>
                              <div dangerouslySetInnerHTML={{ __html: c?.content }} />

                              <button
                                className="ans-btn  btn btn-dark"
                                onClick={() =>
                                  handleReputation(c.commentedBy?._id)
                                }
                              >
                                Upvote
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="card card-body">
                    <div className="txt-area mt-3">
                      {/* <textarea name='desc' style={{ minHeight: '200px' }} placeholder='Type your question' id="details-Qs" className='area-h w-100 p-2 required'></textarea> */}
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        toolbar={{
                          options: ["inline", "list"],
                          inline: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: [
                              "bold",
                              "italic",
                              "underline",
                              "strikethrough",
                              "monospace",
                            ],
                          },
                          list: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ["unordered", "ordered"],
                          },
                        }}
                      />
                    </div>
                    <div className="answer-action-btn d-flex flex-row justify-content-end mt-2">
                      <button
                        onClick={() => setSelected("")}
                        type="submit"
                        className="btn btn-secondary w-25 me-2"
                      >
                        Close
                      </button>
                      <button
                        onClick={() =>
                          handleLikes({ id: post?._id, task: "addComments" })
                        }
                        type="submit"
                        className="btn btn-secondary w-25"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default QuestionsBlock;
