import Navhead from '../../componenets/Navhead'
import Button from 'react-bootstrap/Button'
import './intro.css'

import { BsCheck2Circle } from 'react-icons/bs'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { FaSearch } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useReducer } from 'react'

import ContactForm from '../../componenets/ModalForms/ContactForm/ContactForm'
export const ACTIONS = {
    startSurvey: 'START_SURVEY'
}
function IntroPage() {

    const initState = { surveyBegan: false, count: 0 };

    function reducer(state, action) {
        switch (action.type) {
            case ACTIONS.startSurvey:
                let temp = state;
                temp.surveyBegan = true;
                return { ...temp };
                break;

            default:
                break;
        }
    }

    const [state, dispatch] = useReducer(reducer, initState);



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
                    onClick={() => dispatch({ type: ACTIONS.startSurvey })}>
                    Let's Begin!
                </Button>

            </div>
            <ContactForm surveyBegan={state.surveyBegan} />

        </>
    )
}

export default IntroPage