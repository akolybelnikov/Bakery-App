import React from 'react'

import {
    Modal,
    Message,
    MessageBody,
    ModalBackground,
    ModalContent,
    Delete,
    MessageHeader
} from 'bloomer'

export default({message, isActive, onModalClose}) => {
    return (
        <Modal isActive={isActive}>
            <ModalBackground/>
            <ModalContent>
                <Message>
                    <MessageHeader><Delete onClick={onModalClose}/></MessageHeader>
                    <MessageBody>{message}</MessageBody>
                </Message>
            </ModalContent>
        </Modal>
    )
}
