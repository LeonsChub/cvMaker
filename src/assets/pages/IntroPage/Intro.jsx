import Navhead from '../../componenets/Navhead'
import Button from 'react-bootstrap/Button'
import './intro.css'

import { BsCheck2Circle } from 'react-icons/bs'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useState } from 'react'

import ContactForm from '../../componenets/ModalForms/ContactForm/ContactForm'
import ModalSwitch from '../../componenets/ModalSwitch/ModalSwitch'

export const ACTIONS = {
    startSurvey: 'START_SURVEY'
}
function IntroPage() {
    const [progress, setProgress] = useState(0);

    function incrementProgress() {
        setProgress((prev) => prev + 1);
    }

    return (
        <>
            <Navhead />

            <div id="hero">
                <div className="heroPoint">
                    <BsCheck2Circle size={60} />

                    <div className="wordWrap">
                        <h3>Simple and to the point</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum quod ea ducimus tempora! Doloremque alias iure rerum cum minus, similique cupiditate et dicta modi eos!</p>
                    </div>
                </div>
                <div className="heroPoint">
                    <HiOutlineDocumentDuplicate size={60} />

                    <div className="wordWrap">
                        <h3>Organize your skills and Abilities</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nesciunt numquam minima!</p>
                    </div>
                </div>
                <div className="heroPoint">
                    <FaSearch size={60} />

                    <div className="wordWrap">
                        <h3>Find better jobs</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quam, repellendus optio laborum error, consectetur voluptatem temporibus doloribus ar!</p>
                    </div>
                </div>
                <Button
                    variant='info'
                    size='lg'
                    className='mb-3'
                    onClick={() => incrementProgress()}>
                    Let's Begin!
                </Button>

            </div>
            <ModalSwitch
                progress={progress}
                incrementProgress={incrementProgress} />


        </>
    )
}

export default IntroPage