//TODO: Conversion to Contact Form

import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ContactTableRow = (props) => {
    const { _id, fName, lName, image ,email, phoneNumber } = props.obj;

    const deleteContact = () => {
        axios
            .delete(
                "http://localhost:3000/contact/" + _id)
            .then((res) => {
                if (res.status === 200) {
                    alert("Contact successfully deleted");
                    window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    return (
        <tr>
            <td > <img crossOrigin="anonymous" src={"http://localhost:3000/" + image } alt="No Image Recorded"/> </td>
            <td>{fName}</td>
            <td>{lName}</td>
            <td>{phoneNumber}</td>
            <td>{email}</td>
            <td>{_id}</td>
            <td>
                <Link className="edit-link"
                      to={"/edit-contact/" + _id}>
                    Edit
                </Link>
            </td>
            <td>
                <Button onClick={deleteContact}
                        size="sm" variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default ContactTableRow;