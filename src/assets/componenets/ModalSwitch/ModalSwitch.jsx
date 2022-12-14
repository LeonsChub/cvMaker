import React from 'react'
import ContactForm from '../ModalForms/ContactForm/ContactForm'
import EduForm from '../ModalForms/ContactForm/eduForm';
import WorkForm from '../ModalForms/ContactForm/workForm';
function ModalSwitch({ progress, incrementProgress, decrementProgress, setSuperFormAt, superForm }) {
    function modalByProg() {
        switch (progress) {
            case 1:
                return <ContactForm
                    show={true}
                    incrementProgress={incrementProgress}
                    setSuperFormAt={setSuperFormAt}
                    contactInfo={contactInfo} />
                break;
            case 2:
                return <WorkForm
                    show={true}
                    incrementProgress={incrementProgress}
                    decrementProgress={decrementProgress} />
                break;

            case 3:
                return <EduForm
                    show={true}
                    incrementProgress={incrementProgress}
                    decrementProgress={decrementProgress} />
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