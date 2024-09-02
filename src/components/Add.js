import React from "react";
import { Card, CardBody, Stack, Form, Button, Modal } from "react-bootstrap";
import { FaCheckToSlot, FaSquarePlus } from "react-icons/fa6";

const AddTodo = ({ AddTodo, handleChangeAdd, todoName }) => {
  return (
    <Card className="col-10 col-sm-6 col-md-8 mx-auto">
      <CardBody className="">
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            type="text"
            placeholder="Enter your to do"
            onChange={handleChangeAdd}
            value={todoName}
          />
          {/* <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback> */}
          <Button className="active-style" onClick={() => AddTodo()}>
            <FaSquarePlus />
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default AddTodo;
