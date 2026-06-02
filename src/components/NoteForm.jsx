import {useEffect, useState } from "react";
import { Save } from "lucide-react";

const NoteForm = ({onSubmit, initialDate}) => {
    const [plantilla, setPlantillas] = useState(initialDate);
    
    useEffect(()=>{
        setPlantillas[initialDate];
    },[initialDate]);
    const handleChange = (e) => {
        setPlantillas({
            ...plantilla,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit =(e) => {
        e.preventDefault()
        onSubmit(plantilla)
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-base-300 rounded-lg max-w-4xl mx-auto p-10">
                <input
                    className="block w-full mb-8 input lg:input-lg focus: ring-0 focus: outline-0 border-0"
                    placeholder="Nombre"
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={plantilla.nombre}
                    onChange={handleChange}
                    required
                ></input>
                <input
                    className="block w-full mb-8 input lg:input-lg focus: ring-0 focus: outline-0 border-0"
                    placeholder="Modalidad"
                    type="text"
                    id="modalidad"
                    name="modalidad"
                    value={plantilla.modalidad}
                    onChange={handleChange}
                    required
                ></input>
                 <input
                    className="block w-full mb-8 input lg:input-lg focus: ring-0 focus: outline-0 border-0"
                    placeholder="Tipo de Estudio"
                    type="text"
                    id="tipo_estudio"
                    name="tipo_estudio"
                    value={plantilla.tipo_estudio}
                    onChange={handleChange}
                    required
                ></input>
            <button className="btn btn-soft btn-primary"> <Save></Save>Guardar</button>
                {/* <textarea
        className=""

        ></textarea> */}
            </form>
        </div>
    );
};

export default NoteForm;
