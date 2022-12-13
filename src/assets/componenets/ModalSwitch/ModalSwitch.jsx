import React from 'react'
import ContactForm from '../ModalForms/ContactForm/ContactForm'

function ModalSwitch({ progress }) {
    return (
        progress === 1 ? <ContactForm show={true} /> : ''
    )
}

export default ModalSwitch