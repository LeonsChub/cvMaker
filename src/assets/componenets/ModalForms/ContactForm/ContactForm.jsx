import { useRef, useState } from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'

import { AiOutlinePlusCircle } from 'react-icons/ai'

import { useFormik } from 'formik'

function ContactForm(props) {
    const uploadRef = useRef(null);
    const [imgState, setImgState] = useState();
    // const [socials, setSocials] = useState([{ 'platform': '', 'url': '', 'id': 0 }]);
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            fName: '',
            lName: '',
            email: '',
            phoneNumber: '',
            link1: { 'platform': '', 'url': '', 'id': 0 },
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

    function getAllLinksVal() {
        const linksArr = [];
        Object.keys(values).map((key, index) => {
            if (key.includes('link')) {
                linksArr.push(values[key])
            }
        })
        return linksArr;
    }

    function handleAddingSocial() {
        const links = getAllLinksVal();
        let allFull = true;
        console.log(links)
        links.forEach((social) => {
            if (!social.platform || !social.url) {
                allFull = false;
                alert('must fill all links or remove them')
            }
        })

        if (allFull) {
            const lastLink = links[links.length - 1];
            console.log(lastLink)
        }
    }

    function renderSocialsInput() {
        const arrToReturn = [];
        Object.keys(values).map((key, index) => {
            if (key.includes('link')) {
                let linkCount = 1;
                arrToReturn.push(
                    <div className='socialWrap d-flex align-items-center mt-1' key={linkCount}>
                        <Form.Control
                            className='ml-3 w-25'
                            type="text"
                            name={`link${linkCount}.platform`}
                            placeholder='Platform'
                            value={values[key].platform}
                            onChange={handleChange} />
                        <span>:</span>
                        <Form.Control
                            type="text w-75"
                            name={`link${linkCount}.url`}
                            value={values[key].url}
                            onChange={handleChange}
                            placeholder='https://www.example.com'
                        />
                    </div>
                )
                linkCount++;
            }

        })
        // values.map((val) => { console.log(val) })
        // values.forEach((social, index) => {

        return arrToReturn;
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

                    <button type='submit'>
                        submit
                    </button>

                    <Form.Group>
                        {renderSocialsInput()}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ContactForm