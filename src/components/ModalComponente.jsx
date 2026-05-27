import { useEffect, useRef, useState } from "react";
import axios from "axios";



const ModalComponente = ({ selectedNote, isOpen, onClose }) => {

    const dialogref = useRef(null);
    const [plantillas, setPlantillas] = useState([]);

    useEffect(() => {

        if (!dialogref.current) return;

        if (isOpen) {
            dialogref.current.showModal();

            cargarPlantillas();
        } else {
            dialogref.current.close();
        }

    }, [isOpen]);

    const cargarPlantillas = async () => {

        try {

            const response = await axios.get(
                `http://localhost:3000/plantillas`
            );

            setPlantillas(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const abrirReporte = (plantilla) => {

        window.open(
            `/reports/${selectedNote._id}/${plantilla._id}`,
            "_blank",
            "width=800,height=600,resizable=yes"
        );
            

        onClose();
    };

    return (
        <dialog
            ref={dialogref}
            className="modal"
        >
            <div className="modal-box max-w-4xl">

                <div className="flex justify-between items-center mb-5">

                    <h3 className="font-bold text-xl">
                        Seleccionar Plantilla
                    </h3>

                    <button
                        className="btn btn-sm btn-circle"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="space-y-2">

                    {plantillas.map((plantilla) => (

                        <button
                            key={plantilla._id}
                            className="btn btn-outline w-full justify-start"
                            onClick={() => abrirReporte(plantilla)}
                        >
                            {plantilla.modalidad} - {plantilla.nombre}
                        </button>

                    ))}

                </div>

            </div>
        </dialog>
    );
};

export default ModalComponente;