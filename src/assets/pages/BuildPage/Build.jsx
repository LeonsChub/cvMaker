import React from 'react'
import './build.css'

function BuildPage({ superForm }) {
    console.log(superForm)
    return (
        <div id='resumeWrap'>
            <div id="smallColumn">
                <h2 className="fullName">
                    {`${superForm[0].fName} ${superForm[0].lName}`}
                </h2>
            </div>
            <div id="thickColumn">2</div>
        </div>
    )
}

export default BuildPage