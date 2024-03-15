import React from 'react'
import Button from '../../../Components/UI/Button/Button'
import Modal from '../../../Components/UI/Modal/Modal'

function ConfirmData(props) {
  return (
    <div>
        <Modal show={props.close} modalClosed={props.close}>
            <h2>Ordered Successfully.</h2>
            <Button btnType="Success" clicked={props.close}>Ok</Button>
        </Modal>
    </div>
  )
}

export default ConfirmData