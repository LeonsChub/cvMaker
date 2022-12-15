import { useEffect, useRef, useState } from 'react';
import cryptoRandomString from "crypto-random-string"

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'

import { CgTrash } from 'react-icons/cg'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { ErrorMessage, useFormik } from 'formik'

function SkillsForm(props) {
    const submitRef = useRef(null);

    const [skills, setSkills] = useState([]);

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue } = useFormik({
        initialValues: {
        },
        onSubmit,
    })

    function onSubmit(values, actions) {
        props.incrementProgress();
    }

    function handleAddingSkill() {
        const skillToAdd = { skill: '', proficiency: '', id: cryptoRandomString({ length: 3 }) }
        setSkills((prev) => [...prev, skillToAdd])
    }

    function renderSkills() {
        const arrToGet = [];

        skills.forEach((skill) => {
            // const platVal = values.socials[`link${social.id}`] ? values.socials[`link${social.id}`].platform : '';
            // const urlVal = values.socials[`link${social.id}`] ? values.socials[`link${social.id}`].url : '';
            arrToGet.push(
                <div className='d-flex align-items-center mb-1' key={skill.id}>
                    <h1>SKILL HAHA</h1>
                </div>
            );
        })
        return arrToGet;
    }


    return (
        <Modal show={props.show} backdrop='static' centered size='md' >
            <Modal.Header >
                <Modal.Title>Skills</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Text
                        className='text-primary cursorPoint'
                        onClick={() => handleAddingSkill()}>
                        Add skill

                        <AiOutlinePlusCircle
                            className='mb-1 mx-1'
                            size={16} />
                    </Form.Text>

                    <button type='submit' ref={submitRef} className='d-none' />

                    <Form.Group>
                        {renderSkills()}
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

export default SkillsForm