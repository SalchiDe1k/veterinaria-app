export const SkeletonPropietarioTable = () => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="table w-full border border-gray-200 table-fixed">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 w-16">#</th>
            <th className="px-4 py-2 w-1/4">Nombre</th>
            <th className="px-4 py-2 w-1/4">Correo</th>
            <th className="px-4 py-2 w-1/4">Teléfono</th>
            <th className="px-4 py-2 w-1/4">Mascotas Registradas</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="px-4 py-2">
                <div className="h-4 w-6 skeleton rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 w-full skeleton rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 w-full skeleton rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 w-full skeleton rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-full skeleton rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
