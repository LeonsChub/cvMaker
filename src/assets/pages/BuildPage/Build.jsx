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

    return (
        <div id='resumeWrap'>
            <div id="smallColumn">
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
                </div>
            </div>


            <div id="thickColumn">2</div>
        </div>
    )
}

export default BuildPage