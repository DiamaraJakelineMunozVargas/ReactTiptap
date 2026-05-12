import { NavLink } from "react-router-dom";
import { PlusIcon, BookText } from "lucide-react";
import ModalComponente from "./ModalComponente";



const NavbarCompo = ({ selectedNote, onUpdate }) => {
    const abrirModal = () => {
        const modal = document.getElementById("my_modal_3");
        if (modal) {
            modal.showModal();
        }
    };
    return (
        <>
            <header className="navbar bg-base-300 py-8 mb-10">
                <div className="w-full max-w-[1000px] mx-auto flex items-center justify-between">
                    <NavLink className={"text-3xl font-bold"} to={"/"}>
                        NoteApp
                    </NavLink>
                    <div className="ml-auto flex gap-5 ">
                        <NavLink
                            className={"btn btn-soft btn-primary font-bold text-[1.1em]"}
                            to={"/createNote"}
                        >
                            <PlusIcon />
                            Crear una nota
                        </NavLink>
                        <button
                            className="btn btn-soft btn-primary text-[1.1em]"
                            onClick={abrirModal}
                            disabled={!selectedNote}
                        >
                            <BookText />
                            Reporte
                        </button>
                    </div>

                </div>
            </header>
            <ModalComponente selectedNote={selectedNote} onUpdate={onUpdate} isOpen={selectedNote} />
        </>
    );
};

export default NavbarCompo;
