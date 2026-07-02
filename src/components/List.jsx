import { BookText } from "lucide-react";

const List = ({
  data = [],
  onActionClick,
  textoBoton = "Ver",
  iconoBoton,
  imagen = "https://i.pravatar.cc/100",
}) => {
  const Icono = iconoBoton ?? BookText;
  return (
    <div className="bg-base-100 w-full ">
      <ul className="list bg-base-100 rounded-box shadow-md">
        {data.map((data, index) => (
          <li
            key={data._id || `data-${index}`}
            className="list-row hover:bg-base-200 transition cursor-pointer"
          >
            <div className="avatar">
              <div className="w-15 rounded-full">
                <img src={data.imagen || imagen} alt={data.titulo} />
              </div>
            </div>

            <div>
              <div className="font-semibold text-accent lg:text-2xl">
                {data.titulo}
              </div>
              {data.subtitulo && (
                <div className="font-semibold text-sm opacity-70">
                  {data.subtitulo}
                </div>
              )}
            </div>
            <div className="flex justify-between items-end text-xs p-2">
              <button
                className="btn btn-accent btn-sm flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onActionClick?.(data.originalData); 
                }}
              >
                <Icono size={18} />
                {textoBoton}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default List;
