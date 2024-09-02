import React from "react";
import { Form, Button, Modal } from "react-bootstrap";

const ModalUpdate = ({
  setShowModal,
  showModal,
  newTodoName,
  handleChangeUpdate,
  updateTodo,
}) => {
  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        {" "}
        {/* Modal */}
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={newTodoName}
            onChange={handleChangeUpdate}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="active-style"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="active-style"
            variant="primary"
            onClick={() => updateTodo()}
          >
            {" "}
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalUpdate;
