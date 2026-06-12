import { Link } from "react-router-dom";
import List from "../components/List";
import NavbarCompo from "../components/NavbarCompo";
import { PlusIcon } from "lucide-react";
import { Pencil } from "lucide-react";

const Inicio = ({ data, setSelectedNote }) => {
  if (!data) return <span>No hay datos</span>;

  return (
    <div className=" w-full">
      <NavbarCompo />

      <div className="grid grid-cols- [repeat(auto-fit, _minmax(280px, -1fr))] gap-4 mt-16 xl:grid-cols-[repeat(auto-fit, _minmax(350px, -1fr))]. max-w-[1540px] mx-auto">
        <Link
          to="/createNote"
          className="btn btn-soft btn-primary font-bold text-[1.1em] ml-auto flex gap-2 justify-between"
        >
          <PlusIcon />
          Agregar Nueva Plantilla
        </Link>
        <Link
          to="/editPlantilla"
          className="btn btn-soft btn-primary font-bold text-[1.1em] ml-auto flex gap-2 justify-between"
        >
          <Pencil/>
          Editar Plantilla
        </Link>
        <h1 className="p-4 font-bold lg: text-3xl">Lista de Reportes</h1>

        <List data={data} setSelectedNote={setSelectedNote}></List>
      </div>
    </div>
  );
};

export default Inicio;
