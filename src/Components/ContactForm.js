import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, setFieldValue } from "formik";
import Dropzone from "react-dropzone";
import Thumb from "./Thumb";
import axios from "axios";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/




const ContactForm = (props) => {

    console.log();

    const dropzoneStyle = {
        width: "100%",
        height: "auto",
        borderWidth: 2,
        borderColor: "rgb(102, 102, 102)",
        borderStyle: "dashed",
        borderRadius: 5,
    }

    return (
        <div className="container">
            <Formik
                initialValues={{
                    fName: "",
                    lName: "",
                    phoneNumber: "",
                    email: "",
                    image: null,
                }}
                onSubmit={async (values) => {

                    //Create the form that will be uploaded to the API
                    let formData = new FormData();

                    formData.append("fName", values.fName);
                    formData.append("lName", values.lName);
                    formData.append("email", values.email);
                    formData.append("phoneNumber", values.phoneNumber);
                    formData.append("image", values.image);

                    alert("Form submitted!");
                    console.log(formData.get("fName"));
                    console.log(formData.get("lName"));
                    console.log(formData.get("phoneNumber"));
                    console.log(formData.get("email"));
                    console.log(formData.get("image"));

                    //If the initial email value is empty
                    // then we do a post request if not we do an update
                    if(props.initialValues.email !== ''){
                        console.log(props.initialValues)
                        console.log();
                        const res = await axios.put(('http://localhost:3000/contact/' + props.initialValues._id), formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                    } else {
                        const res = await axios.post('http://localhost:3000/contact/', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                    }

                }}
                validationSchema={Yup.object().shape({
                    lName: Yup.string().required("Required"),
                    fName: Yup.string().required("Required"),
                    email: Yup.string()
                        .email("You have enter an invalid email address")
                        .required("Required"),
                    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),

                })}
                render={({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input id="fName" name="fName" type="text" className="form-control"
                                   value={values.fName} onChange={handleChange} />
                            {errors.fName && touched.fName && (
                                <p>{errors.fName}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input id="lName" name="lName" type="text" className="form-control"
                                   value={values.lName} onChange={handleChange} />
                            {errors.lName && touched.lName && (
                                <p>{errors.lName}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>E-mail</label>
                            <input id="email" name="email" type="email" className="form-control"
                                   value={values.email} onChange={handleChange} />
                            {errors.email && touched.email && (
                                <p>{errors.email}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Phone number</label>
                            <input id="phoneNumber" name="phoneNumber" type="phoneNumber" className="form-control"
                                   value={values.phoneNumber} onChange={handleChange} />
                            {errors.phoneNumber && touched.phoneNumber && (
                                <p>{errors.phoneNumber}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Image</label>
                            <input id="image" name="image" type="file" className="form-control"
                                   onChange={(event) => {
                                       setFieldValue("image", event.currentTarget.files[0]);
                                   }} />
                        </div>

                        <button type="submit" className="btn btn-primary">submit</button>
                    </form>
                )} />
        </div>
    );
};

export default ContactForm;