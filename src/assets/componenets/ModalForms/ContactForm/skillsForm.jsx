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
            skills: props.skillInfo ? props.skillInfo.skills : {},
        },
        onSubmit,
    })

    useEffect(() => {
        const skillsInfo = props.skillsInfo;
        console.log(props)

        if (skillsInfo) {
            setSkills([])
            values.skills = {};
            Object.entries(skillsInfo.skills).map(([key, val]) => {

                const objToPush = {
                    'skill': val.skill,
                    'proficiency': val.proficiency,
                    'id': key.substring(4, 7)
                }

                setSkills(
                    (prev) => [...prev, objToPush]
                )

                values.skills[key] = val;
            })
        }
    }, [])

    function onSubmit(values, actions) {

        props.setSuperFormAt(values, 3)
        props.incrementProgress();
    }

    function handleAddingSkill() {
        const skillToAdd = { skill: '', proficiency: '', id: cryptoRandomString({ length: 3 }) }
        setSkills((prev) => [...prev, skillToAdd])
    }

    function handleRemovingSkill(id) {
        const i = skills.findIndex((val) => val.id === id)
        const temp = skills;

        temp.splice(i, 1);

        delete values.skills[`link${id}`]
        setSkills([...temp])
    }

    function renderSkills() {
        const arrToGet = [];

        skills.forEach((skill) => {
            if (!values.skills[`link${skill.id}`]) {
                values.skills[`link${skill.id}`] = {}
            }
            // const platVal = values.socials[`link${social.id}`] ? values.socials[`link${social.id}`].platform : '';
            // const urlVal = values.socials[`link${social.id}`] ? values.socials[`link${social.id}`].url : '';
            arrToGet.push(
                <div className='d-flex align-items-center ' key={skill.id}>

                    <Form.Control
                        name={`skills.link${skill.id}.skill`}
                        value={values.skills[`link${skill.id}`].skill}
                        onChange={handleChange}
                        placeholder='Skill' />

                    <Form.Select
                        name={`skills.link${skill.id}.prof`}
                        value={values.skills[`link${skill.id}`].prof}
                        onChange={handleChange}>

                        <option>Proficiency</option>
                        <option value="Begginer">Begginer</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                    </Form.Select>

                    <CgTrash
                        size={24}
                        className='discard cursorPoint'
                        onClick={() => handleRemovingSkill(skill.id)} />
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
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="success" onClick={() => { props.decrementProgress(); }}>
                    Previous page
                </Button>

                <Button variant="primary" onClick={() => { submitRef.current.click(); }}>
                    Preview
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default SkillsForm