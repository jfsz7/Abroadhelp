import React from 'react';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BlogPostForm.css';
const BlogPostForm = () => {
    return (
        <div className="form-floating p-3">
            <input type="text" id="catchingTitle" placeholder='Type catching attention title' className='w-100 p-2 mt-2' />

            <div className="txt-area mt-3">
                <textarea style={{ minHeight: '250px' }} placeholder='Type your question' id="details-Qs" className='area-h w-100 p-2'></textarea>
                <div className="action-btn edit-sec d-flex justify-content-between">
                    <div className="img-add">
                        <input style={{ display: 'none' }} id='imgUploads' type='file' accept='image/*' className='btn btn-primary' /><label className='p-1 border border-primary rounded' style={{ cursor: 'pointer' }} for='imgUploads'><FontAwesomeIcon icon={faImage} /> Add Image</label>
                    </div>
                    <div className="prosit-btns">
                        <button className='btn'><FontAwesomeIcon icon={faPaperPlane} /> Publish</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostForm;