import React from 'react'
import Model from './Model/Model'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { db } from '../config/firebase'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("*"),
    email: Yup.string().email("*Invalid Email").required("*"),
    number: Yup.string().length(10, "*must be exactly 11 digits").required("*"),
})

const AddAndUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {
    
    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts")
            await addDoc(contactRef, contact);
            onClose();
            toast.success("Contact Added Successfully")
        } catch (error) {
            console.log(error)
        }
    }
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id)
            await updateDoc(contactRef, contact);
            onClose();
            toast.success("Contact Updated Successfully")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <Model isOpen={isOpen} onClose={onClose}>
            <Formik
                validationSchema={contactSchemaValidation}
                initialValues={isUpdate ? {
                        name: contact.name,
                        email: contact.email,
                        number: contact.number,
                    } : {
                        name: "",
                        email: "",
                        number: "",
                    }
                  }
                onSubmit={(values) => {
                    isUpdate ? updateContact(values, contact.id) : 
                    addContact(values)
                }}
            >
                <Form>
                    <div>
                        <label htmlFor="name">Name
                            <div className='error'>
                                <ErrorMessage name="name"/>
                            </div>
                        </label>
                        <Field name="name" placeholder="Your Name" className="input"/>
                        
                    </div>
                    <div>
                        <label htmlFor="email">Email
                            <div className='error'>
                                <ErrorMessage name="email"/>
                            </div>
                        </label>
                        <Field type="email" placeholder="example@example.com" name="email" className="input"/>
                        
                    </div>
                    <div>
                        <label htmlFor="number">Number 
                            <div className='error'>
                                <ErrorMessage name="number"/>
                            </div>
                        </label>
                        <Field type="number" placeholder="03XXXXXXXXX" name="number" className="input"/>
                    </div>
                    <div className='submit-btn'>
                        <button type='submit'>{isUpdate ? "Update" : "Add"} Contact</button>
                    </div>
                    
                </Form>
            </Formik>
        </Model>
    </div>
  )
}

export default AddAndUpdateContact