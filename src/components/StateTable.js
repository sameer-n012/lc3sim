import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { convertToString } from "../resources/numberConversions";
import { validateNumberBounds } from "../resources/validateNumberBounds";
import { editRegister } from "../actions/registerActions";
import { formatNZP } from "../resources/formatting";

const StateTable = () => {
    const dispatch = useDispatch();

    const [modal, setModal] = useState({
        show: false,
        regloc: 0,
        editedValue: 0,
        editRegisterValueError: false,
    });

    const handleClose = () =>
        setModal({ show: false, regloc: 0, editedValue: 0 });
    const handleShow = (regloc, editedValue) =>
        setModal({ show: true, regloc: regloc, editedValue: editedValue });

    //registers 0-7, pc, ir, psr, cc
    const { registerValues: registerVals } = useSelector(
        (state) => state.registers,
    );

    const registerNames = [
        "R0",
        "R1",
        "R2",
        "R3",
        "R4",
        "R5",
        "R6",
        "R7",
        "PC",
        "IR",
        "PSR",
        "CC",
    ];

    const showEditRegister = (location) => {
        console.log(location, registerVals[location]);
        handleShow(location, registerVals[location]);
        //console.log('editing register at', convertToString(location, 'hex', 4));
    };

    const dispatchEditRegister = (location, value) => {
        console.log("dispatch edit register", location, value);
        if (
            !validateNumberBounds(location, 0, 11) ||
            (!validateNumberBounds(value) && location !== 11) ||
            (!validateNumberBounds(value, 0, 7) && location === 11)
        ) {
            dispatch(editRegister(-1, -1));
            return;
        }
        dispatch(editRegister(Number(location), Number(value)));
        handleClose();
    };

    return (
        <Container className="pt-3 d-flex justify-content-center">
            <Modal show={modal.show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Editing {registerNames[modal.regloc]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        className="p-2 m-0 ps-2"
                        type="text"
                        name="editregister"
                        id="reglocsearch"
                        placeholder="Enter Value"
                        defaultValue={convertToString(
                            modal.editedValue,
                            "hex",
                            4,
                        )}
                        style={{
                            backgroundColor: modal.editRegisterValueError //FIXME background color not changing on save
                                ? "lightcoral"
                                : "initial",
                        }}
                        onChange={(e) =>
                            setModal({ ...modal, editedValue: e.target.value })
                        }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            dispatchEditRegister(
                                modal.regloc,
                                modal.editedValue,
                            )
                        }
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container className="p-3 border border-dark rounded">
                {[...Array(Math.floor(registerNames.length / 2))].map(
                    (x, idx) => (
                        <Row key={idx}>
                            <Col className="d-flex justify-content-between align-items-center">
                                {`${registerNames[idx * 2]}:`}{" "}
                                <code
                                    id={`r${idx * 2}code`}
                                    onClick={(e) => showEditRegister(idx * 2)}
                                    className="cursor-clickable"
                                >
                                    {convertToString(
                                        registerVals[idx * 2],
                                        "hex",
                                    )}
                                </code>
                            </Col>
                            {idx < registerNames.length ? (
                                <Col className="d-flex justify-content-between align-items-center">
                                    {`${registerNames[idx * 2 + 1]}:`}{" "}
                                    {registerNames[idx * 2 + 1] === "CC" ? ( // CC register is only modifiable through PSR
                                        <code>
                                            {formatNZP(
                                                registerVals[idx * 2 + 1],
                                            )}
                                        </code>
                                    ) : (
                                        <code
                                            id={`r${idx * 2 + 1}code`}
                                            onClick={(e) =>
                                                showEditRegister(idx * 2 + 1)
                                            }
                                            className="cursor-clickable"
                                        >
                                            {convertToString(
                                                registerVals[idx * 2 + 1],
                                                "hex",
                                            )}
                                        </code>
                                    )}
                                </Col>
                            ) : (
                                <Col className="d-flex justify-content-between align-items-center"></Col>
                            )}
                        </Row>
                    ),
                )}
            </Container>
        </Container>
    );
};

export default StateTable;
