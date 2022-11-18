
// Import Modules
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContactForm from "./ContactForm";

// EditContact Component
const EditContact = (props) => {
    const { id } = useParams();
    const [formValues, setFormValues] = useState({_id: id, fName: '',lName: '', file: null , email: '', phoneNumber: '' })

    //console.log("http://localhost:3000/contact/" + id)

    //onSubmit handler
    const onSubmit = (contactObject) => {
        //console.log("form values: ")
        //console.log(formValues);
    };


    // Load data from server and reinitialize contact form
    useEffect(() => {

        axios
            .get(
                "http://localhost:3000/contact/"
                + id
            )
            .then((res) => {
                const {_id, fName,lName, file , email, phoneNumber } = res.data;
                setFormValues({_id, fName,lName, file , email, phoneNumber });
            })
            .catch((err) => console.log(err));
    }, [id]);

    // Return contact form
    return (
        <ContactForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update Contact
        </ContactForm>
    );
};

// Export EditContact Component
export default EditContact;