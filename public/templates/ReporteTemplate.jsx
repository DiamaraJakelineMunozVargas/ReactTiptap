import QRCode from "react-qr-code";

function ReporteTemplate({ children, nota, fechaFormateada, printRef }) {
  return (
    <div
      ref={printRef}
      className="documento-pdf bg-white shadow-2xl ring-1 ring-black/5"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="text-center border-b-2 border-black pb-6 mb-8 rounded-sm">
          <h1 className="text-3xl font-serif font-bold uppercase tracking-tighter">
            Reporte Oficial
          </h1>

          <p className="text-sm italic">
            Documento generado vía Sistema de Notas
          </p>

          <p className="text-sm opacity-60">
            Fecha de emisión: {fechaFormateada}
          </p>
        </div>
        <QRCode
          value={`Reporte-${nota.content}`}
          size={90}
          bgColor="#ffffff"
          fgColor="#000000"
         
        />
     
      </div>

      <div className="mb-6 space-y-2">
        <p>
          <strong>Nombre:</strong> {nota.name}
        </p>
        <p>
          <strong>Titulo:</strong> {nota.title}
        </p>
      </div>

      <div>{children}</div>
    </div>
  );
}

export default ReporteTemplate;
