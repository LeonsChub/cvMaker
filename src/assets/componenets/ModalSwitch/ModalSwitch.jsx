import React from 'react'
import ContactForm from '../ModalForms/ContactForm/ContactForm'
import EduForm from '../ModalForms/ContactForm/eduForm';
import WorkForm from '../ModalForms/ContactForm/workForm';
import SkillsForm from '../ModalForms/ContactForm/skillsForm';

function ModalSwitch({ progress, incrementProgress, decrementProgress, setSuperFormAt, superForm }) {
    function modalByProg() {
        switch (progress) {
            case 1:
                return <ContactForm
                    show={true}
                    incrementProgress={incrementProgress}
                    setSuperFormAt={setSuperFormAt}
                    contactInfo={superForm[0]} />
                break;
            case 2:
                return <WorkForm
                    show={true}
                    incrementProgress={incrementProgress}
                    decrementProgress={decrementProgress}
                    setSuperFormAt={setSuperFormAt}
                    workInfo={superForm[1]} />

                break;

            case 3:
                return <EduForm
                    show={true}
                    incrementProgress={incrementProgress}
                    decrementProgress={decrementProgress}
                    setSuperFormAt={setSuperFormAt}
                    schoolInfo={superForm[2]} />
                break;
            case 4:
                return <SkillsForm
                    show={true} />
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