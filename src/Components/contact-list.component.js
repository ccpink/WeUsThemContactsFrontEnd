import React, { useState, useRef , useEffect } from "react";
import axios from "axios";
import {Button, Table} from "react-bootstrap";
import ContactTableRow from "./ContactTableRow";
import {Link, useParams} from "react-router-dom";

const ContactList = () => {
    const searchRef = useRef(null);

    const [updated, setUpdated] = useState('');

    const { search, fOrL, asc } = useParams();

    const QUERY = search.toString();
    const ASC = asc.toString();

    const [contacts, setContacts] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:3000/contact/")
            .then(({ data }) => {
                setContacts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {

        if(fOrL === "last"){
            if(asc === "desc"){
            contacts.sort((a, b) => a.lName < b.lName ? 1 : -1);
            }
            else if(asc === "asc"){
                contacts.sort((a, b) => a.lName > b.lName ? 1 : -1);
            }
        }
        else if(fOrL === "first"){
            if(asc === "desc"){
                contacts.sort((a, b) => a.fName < b.fName ? 1 : - 1 );
            }
            else if(asc === "asc"){
                contacts.sort((a, b) => a.fName > b.fName ? 1 : - 1 );
            }
        }


        // let values;
        // if(setSearching.inputText !== "1234"){
        //     this.values.push( contacts.filter(function (i,n){
        //         return i.fName ==='Charles';
        //     }));
        //     console.log(values);
        //
        // }


        return contacts.map((res, i) => {
            return <ContactTableRow obj={res} key={i} />;
        });
    };


    function handleClick() {
        //Change the values to match the bar
        setUpdated(searchRef.current.value);
        if(searchRef.current.value === ""){
        window.location.href = "http://localhost:4000/contact-list/1234/first/desc";
        } else {
            window.location.href = ("http://localhost:4000/contact-list/" + searchRef.current.value + "/"+ fOrL + "/" + ASC  );
        }

    }

    function onFClick() {
        if(fOrL === "last"){
            window.location.href = "http://localhost:4000/contact-list/" + search + "/first/asc";
        } else if (asc === "asc") {
            window.location.href = ("http://localhost:4000/contact-list/" + search + "/first/desc");
        } else {
            window.location.href = "http://localhost:4000/contact-list/" + search + "/first/asc"
        }
    }

    function onLClick() {
        if(fOrL === "first"){
            window.location.href = "http://localhost:4000/contact-list/" + search + "/last/asc";
        } else if (asc === "asc") {
            window.location.href = ("http://localhost:4000/contact-list/" + search + "/last/desc");
        } else {
            window.location.href = "http://localhost:4000/contact-list/" + search + "/last/asc"
        }
    }

    return (

        <div className="table-wrapper">
            <div>
                <label>
                    Search
                </label>
                &nbsp;&nbsp;&nbsp;
                <input ref={searchRef} type="text" id="search" name="search" />
                &nbsp;&nbsp;&nbsp;
                <Button onClick={handleClick}>Search</Button>
            </div>
            <br/>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Image</th>
                    <th><Button onClick={onFClick}>First Name</Button></th>
                    <th><Button onClick={onLClick}>Last Name</Button></th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>ID</th>
                </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default ContactList;