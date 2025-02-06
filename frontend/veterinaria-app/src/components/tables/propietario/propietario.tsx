import { PropietarioResponseDTO } from "@/application/dtos";

interface PropietariosTableProps {
  rows: PropietarioResponseDTO[];
  onMascotasLinkClick: (data : PropietarioResponseDTO) => void;
}

export const PropietariosTable = ({
  rows,
  onMascotasLinkClick,
}: PropietariosTableProps) => {
  const totalRowsToDisplay = 10; // Total de filas que siempre se deben mostrar
  const emptyRows = Array.from(
    { length: Math.max(0, totalRowsToDisplay - rows.length) },
    (_, index) => index
  );



  return (
    <div className="sm:overflow-x-auto rounded-lg shadow-lg border border-gray-300">
      <table className="table-auto w-full min-w-[700px] text-sm text-gray-700">
        {/* Encabezado */}
        <thead className="bg-[#F7F7F7] text-gray-900 font-semibold">
          <tr>
            <th className="px-4 py-3 text-left w-16">#</th>
            <th className="px-4 py-3 text-left w-1/4">Nombre</th>
            <th className="px-4 py-3 text-left w-1/4">Correo</th>
            <th className="px-4 py-3 text-left">Teléfono</th>
            <th className="px-4 py-3 text-left">#Identificación</th>
            <th className="px-4 py-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-200`}
              >
                <th className="px-4 py-3">{index + 1}</th>
                <td className="px-4 py-3 truncate">{row.nombre}</td>
                <td className="px-4 py-3 truncate">{row.correo}</td>
                <td className="px-4 py-3">{row.numeroTelefono}</td>
                <td className="px-4 py-3">{row.numeroIdentificacion}</td>
                <td className="px-4 py-3">
                  <a
                    onClick={() => onMascotasLinkClick(row)} // Reemplaza con tu lógica de edición
                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Editar
                  </a>
                </td>
              </tr>
            ))
          )}

          {/* Relleno de filas vacías */}
          {emptyRows.map((_, index) => (
            <tr key={`empty-${index}`} className="bg-white">
              <td className="px-4 py-3">&nbsp;</td>
              <td className="px-4 py-3">&nbsp;</td>
              <td className="px-4 py-3">&nbsp;</td>
              <td className="px-4 py-3">&nbsp;</td>
              <td className="px-4 py-3">&nbsp;</td>
              <td className="px-4 py-3">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
