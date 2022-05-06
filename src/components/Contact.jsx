import React from 'react'
import avatar from "../images/avatar.jpg"
const capitalize = (word) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
}
const Contact = ({ editContactState, contact, removeContact }) => {
    const { id, name, number } = contact
    return (
        <div className="contact position-relative mb-4 d-flex align-items-center px-4 py-3 border shadow-sm">
            <img src={avatar} className="border border-2 p-1 object-cover rounded-pill" />
            <div className='contact-detail flex-grow-1'>
                <p className="fs-5 mb-2">{capitalize(name)}</p>
                <p className="mb-0 fs-6">
                    <i className="fa-solid fa-phone text-success me-2"></i>
                    <span>{number}</span>
                </p>
            </div>
            <i onClick={() => editContactState(contact)} className="fa-solid fa-pen-to-square text-primary btn"></i>
            <i onClick={() => removeContact(id)} className="fa-solid fa-trash-can text-danger btn"></i>
        </div>
    )
}

export default Contact