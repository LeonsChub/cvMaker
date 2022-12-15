import { useEffect, useRef, useState } from 'react';
import cryptoRandomString from "crypto-random-string"

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'

import { CgTrash } from 'react-icons/cg'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { ErrorMessage, useFormik } from 'formik'

function WorkForm(props) {
    const [formErrors, setFormErrors] = useState({})
    const submitRef = useRef(null)
    const [workplaces, setWorkplaces] = useState([]);
    const { values, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            workplaces: props.workInfo ? props.workInfo.workplaces : {}
        },
        onSubmit,
    })

    useEffect(() => {
        const workInfo = props.workInfo;

        if (workInfo) {
            setWorkplaces([])
            values.workplaces = {}
            alert('prev info')
            Object.entries(workInfo.workplaces).map(([key, val]) => {
                const objToPush = {
                    employer: val.employer,
                    position: val.position,
                    description: val.description,
                    id: key.substring(4, 7)
                };
                setWorkplaces((prev) => [...prev, objToPush])
                values.workplaces[key] = val;
            })
        }
        console.log(values)
    }, [])


    function validateForm(values) {
        setFormErrors({});
        let valid = true;
        const valToArray = Object.entries(values.workplaces);

        valToArray.forEach((val) => {
            const errors = {}
            if (!val[1].position) {
                errors.position = 'Required field*'
                valid = false;
            }
            if (!val[1].employer) {
                errors.employer = 'Required field*'
                valid = false;
            }
            if (!val[1].startDate) {
                errors.startDate = 'Required field*'
                valid = false;
            }
            if (!val[1].endDate) {
                errors.endDate = 'Required field*'
                valid = false;
            }
            if (val[1].endDate < val[1].startDate) {
                errors.chronology = 'What are you a time traveller?'
                valid = false;
            }
            setFormErrors((prev) => { prev[val[0]] = errors; return prev })
        })


        return valid;
    }

    function onSubmit(values, action) {
        if (validateForm(values)) {
            props.setSuperFormAt(values, 1);
            props.incrementProgress();
        }
    }

    function handleAddingWorkPlace() {
        const workplaceToAdd = { employer: '', position: '', description: '', id: cryptoRandomString({ length: 3 }) }
        setWorkplaces((state) => [...state, workplaceToAdd])
    }

    function handleRemovingWorkPlace(id) {
        const i = workplaces.findIndex((val) => val.id === id)
        const temp = workplaces;

        temp.splice(i, 1);
        delete values[`link${id}`]
        setWorkplaces([...temp])
    }

    function renderWorkplaces() {
        const arrToGet = [];

        workplaces.forEach((workPlace, index) => {
            if (!values.workplaces[`link${workPlace.id}`]) {
                values.workplaces[`link${workPlace.id}`] = {}
            }

            const errors = formErrors;
            const errPointer = 'link' + workPlace.id

            const errClassEmployer = errors[errPointer] ? errors[errPointer].employer ? 'error' : '' : '';
            const errClassPosition = errors[errPointer] ? errors[errPointer].position ? 'error' : '' : '';
            const errClassStartDate = errors[errPointer] ? errors[errPointer].startDate ? 'error' : '' : '';
            const errClassEndDate = errors[errPointer] ? errors[errPointer].endDate ? 'error' : '' : '';
            const errClassChronology = errors[errPointer] ? errors[errPointer].chronology ? 'error' : '' : '';

            arrToGet.push(
                <div className="workForm" key={workPlace.id}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className='mt-2' >Workplace {index + 1}</h4>
                        <CgTrash
                            size={24}
                            className='mb-1 discard cursorPoint'
                            onClick={() => handleRemovingWorkPlace(workPlace.id)} />
                    </div>
                    <Form.Group>
                        <div className="d-flex">
                            <div className="mr d-flex flex-column">
                                <Form.Control
                                    className={errClassEmployer}
                                    value={values.workplaces[`link${workPlace.id}`].employer}
                                    onChange={handleChange}
                                    name={`workplaces.link${workPlace.id}.employer`}
                                    type='text'
                                    placeholder='Employer' />
                                <span className='errorExplain'>
                                    {errors[errPointer] ? errors[errPointer].employer : ''}
                                </span>
                            </div>

                            <div className="d-flex flex-column">

                                <Form.Control
                                    className={errClassPosition}
                                    value={values.workplaces[`link${workPlace.id}`].position}
                                    onChange={handleChange}
                                    name={`workplaces.link${workPlace.id}.position`}
                                    type='text'
                                    placeholder='Position' />

                                <span className='errorExplain'>
                                    {errors[errPointer] ? errors[errPointer].position : ''}
                                </span>
                            </div>
                        </div>
                    </Form.Group>

                    <Form.Group className={`d-flex flex-column justify-content-around mt-3 ${errClassChronology}`}>

                        <div
                            className={`d-flex mb-2 justify-content-start align-items-center gap-1 ${errClassStartDate}`}>
                            <label
                                htmlFor="startDate">Start Date:</label>
                            <input
                                type="date"
                                id='startDate'
                                value={values.workplaces[`link${workPlace.id}`].startDate}
                                onChange={handleChange}
                                name={`workplaces.link${workPlace.id}.startDate`} />
                            <span className='errorExplain'>
                                {errors[errPointer] ? errors[errPointer].startDate : ''}
                            </span>

                        </div>

                        <div className={`d-flex justify-content-start align-items-center gap-1 ${errClassEndDate}`}>
                            <label htmlFor="endDate">End Date:</label>
                            <input
                                type="date"
                                id='endDate'
                                value={values.workplaces[`link${workPlace.id}`].endDate}
                                onChange={handleChange}
                                name={`workplaces.link${workPlace.id}.endDate`} />
                            <span className='errorExplain'>
                                {errors[errPointer] ? errors[errPointer].endDate : ''}
                            </span>
                        </div>
                    </Form.Group>
                    <span className='errorExplain'>
                        {errors[errPointer] ? errors[errPointer].chronology : ''}
                    </span>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            value={values.workplaces[`link${workPlace.id}`].description}
                            onChange={handleChange}
                            name={`workplaces.link${workPlace.id}.description`}
                            rows={5}
                            className='noResize mt-3'
                            placeholder='Description (Optional)' />
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
                <Form onSubmit={handleSubmit}>
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
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="success" onClick={() => { props.decrementProgress(); }}>
                    Previous page
                </Button>

                <Button variant="primary" onClick={() => { submitRef.current.click(); }}>
                    Continue
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default WorkForm