import { useEffect, useRef, useState } from 'react';
import cryptoRandomString from "crypto-random-string"


import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CgTrash } from 'react-icons/cg'


import { useFormik } from 'formik'
import './formStyle.css'

import contactSchema from '../schemas/contactSchema';

function ContactForm(props) {
    const uploadRef = useRef(null);
    const submitRef = useRef(null)

    const [imgState, setImgState] = useState();
    const [socials, setSocials] = useState([]);

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } = useFormik({
        initialValues: {
            fName: props.contactInfo ? props.contactInfo.fName : '',
            lName: props.contactInfo ? props.contactInfo.lName : '',
            email: props.contactInfo ? props.contactInfo.email : '',
            phoneNumber: props.contactInfo ? props.contactInfo.phoneNumber : '',
            socials: props.contactInfo ? props.contactInfo.socials : {},
        },
        onSubmit,
        validationSchema: contactSchema,
    })

    useEffect(() => {
        const contactInfo = props.contactInfo;

        if (contactInfo) {
            setSocials([])
            values.socials = {};
            Object.entries(contactInfo).map(([key, val]) => {
                if (key.includes('socials')) {
                    Object.entries(val).forEach(([socialKey, socialValue]) => {
                        if (socialKey.includes('link')) {
                            const objToPush = {
                                'platform': socialValue.platform,
                                'url': socialValue.url,
                                'id': socialKey.substring(4, 7)
                            }

                            setSocials(
                                (prev) => [...prev, objToPush]
                            )
                        }
                    })

                    values[key] = val;

                }

            })

        }
    }, [])


    function onSubmit(values, actions) {
        const objToAppend = { socials: {} };

        Object.entries(values).forEach(([key, val]) => {
            if (!key.includes('link')) {
                objToAppend[key] = val;
            } else {
                objToAppend.socials[key] = val;
            }
        })

        props.setSuperFormAt({ ...objToAppend, imgState }, 0)
        props.incrementProgress();
    }

    function handleUpload(file) {
        setImgState(file);
        // <img src={URL.createObjectURL(FILE_OBJECT)} /> 
    }
    function renderSocials() {
        const arrToGet = [];

        socials.forEach((social) => {
            if (!values.socials[`link${social.id}`]) {
                values.socials[`link${social.id}`] = {}
            }
            // const platVal = values.socials[`link${social.id}`] ? values.socials[`link${social.id}`].platform : '';
            // const urlVal = values.socials[`link${social.id}`] ? values.socials[`link${social.id}`].url : '';
            arrToGet.push(
                <div className='d-flex align-items-center mb-1' key={social.id}>
                    <div>
                        <Form.Control
                            name={`socials.link${social.id}.platform`}
                            value={values.socials[`link${social.id}`].platform}
                            onChange={handleChange}
                            placeholder='Platform' />

                    </div>
                    <span className='mx-1'>:</span>

                    <Form.Control
                        name={`socials.link${social.id}.url`}
                        value={values.socials[`link${social.id}`].url}
                        onChange={handleChange}
                        placeholder='https://example.com' />

                    <CgTrash
                        size={24}
                        className='discard cursorPoint'
                        onClick={() => handleRemovingSocial(social.id)} />
                </div>
            );
        })
        return arrToGet;
    }

    function handleAddingSocial() {
        const socialToAdd = { platform: '', url: '', id: cryptoRandomString({ length: 3 }) }
        setSocials((state) => [...state, socialToAdd])
    }

    function handleRemovingSocial(id) {
        const i = socials.findIndex((val) => val.id === id)
        const temp = socials;

        temp.splice(i, 1);

        console.log(temp)
        delete values.socials[`link${id}`]
        setSocials([...temp])
    }

    return (
        <Modal show={props.show} backdrop='static' centered size='md' >
            <Modal.Header >
                <Modal.Title>Contact Information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="addMovieTitle">
                        <div className='d-flex'>
                            <div className='w-25'>
                                <div className="w-75 mr-auto">
                                    <input
                                        accept="image/jpeg, image/png, image/jpg"
                                        ref={uploadRef}
                                        id='input-file'
                                        className="d-none"
                                        type="file"
                                        onChange={(e) => { handleUpload(e.currentTarget.files[0]) }} />
                                    <Button
                                        className='p-3'
                                        variant='outline-dark'
                                        onClick={() => { uploadRef.current.click() }}
                                    >Upload your Photo (optional)
                                    </Button>
                                </div>
                            </div>
                            <div
                                className="nameInfo d-flex flex-column justify-content-around w-75">

                                <Form.Control
                                    className={`ml-2 ${errors.fName && touched.fName ? 'error' : ''}`}
                                    placeholder='First Name'
                                    type="text"
                                    name="fName"
                                    onBlur={handleBlur}
                                    value={values.fName}
                                    onChange={handleChange} />
                                <Form.Control
                                    className={`ml-2 ${errors.lName && touched.lName ? 'error' : ''}`}
                                    placeholder='Last Name'
                                    type="text"
                                    name="lName"
                                    value={values.lName}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />

                            </div>
                        </div>

                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            name='email'
                            className={`${errors.email && touched.email ? 'error' : ''} mb-3`}
                            onBlur={handleBlur}
                            placeholder="Enter email"
                            value={values.email}
                            onChange={handleChange} />

                        <Form.Control
                            type="text"
                            placeholder="Enter Phone Number"
                            value={values.phoneNumber}
                            className={`mb-2 ${errors.phoneNumber && touched.phoneNumber ? 'error' : ''} mb-3`}
                            onBlur={handleBlur}
                            name='phoneNumber'
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Text
                        className='text-primary cursorPoint'
                        onClick={() => handleAddingSocial()}>
                        Social Media Links

                        <AiOutlinePlusCircle
                            className='mb-1 mx-1'
                            size={16} />
                    </Form.Text>

                    <button type='submit' ref={submitRef} className='d-none' />

                    <Form.Group>
                        {renderSocials()}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => { submitRef.current.click(); }}>
                    Continue
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ContactForm