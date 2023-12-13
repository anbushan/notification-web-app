import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModel = (props) => {
  return (
    <div>
      <Modal show={props.DELETESTATE} onHide={props.ONCLICK} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.DELETETITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm to Delete this {props.DESCRIPTION}..?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => props.ONCONFIRM(props.deleteId)}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={props.ONCLICK}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModel;
