import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { FaCheckToSlot, FaSquarePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const List = ({
  todoList,
  finishTodo,
  deleteTodo,
  startEditTodo,
  isCompleted,
  isCompletedList,
}) => {
  return (
    <>
      {todoList.map((todo, index) => {
        return (
          <Card
            className="col-10 col-sm-6 col-md-8 mx-auto mt-2 bg-light"
            key={todo.id}
          >
            <Card.Body>
              {isCompletedList[index] ? (
                <>
                  <Row className="bg-secondary rounded p-1">
                    <Col>
                      <del>
                        <h3>{todo.todoName}</h3>
                      </del>
                    </Col>

                    <Col xl="1 me-4 ">
                      <Button
                        className="active-style"
                        onClick={() => finishTodo(index)}
                        variant={todo.status ? "success" : "secondary"}
                      >
                        <FaCheckToSlot className="active-style" />
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row className="p-1">
                    <Col>
                      <h3 className="">{todo.todoName}</h3>
                    </Col>

                    <Col xl="1 me-4">
                      <Button
                        className="active-style"
                        onClick={() => finishTodo(index)}
                        variant={todo.status ? "success" : "secondary"}
                      >
                        <FaCheckToSlot className="active-style" />
                      </Button>
                    </Col>
                  </Row>
                </>
              )}

              <Row className="mt-1 gap-3">
                <Col>
                  <Button
                    className="active-style"
                    variant="danger"
                    onClick={() => deleteTodo(index)}
                  >
                    <MdDelete />
                  </Button>

                  <Button
                    className="ms-2 active-style"
                    variant="warning"
                    onClick={() => startEditTodo(index)}
                  >
                    <FaEdit className="text-white" />
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default List;
