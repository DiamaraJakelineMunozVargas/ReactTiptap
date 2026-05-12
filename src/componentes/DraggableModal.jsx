import Draggable from "react-draggable";
import { useRef } from "react";

// Agregamos handle a las Props
const DraggableModal = ({ children, handle }) => {
    const nodeRef = useRef(null);

    return (
        // Pasamos el handle al Draggable
        <Draggable nodeRef={nodeRef} handle={handle}>
            <div ref={nodeRef} className="draggable-container">
                {children}
            </div>
        </Draggable>
    );
};

export default DraggableModal;