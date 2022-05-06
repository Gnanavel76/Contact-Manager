import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const ManageContact = ({ edit, contact, addContact, updateContact, goBack }) => {
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [error, setError] = useState({ status: false, message: "" })
    const manageContact = () => {
        if (!name || !number) {
            setError({ status: true, message: "Please fill all the fields" })
        } else if (number.length < 7) {
            setError({ status: true, message: "Contact number should contain atleast 7 digit(s)" })
        } else {
            setError({ status: false, message: "" })
            if (edit) {
                updateContact({ ...contact, name, number })
            }
            else {
                addContact({ id: uuidv4(), name, number })
            }
            setName("")
            setNumber("")
            goBack()
        }
    }
    useEffect(() => {
        if (edit) {
            setName(contact.name)
            setNumber(contact.number)
        }
    }, [edit])
    return (
        <div className="manage-contact py-4 d-flex flex-column justify-content-center min-vh-100 container">
            <button onClick={goBack} className="btn mb-4 align-self-start shadow-none">
                <i className="fa-solid fa-arrow-left me-3"></i>
                Go Back
            </button>
            <h4 className="mb-5 text-center" id="form-title">{edit ? "Edit Contact" : "Add Contact"}</h4>
            {
                error.status && <div className="alert alert-danger text-center">
                    {error.message}
                </div>
            }
            <div className="mb-4">
                <label htmlFor="name" className="form-label ps-1 mb-3">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border border-2 form-control shadow-none" id="name"
                    placeholder="Name" />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="form-label ps-1 mb-3">Phone number</label>
                <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} className="border border-2 form-control shadow-none" id="phone"
                    placeholder="Phone number" />
            </div>
            <button onClick={manageContact} className="mt-4 w-50 btn btn-primary rounded-pill mx-auto shadow" id="operation">Save</button>
        </div >
    )
}

export default ManageContact