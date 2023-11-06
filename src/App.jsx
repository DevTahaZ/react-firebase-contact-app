import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase'
import AddAndUpdateContact from './components/AddAndUpdateContact'
import ContactCard from './components/ContactCard'
import useDisclose from './components/hooks/useDisclose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact'

function App() {
  const [contacts, setContacts] = useState([])
  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts")
        onSnapshot(contactsRef,(snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          setContacts(contactLists)
          return contactLists
        })
      } catch (error) {
        console.log("Error in getContacts")
      }
    }
    getContacts()
  }, [])

  const filterContacts = (e) => {
    const value = e.target.value

    const contactsRef = collection(db, "contacts")
        onSnapshot(contactsRef,(snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })

          const filteredContacts = contactLists.filter((contact) => 
            contact.name.toLowerCase().includes(value.toLowerCase())
          )

          setContacts(filteredContacts)
          return filteredContacts
        })
  }

  
  return (
    <>
      <Navbar onOpen={onOpen} filterContacts={filterContacts}/>
      <div className='contacts-container'>
        {contacts.length <= 0
           ? <NotFoundContact />
           : contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact}/>
        ))}
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
      <ToastContainer position='bottom-center'/>
    </>
  )
}

export default App
