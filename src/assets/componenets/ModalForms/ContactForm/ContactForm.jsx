import { useEffect, useRef, useState } from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'

import { AiOutlinePlusCircle } from 'react-icons/ai'

import { useFormik } from 'formik'

function ContactForm(props) {
    const uploadRef = useRef(null);
    const submitRef = useRef(null)
    const [imgState, setImgState] = useState();
    const [socials, setSocials] = useState([]);
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            fName: '',
            lName: '',
            email: '',
            phoneNumber: '',
        },
        onSubmit,
    })

    function onSubmit(values, actions) {
        console.log({ ...values, imgState })
    }

    function handleUpload(file) {
        setImgState(file);
        // <img src={URL.createObjectURL(FILE_OBJECT)} /> 
    }

    function renderSocials() {
        const arrToGet = [];

        socials.forEach((social, index) => {
            arrToGet.push(
                <div className='d-flex align-items-center mb-1' key={index}>
                    <div className='d-flex w-25'>
                        <Form.Control
                            name={`link${index}.platform`}
                            value={values[`link${index}.platform`]}
                            onChange={handleChange}
                            placeholder='Platform' />

                    </div>
                    <span className='mx-1'>:</span>

                    <Form.Control
                        value={social.platform}
                        onChange={(e) => { handleSocialInput(e.target.value, social.id, true) }}
                        placeholder='https://example.com' />
                </div>
            );
        })
        return arrToGet;
    }

    function handleAddingSocial() {
        const socialToAdd = { platform: '', url: '', id: socials.length }
        setSocials((state) => [...state, socialToAdd])
    }

    function handleSocialInput(e, id, platform = false) {
        const temp = socials;
        const index = (temp.findIndex((val) => val.id === id))
        console.log(e)
        // !platform ? temp[index].platform = key : temp[index].url += key;
        // console.log(temp[index])
    }

    return (
        <Modal show={props.surveyBegan} backdrop='static' centered size='md' >
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
                                    className='ml-2'
                                    placeholder='First Name'
                                    type="text"
                                    name="fName"
                                    value={values.fName}
                                    onChange={handleChange} />
                                <Form.Control
                                    className='ml-2'
                                    placeholder='Last Name'
                                    type="text"
                                    name="lName"
                                    value={values.lName}
                                    onChange={handleChange} />
                            </div>
                        </div>

                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            name='email'
                            className='mb-3'
                            placeholder="Enter email"
                            value={values.email}
                            onChange={handleChange} />

                        <Form.Control
                            type="text"
                            className='mb-2'
                            placeholder="Enter Phone Number"
                            value={values.phoneNumber}
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
                <Button variant="primary" onClick={() => submitRef.current.click()}>
                    Continue
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ContactForm