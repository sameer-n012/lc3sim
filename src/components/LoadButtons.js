import React, { useRef, useState } from "react";
import store from "../store";
import { Container, Button, Modal } from "react-bootstrap";
import { setMemory } from "../actions/memoryActions";
import { useDispatch } from "react-redux";
import { writeProgram, readProgram } from "../resources/readProgram";

const LoadButtons = () => {
    const loadProgFileInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleLoadProgramClick = () => {
        loadProgFileInputRef.current.click();
    };

    const handleExportMemoryClick = async (e) => {
        let mem = store.getState().memory.memoryValues;
        let pc = store.getState().registers.registerValues[0];
        let out = await writeProgram(mem, pc);

        const saveFile = async (text) => {
            const blob = new Blob([text], { type: "text/plain" });
            const a = document.createElement("a");
            a.download = "program.lc3";
            a.href = URL.createObjectURL(blob);
            a.addEventListener("click", (e) => {
                setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
            });
            a.click();
        };

        saveFile(out);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                console.log(content);
                let mem = readProgram(content);
                dispatch(setMemory(mem));
            };
            reader.readAsText(file);
        }
    };

    const [modal, setModal] = useState(false);

    const handleCloseHelp = () => setModal(false);
    const handleShowHelp = () => setModal(true);

    return (
        <Container>
            <Modal show={modal} onHide={handleCloseHelp} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Help</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>LC-3 Web Simulator</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleCloseHelp()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container className="d-flex justify-content-evenly">
                <Button
                    disabled
                    variant="outline-dark"
                    className="w-25"
                    onClick={() => handleShowHelp()}
                >
                    Help
                </Button>
                <Button
                    variant="outline-dark"
                    className="w-25"
                    onClick={handleLoadProgramClick}
                >
                    Load Program
                </Button>
                <input
                    type="file"
                    style={{ display: "none" }}
                    ref={loadProgFileInputRef}
                    onChange={(e) => handleFileChange(e)}
                />
                <Button
                    variant="outline-dark"
                    className="w-25"
                    onClick={(e) => handleExportMemoryClick(e)}
                >
                    Export Memory
                </Button>
            </Container>
        </Container>
    );
};

export default LoadButtons;
