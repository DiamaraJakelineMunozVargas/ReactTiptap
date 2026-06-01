
import NoteForm from '../components/NoteForm';
import axios from "axios";
import { toast} from 'react-toastify';

const CreateNote = () => {
    const handleCreate = async (plantilla) => {
        try{
            await axios.post(`http://localhost:3000/plantillas`,plantilla)
            .then(res => {
                if(res.status !== 201){
                    throw new Error("error al crear la plantilla")
                }
                toast.success("Plantilla creada con éxito", {
                    position: "bottom-center", autoClose: 3000, theme: "colored",
                });
            });
        }
        catch(error){
            console.error(error)
        }
    }
    return (
        <div>
            <NoteForm onSubmit={handleCreate} initialDate={{descripcion: "", contenido: "" }} ></NoteForm>
        </div>
    )
}

export default CreateNote
