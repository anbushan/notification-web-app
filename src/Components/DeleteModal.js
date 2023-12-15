import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';


const DeleteModel = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      <Modal show={props.DELETESTATE} onHide={props.ONCLICK} centered>
        <Modal.Header closeButton>
          <Modal.Title> {t(`${props.DELETETITLE}` )}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm to Delete this {t(`${props.DESCRIPTION}` )} ..?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => props.ONCONFIRM(props.deleteId)}
          >
           {t(`Yes`)} 

          </Button>
          <Button variant="secondary" onClick={props.ONCLICK}>
              {t(`No`)} 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteModel
