import DraggableModal from "./DraggableModal";
import ContenidoModalTipTap from "./ContenidoModal";
import { useEffect, useRef } from "react";


//isOpen bool
//data any
const ModalComponente = ({ selectedNote, onUpdate, isOpen }) => {
    const dialogref = useRef(null)
    useEffect(() => {
        if (isOpen) {
            dialogref.current.showModal()
        } else {
            dialogref.current.close()
        }

    }, [isOpen])

    return (
        <dialog ref={dialogref} id="my_modal_3" className="modal">
            <DraggableModal handle=".handle">
                <div className="modal-box max-w-5xl w-[95vw] h-[90vh] p-0 flex flex-col" >
                    <div className="handle bg-base-300 p-4 cursor-move rounded-t-2xl flex justify-between items-center">
                        <h3 className="font-bold text-lg">Reporte de Nota</h3>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                        </form>
                    </div>

                    <div className="p-6 ">
                        <ContenidoModalTipTap selectedNote={selectedNote} onUpdate={onUpdate} />
                    </div>
                </div>
            </DraggableModal>
        </dialog>
    );
};

export default ModalComponente;
