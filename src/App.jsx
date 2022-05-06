import { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import ManageContact from './components/ManageContact'

const sortContacts = (contactList) => {
  contactList.sort((a, b) => a.name > b.name ? 1 : -1)
  return contactList
}
function App() {
  const [contacts, setContacts] = useState([])
  const [edit, setEdit] = useState(false)
  const [editContact, setEditContact] = useState(null)
  const [filteredContacts, setFilteredContacts] = useState([])
  const [search, setSearch] = useState([])
  const [open, setOpen] = useState(false)

  const addContact = (contact) => {
    let newContactList = [...contacts, contact]
    newContactList = sortContacts(newContactList)
    setContacts(newContactList)
  }
  const editContactState = (contact) => {
    setEdit(true)
    setOpen(true)
    setEditContact(contact)
  }
  const updateContact = (contact) => {
    const oldContacts = contacts.filter(c => c.id !== contact.id)
    let newContactList = [...oldContacts, contact]
    newContactList = sortContacts(newContactList)
    setContacts(newContactList)
    setEdit(false)
  }
  const removeContact = (id) => {
    const newContactList = contacts.filter(contact => contact.id !== id)
    setContacts(newContactList)
  }
  const searchContacts = (e) => {
    const search = e.target.value
    setSearch(search)
    if (search !== "") {
      const filteredContacts = contacts.filter(contact => {
        return Object.values(contact).slice(1).join(" ").toLowerCase().includes(search.toLowerCase())
      })
      setFilteredContacts(filteredContacts)
    }
  }
  const goBack = () => {
    setOpen(false)
    setEdit(false)
    setEditContact({})
  }
  useEffect(() => {
    const retrievedContacts = JSON.parse(localStorage.getItem("contacts"))
    if (retrievedContacts) {
      retrievedContacts.sort((a, b) => a.name > b.name ? 1 : -1)
      setContacts(retrievedContacts)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts])

  if (open) {
    return <ManageContact goBack={goBack} edit={edit} addContact={addContact} contact={editContact} updateContact={updateContact} />
  } else {
    return (
      <div className={`container vh-100 py-4 right d-block ${open ? 'd-none' : 'd-block'}`}>
        <h4 className="mb-4 text-center">Contact Book</h4>
        <button onClick={() => setOpen(true)} className="add-contact btn btn-primary rounded-pill mb-3 d-block ms-auto">
          <i className="fa-solid fa-plus fa-fw"></i> Add Contact
        </button>
        <div className='mb-3'>
          <label htmlFor="search" className="form-label ps-1">Search</label>
          <div className="position-relative">
            <input onChange={searchContacts} type="text" className="search border border-2 form-control shadow-none" id="search"
              placeholder="Search Contact" />
            <i className="fa-solid fa-magnifying-glass btn fw-bolder px-1 position-absolute top-50 translate-middle end-0"></i>
          </div>
        </div>
        <Contacts contacts={search.length < 1 ? contacts : filteredContacts} editContactState={editContactState} removeContact={removeContact} />
      </div>
    )
  }
}

export default App
