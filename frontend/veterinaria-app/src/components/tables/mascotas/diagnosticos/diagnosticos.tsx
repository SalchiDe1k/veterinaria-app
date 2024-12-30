interface propsTable {
  diagnosticos: Array<{ fecha: string; diagnostico: string; notas: string }>;
}

export const TableDiagnosticosMascosta = ({ diagnosticos }: propsTable) => {
  return (
    <table className="table w-full">
      <thead className="bg-[#EFEFEF] text-gray-700">
        <tr>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Diagnóstico</th>
          <th className="px-4 py-2">Notas</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {diagnosticos.map((entry, index) => (
          <tr key={index} className="hover:bg-[#E0F4E0] transition-colors">
            <td className="px-4 py-2">{entry.fecha}</td>
            <td className="px-4 py-2">{entry.diagnostico}</td>
            <td className="px-4 py-2">{entry.notas}</td>
            <td className="px-4 py-2 flex gap-2">
              <button className="btn btn-sm bg-[#FFC107] text-white hover:bg-[#FFB300] rounded">
                Editar
              </button>
              <button className="btn btn-sm bg-[#F44336] text-white hover:bg-[#E53935] rounded">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
