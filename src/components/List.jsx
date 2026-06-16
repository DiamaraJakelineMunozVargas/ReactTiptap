import { BookText } from "lucide-react";

const List = ({ data, setSelectedNote }) => { // le pasamos a la lista los datos del paciente y el paciente seleccionado
      
    return (
        <div className="bg-base-100 w-full ">
            <ul className="list bg-base-100 rounded-box shadow-md">


                {data.map((paciente) => (
                    <li
                        key={paciente._id}
                       /**  onClick={() => {
                            console.log("CLIC EN NOTA:", note.title, note.name);
                            window.open(
                                `/reports/${note._id}`,
                                "_blank",
                                "width=800,height=600,resizable=yes"
                            );
                        }}*/
                        className="list-row hover:bg-base-200 transition cursor-pointer"
                    >
                        <div className="avatar">
                            <div className="w-15 rounded-full">
                                {/* <img src="https://i.pravatar.cc/100" /> */}
                                   <img src="public/image/imagen.png" />
                            </div>
                        </div>

                        <div>
                            <div className="font-semibold text-accent lg: text-2xl" id="name">
                                {paciente.name}
                                {/* {note.name} */}
                            </div>
                               <div className="font-semibold" id="edad">
                                Edad: {paciente.edad}
                                {/* {note.name} */}
                            </div>

                         


                        </div>
                        <div className=" flex justify-between items-end text-xs opacity-60 p-2 ">
                           
                            <button className="btn btn-accent btn-sm" onClick={(e) => {
                                e.stopPropagation(); setSelectedNote(paciente);
                            }}> 
                            <BookText size={18}/>
                            Reporte</button>
                        </div>

                        {/* <button className="btn btn-primary btn-sm">Abrir</button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default List;