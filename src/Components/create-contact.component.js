// CreateContact Component for adding new contacts

// Import Modules
import React, { useState } from "react";
import axios from 'axios';
import ContactForm from "./ContactForm";

// CreateContact Component
const CreateContact = () => {
    const [formValues] =
        useState({ fName: '',lName: '', file: null , email: '', phoneNumber: '' })

    // onSubmit handler
    const onSubmit = contactObject => {
        console.log("form values: ")
        console.log(formValues);
        axios.post(
            'http://localhost:3000/contact/',
            contactObject)
            .then(res => {
                if (res.status === 200)
                    alert('Contact successfully created')
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
    }

    // Return contact form
    return(
        <ContactForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Create Contact
        </ContactForm>
    )
}

// Export create Contact Component
export default CreateContact