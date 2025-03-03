import React from "react";
import { Container, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setInput } from "../actions/inputOutputActions";

const InputConsole = () => {
    const dispatch = useDispatch();
    const running = useSelector((state) => state.running.running);

    // when changing input console, update the input state by dispatching action
    const handleChange = (e) => {
        const val = e.target.value;
        dispatch(setInput(val));
    };

    return (
        <Container className="pt-3">
            <h6>Input Console</h6>
            <Form.Control
                as="textarea"
                rows="5"
                name="input-console"
                className="bg-light border border-dark rounded p-2 input-console-box"
                onChange={(e) => handleChange(e)}
                disabled={running}
            />
        </Container>
    );
};

export default InputConsole;
