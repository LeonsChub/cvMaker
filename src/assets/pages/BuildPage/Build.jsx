import React from 'react'
import './build.css'

import { MdAlternateEmail } from 'react-icons/md'
import { AiFillPhone } from 'react-icons/ai'
import { AiOutlineComment } from 'react-icons/ai'

function BuildPage({ superForm }) {

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

    function renderImage() {
        return superForm[0].imgState ? <img src={URL.createObjectURL(superForm[0].imgState)} /> : <img alt='prp' />
        // <img src={URL.createObjectURL(FILE_OBJECT)} /> 
    }

    return (
        <div id='resumeWrap'>
            <div id="smallColumn">
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


            <div id="thickColumn">2</div>
        </div>
    )
}

export default BuildPage