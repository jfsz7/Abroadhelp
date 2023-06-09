import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { baseUrl } from '../../../services/api';
import { toast } from 'react-toastify';
import { UserContext } from '../../../App';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import FileResizer, { imageFileResizer } from "react-image-file-resizer";

const WriteBlogModal = (props) => {
    const {refetch, setRefetch, onHide} = props;
     const [img, setImg] = useState("");
  const [imgName, setImgName] = useState('')
  const { user, setUser } = useContext(UserContext);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
    setImgName(file.name)
    FileResizer.imageFileResizer(
      file,
      600, // Max width
      400, // Max height
      "JPEG", // Output format
      70, // Quality
      0, // Rotation
      (base64Image) => {
        // Handle the optimized image (base64)
        setImg(base64Image);
      },
      "base64" // Output type
    );
      };
    const handlePost = async(e) =>{
        e.preventDefault();
        const title = e.target.title.value;
        const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
        const data = {
            postImg: img,
            title,desc: content,
            postBy: user?._id
        }

       await axios.post(`${baseUrl}/blogs`, data).then(res => {
            if(res.data.status){
                toast.success(res.data.message)
                setRefetch(refetch+1)
                onHide()
                setEditorState('')
            }else{
                toast.error(res.data.message)

            }
        })
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
            <form onSubmit={handlePost}>
                <div className="form-floating p-3">
                    <input type="text" name='title' id="catchingTitle" placeholder='Type catching attention title' className='w-100 p-2 mt-2' required/>
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
              <div className="action-btn edit-sec d-flex justify-content-between mt-3">
              <div className="img-add">
                <input
                  onChange={handleImageUpload}
                  name="image"
                  style={{ display: "none" }}
                  id="imgUpload"
                  type="file"
                  accept="image/*"
                  className="btn btn-primary"
                />
                <label
                  className="p-1 border rounded"
                  style={{ cursor: "pointer" }}
                  for="imgUpload"
                >
                  <FontAwesomeIcon icon={faImage} /> Add Image
                </label>
                {
                    imgName && <p>{imgName}</p>
                }
              </div>
              <div className="prosit-btns">
                <button type="submit" className="btn border">
                  <FontAwesomeIcon icon={faPaperPlane} /> Publish
                </button>
              </div>
            </div>
                </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default WriteBlogModal;