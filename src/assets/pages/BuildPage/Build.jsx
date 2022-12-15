import React from 'react'
import './build.css'

import { MdAlternateEmail } from 'react-icons/md'
import { AiFillPhone } from 'react-icons/ai'
import { AiOutlineComment } from 'react-icons/ai'

import blankProfile from '../../Images/blankProfile.webp'

import { Card } from 'react-bootstrap'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

function generatePdf() {
    const input = document.getElementById('resumeWrap');
    html2canvas(input)
        .then((canvas) => {
            const data = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.addImage(data, 'JPEG', 0, 0, 210, 300)
            pdf.save('download.pdf')
        })
}

function BuildPage({ superForm }) {
    // console.log(superForm)
    function renderSocials() {
        const toReturn = [];

        Object.entries(superForm[0].socials).map(([key, val]) => {
            toReturn.push(
                <span className='socialMediasItem' key={key}>
                    <a href={val.url}>
                        {val.platform}
                    </a>
                </span>
            );
        })
        return toReturn;
    }

    function renderSkills() {
        const toReturn = [];

        Object.entries(superForm[3].skills).map(([key, val]) => {
            toReturn.push(
                <span className='skillItem px-2' key={key} >
                    <p>{`${val.skill}`} </p>
                    <span className='mx-1'>:</span>
                    <p>{`${val.prof ? val.prof : 'Begginer'}`} </p>
                </span >
            );
        })
        return toReturn;
    }

    function renderWorkExp() {
        const jobs = [];
        Object.entries(superForm[1].workplaces).map(([key, val]) => {
            jobs.push(
                <Card.Body>

                    <Card.Title>{val.employer}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{val.position}</Card.Subtitle>
                    <Card.Text>
                        {val.description}
                    </Card.Text>

                    <div className="d-flex mt-2 align-items-center justify-content-center">
                        <Card.Text><h6>{val.startDate.replaceAll('-', '/')}</h6></Card.Text>
                        <span className='mx-2'><h5>-</h5></span>
                        <Card.Text><h6>{new Date(val.endDate) >= new Date() ? 'present' : val.endDate.replaceAll('-', '/')}</h6></Card.Text>
                    </div>

                </Card.Body>
            );
        });

        return (
            <Card>
                <Card.Header><h3>Work Experience</h3></Card.Header>
                {jobs}
            </Card>)
    }

    function renderEduExp() {
        const jobs = [];
        Object.entries(superForm[2].schools).map(([key, val]) => {
            jobs.push(
                <Card.Body>

                    <Card.Title>{val.employer}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{val.position}</Card.Subtitle>
                    <Card.Text>
                        {val.description}
                    </Card.Text>

                    <div className="d-flex mt-2 align-items-center">
                        <Card.Text><h6>{val.startDate.replaceAll('-', '/')}</h6></Card.Text>
                        <span className='mx-2'><h5>-</h5></span>
                        <Card.Text><h6>{new Date(val.endDate) >= new Date() ? 'present' : val.endDate.replaceAll('-', '/')}</h6></Card.Text>
                    </div>

                </Card.Body>
            );
        });

        return (
            <Card>
                <Card.Header><h3>Education</h3></Card.Header>
                {jobs}
            </Card>)
    }

    function renderImage() {
        return (superForm[0].imgState
            ? <img id='pfp' className='w-50 mx-auto' src={URL.createObjectURL(superForm[0].imgState)} />
            : <img id='pfp' className='w-50 mx-auto' src={blankProfile} />)

    }

    return (
        <div id='resumeWrap'>
            <div id="smallColumn" className='d-flex flex-column'>
                {renderImage()}
                <h3 className="fullName">
                    {`${superForm[0].fName} ${superForm[0].lName}`}
                </h3>

                <div className="contactInfoWrap">
                    <h4>Contact-Information</h4>

                    <span className="contactItemWrap">
                        <MdAlternateEmail className='icon' />
                        <p>{superForm[0].email}</p>
                    </span>

                    <span className="contactItemWrap">
                        <AiFillPhone className='icon' />
                        <p>{superForm[0].phoneNumber}</p>
                    </span>

                    <div id="socialMediasWrap">
                        <h4 className='mt-3'>Social Medias</h4>
                        <div className="d-flex flex-column">{renderSocials()}</div>
                    </div>
                </div>

                <div id="skillsWrap">
                    <h4>Skills</h4>
                    <div className="d-flex flex-column px-1">{renderSkills()}</div>
                </div>
            </div>


            <div id="thickColumn" className='d-flex flex-column'>
                <div id="workExperience" className='d-flex flex-column justify-content-center'>
                    {renderWorkExp()}
                </div>
                <div id="pastEducation" className='d-flex flex-column justify-content-center'>
                    {renderEduExp()}
                </div>
            </div>

            <button onClick={() => generatePdf()}>save as pdf</button>
        </div>


    )
}

export default BuildPage