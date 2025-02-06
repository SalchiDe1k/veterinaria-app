import { MascotaResponse } from "@/domain/interfaces";

interface MascotasTableProps {
    rows: MascotaResponse[];
  }
  
  export const MascotasTable = ({
    rows,
  }: MascotasTableProps) => {
    const totalRowsToDisplay = 10;
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
              <th className="px-4 py-3 text-left">Especie</th>
              <th className="px-4 py-3 text-left">Raza</th>
              <th className="px-4 py-3 text-left">Edad</th>
              <th className="px-4 py-3 text-left">Sexo</th>
              <th className="px-4 py-3 text-left">Peso</th>
       
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  No hay datos disponibles
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-200`}
                >
                  <th className="px-4 py-3">{index + 1}</th>
                  <td className="px-4 py-3 truncate">{row.nombre}</td>
                  <td className="px-4 py-3 truncate">{row.especie}</td>
                  <td className="px-4 py-3">{row.raza}</td>
                  <td className="px-4 py-3">
                    {row.edad} {row.unidadEdad}
                  </td>
                  <td className="px-4 py-3">
                    {row.peso} {row.unidadPeso}
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
                <td className="px-4 py-3">&nbsp;</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  