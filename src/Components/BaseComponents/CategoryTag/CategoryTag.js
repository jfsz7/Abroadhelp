import { faArrowUpRightFromSquare, faCircleCheck, faClock, faFire } from '@fortawesome/free-solid-svg-icons';
import './CategoryTag.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Nav } from 'react-bootstrap';

const CategoryTag = ({setCat, cat}) => {
    const handleCat = (current) =>{
        if(cat === current){
            setCat('all')
        }else{
            setCat(current)
        }
    }
    console.log(cat)
    return (
        <Nav className='align-items-center py-2 ps-0' variant="pills" defaultActiveKey="new">
            <button className={cat === "new" ? 'top-btn-active' : 'top-btn'} onClick={()=> handleCat('new')}>
            <FontAwesomeIcon icon={faClock} /> New
            </button>
            <button className={cat === "top" ? 'top-btn-active' : 'top-btn'}  onClick={()=> handleCat('top')}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Top
            </button>
            <button className={cat === "hot" ? 'top-btn-active' : 'top-btn'}  onClick={()=> handleCat('hot')}>
            <FontAwesomeIcon icon={faFire} /> Hot
            </button>
        </Nav>
    );
};

export default CategoryTag;