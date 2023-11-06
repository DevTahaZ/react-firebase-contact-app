import React from 'react'
import AddAndUpdateContact from './AddAndUpdateContact'
import useDisclose from './hooks/useDisclose'
import { db } from '../config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const ContactCard = ({ contact }) => {
    
    const { isOpen, onClose, onOpen } = useDisclose();

    const deleteContact = async (id) => {
        try {
          await deleteDoc(doc(db, "contacts", id));
          toast.success("Contact Deleted Successfully")
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <>
        <div key={contact.id} className='contact'>
            <div className='start'>
              <div className='people-img'>
                <img src="people.svg" alt="" />
              </div>
              <div className='contact-details'>
                <h2>{contact.name}</h2>
                <p>{contact.email}</p>
                <p>+{contact.number}</p>
              </div>
            </div>
            <div className='end'>
              <img onClick={onOpen} src="circle.svg" alt="" />
              <img onClick={() => deleteContact(contact.id)} src="trash.svg" alt="" />
            </div>
        </div>
        <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
    
  )
}

export default ContactCard