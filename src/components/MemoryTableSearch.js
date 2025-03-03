import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editMemoryViewport } from "../actions/memoryActions";
import { Form } from "react-bootstrap";
import {
    convertToNumber,
    convertToString,
} from "../resources/numberConversions";
import { validateNumberBounds } from "../resources/validateNumberBounds";

const MemoryTableSearch = () => {
    const dispatch = useDispatch();

    const { memoryViewportError } = useSelector((state) => state.memory);
    const [localMemoryViewportError, setLocalMemoryViewportError] =
        useState(false);

    const validate_location = (location) => {
        setLocalMemoryViewportError(false);

        if (
            !validateNumberBounds(Number("0" + location)) &&
            !validateNumberBounds(Number(location)) &&
            !validateNumberBounds(convertToNumber(location, "uint_binary"))
        ) {
            setLocalMemoryViewportError(true);
            return null;
        }

        if (location.startsWith("x")) {
            return Number("0" + location);
        } else if (location.startsWith("0x")) {
            return Number(location);
        } else if (/^([01]+)$/.test(location)) {
            return convertToNumber(location, "uint_binary");
        } else if (location === "0" || location.length === 0) {
            return 0;
        } else {
            setLocalMemoryViewportError(true);
            return null;
        }
    };

    const updateLocation = (e) => {
        if (e.target.id === "memlocsearch") {
            let l = validate_location(e.target.value);
            if (!localMemoryViewportError) {
                dispatch(editMemoryViewport(l));
            }
        }
        console.log(localMemoryViewportError);
    };

    const formatLocation = (e) => {
        if (e.target.id === "memlocsearch") {
            let l = validate_location(e.target.value);
            if (!localMemoryViewportError) {
                e.target.value = convertToString(l, "hex", 4);
            }
        }
    };

    return (
        <div>
            <Form.Control
                className="p-0 m-0 ps-2 memory-table-search prevent-focus-highlight"
                type="text"
                name="memloc"
                id="memlocsearch"
                placeholder="Search Memory Locations"
                style={{
                    color:
                        memoryViewportError || localMemoryViewportError
                            ? "lightcoral"
                            : "initial",
                }}
                autoComplete="off"
                onChange={(e) => updateLocation(e)}
                onBlur={(e) => formatLocation(e)}
            />
        </div>
    );
};

export default MemoryTableSearch;
