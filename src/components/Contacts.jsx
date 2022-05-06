import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts, editContactState, removeContact }) => {
    return (
        <div className="contacts-container overflow-auto">
            {contacts.length > 0
                ?
                contacts.map((contact, index) => <Contact key={index} contact={contact} editContactState={editContactState} removeContact={removeContact} />)
                :
                <p className="message text-center">No Contacts</p>
            }
        </div>
    )
}

export default Contacts