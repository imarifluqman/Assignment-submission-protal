import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/assignment.css'

function StudentAssignmentModal({ id,isOpen, onClose, assignment }) {
  const navigate = useNavigate()
  if (!isOpen) return null;
  const timeStamp= assignment?.createdAt
  const date =new Date(timeStamp)
  const formattedDate = date.toLocaleDateString()
  return (
    <div className='modal show' style={{ display: 'block' }} tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{assignment?.title}</h5>
            <button type='button' className='btn-close' aria-label='Close' onClick={onClose}></button>
          </div>
          <div className='modal-body'>
          <h6>Assignment Description :</h6>
          <p>{assignment?.description}</p>
          
        <br />
        <h6>Issue Date:</h6>
        <p>{formattedDate}</p>

        <br />
        <h6>Due Date :</h6>
        <p>{assignment?.dueDate}</p>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={onClose}>
              Close
            </button>
            <button type='button' className='btn btn-primary'
            onClick={()=>{
              navigate(`/${id}/assignments/${assignment?._id}`)
            }}
            >
              Submit  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAssignmentModal;