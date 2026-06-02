import QRCode from "react-qr-code";

function ReporteTemplate({ children, nota, pac, fechaFormateada, printRef }) {
  return (
    <div
      ref={printRef}
      className="documento-pdf bg-white shadow-2xl ring-1 ring-black/5"
    >
      <div className="flex justify-between items-start mb-8 ">
        <div className="text-center border-b-3 border-black mb-8 rounded-sm">
          <h1 className="text-2xl font-serif font-bold uppercase tracking-tighter underline">
            {nota.modalidad} - {nota.nombre}
          </h1>

          <p className="text-sm opacity-60">
            Fecha de emisión: {fechaFormateada}
          </p>

          <div className="mb-3 text-left gap-y-2 text-sm">
            <p>
              <strong>PACIENTE:</strong> {pac.name}
            </p>
            <p>
              <strong>EDAD:</strong> {pac.edad}
            </p>
            <p>
              <strong>FECHA DE NACIMIENTO:</strong>{" "}
              {new Date(pac.fechaNacimiento).toLocaleDateString()}{" "}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center ">
          <QRCode
            value={`Paciente: ${pac.name} | Estudio: ${nota.nombre} `}
            size={110}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            title="Estudio Clinico"
          />

          <p className="text-xs mt-2 text-center">
            <strong>
              ESCANEAR PARA <br />
              VER EL ESTUDIO
            </strong>
          </p>
        </div>
      </div>

      <div>{children}</div>

      <footer className="border-t border-gray-300 mt-12 pt-20 flex justify-around ">
        <div className="flex justify-between items-end">
          <div className="text-center w-64">
            <div className="border-t border-black pt-2">
              <p className="font-semibold">Dr. Juan Pérez</p>

              <p className="text-sm text-gray-600">Médico Radiólogo</p>

              <p className="text-xs text-gray-500">Mat. Prof. 123456</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ReporteTemplate;
