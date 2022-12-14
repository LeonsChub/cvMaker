import React from 'react'
import ContactForm from '../ModalForms/ContactForm/ContactForm'
import WorkForm from '../ModalForms/ContactForm/workForm';
function ModalSwitch({ progress, incrementProgress }) {
    function modalByProg() {
        switch (progress) {
            case 1:
                return <ContactForm show={true} incrementProgress={incrementProgress} />
                break;
            case 2:
                return <WorkForm show={true} incrementProgress={incrementProgress} />
                break;

            default:
                break;
        }
    }

    return (
        modalByProg()
    )
}

export default ModalSwitch