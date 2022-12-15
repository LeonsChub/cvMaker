import React from 'react'

function Preview(props) {

    return (
        <Modal show={props.show} backdrop='static' centered size='md' >
            <Modal.Header >
                <Modal.Title>Skills</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Text
                        className='text-primary cursorPoint'
                        onClick={() => handleAddingSkill()}>
                        Add skill

                        <AiOutlinePlusCircle
                            className='mb-1 mx-1'
                            size={16} />
                    </Form.Text>

                    <button type='submit' ref={submitRef} className='d-none' />

                    <Form.Group>
                        {renderSkills()}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="success" onClick={() => { props.decrementProgress(); }}>
                    Previous page
                </Button>


                <Button variant="primary" onClick={() => { submitRef.current.click(); }}>
                    Preview
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default Preview