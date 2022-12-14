import { useRef, useState } from 'react';
import cryptoRandomString from "crypto-random-string"

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'

import { CgTrash } from 'react-icons/cg'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { useFormik } from 'formik'

function WorkForm(props) {
    const submitRef = useRef(null)
    const [workplaces, setWorkplaces] = useState([]);

    function handleAddingWorkPlace() {
        const workplaceToAdd = { employer: '', position: '', description: '', id: cryptoRandomString({ length: 3 }) }
        setWorkplaces((state) => [...state, workplaceToAdd])
    }

    function handleRemovingWorkPlace(id) {
        const i = workplaces.findIndex((val) => val.id === id)
        const temp = workplaces;

        temp.splice(i, 1);

        console.log(temp)
        setWorkplaces([...temp])
    }

    function renderWorkplaces() {
        const arrToGet = [];

        workplaces.forEach((workPlace, index) => {
            arrToGet.push(
                <div className="workForm" key={index}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 >Workplace {index + 1}</h4>
                        <CgTrash
                            size={24}
                            className='mb-1 discard cursorPoint'
                            onClick={() => handleRemovingWorkPlace(workPlace.id)} />
                    </div>
                    <Form.Group>
                        <div className="d-flex">
                            <Form.Control
                                type='text'
                                name={`link${index}.employer`}
                                placeholder='Employer' />
                            <Form.Control
                                type='text'
                                placeholder='Position'
                                className='mx-1' />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            className='noResize mt-3'
                            placeholder='Description' />
                    </Form.Group>
                </div>

            );
        })
        return arrToGet;
    }

    return (
        <Modal show={props.show} backdrop='static' centered size='md' >
            <Modal.Header >
                <Modal.Title>Past Work Experience</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form >
                    {renderWorkplaces()}
                    <Form.Text
                        className='text-primary cursorPoint'
                        onClick={() => handleAddingWorkPlace()}>
                        Add WorkPlace
                        <AiOutlinePlusCircle
                            className='mb-1 mx-1'
                            size={16} />
                    </Form.Text>

                    <button type='submit' ref={submitRef} className='d-none' />
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

export default WorkForm