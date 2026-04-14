import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./ModalEditor.css";

const ModalEditor = ({ isOpen, onClose, children, titulo }) => {
    const [windowState, setWindowState] = useState("normal");
    // "normal" | "maximized" | "minimized"

    if (!isOpen) return null;


    const normalState = {
        x: 80,
        y: 60,
        width: 850,
        height: "90vh",
    };


    const maximized = {
        size: {
            width: "100vw",
            height: "100vh",
        },
        position: {
            x: 0,
            y: 0,
        },
        disableDragging: true,
        enableResizing: false,
    };


    if (windowState === "minimized") {
        return (
            <div className="minimized-bar">
                <button onClick={() => setWindowState("normal")}>
                    📄 {titulo || "Documento"} (restaurar)
                </button>
            </div>
        );
    }

    const handleMinimize = () => {
        setWindowState("minimized");
    };

    const handleMaximize = () => {
        setWindowState((prev) =>
            prev === "maximized" ? "normal" : "maximized"
        );
    };

    const rndProps =
        windowState === "maximized"
            ? maximized
            : {
                default: normalState,
            };

    return (
        <div className="modal-overlay">
            <Rnd
                {...rndProps}
                bounds="window"
                dragHandleClassName="ventana-header"
                className="ventana-word-rnd"
            >
                <div
                    className="ventana-word"
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* HEADER */}
                    <header className="ventana-header">
                        <div className="header-left">
                            <span className="icon-word">📄</span>
                            <span>
                                {titulo || "Documento - Word"}
                            </span>
                        </div>

                        <div className="header-controls">


                            <button
                                className="btn-win"
                                onClick={handleMaximize}
                            >
                                {windowState === "maximized" ? "-" : "❐"}
                            </button>

                            <button
                                className="btn-win btn-close"
                                onClick={onClose}
                            >
                                ✕
                            </button>
                        </div>
                    </header>

                    {/* CONTENIDO */}
                    <div className="hoja-interior">
                        {children}
                    </div>
                </div>
            </Rnd>
        </div>
    );
};

export default ModalEditor;