export const PropietarioFormularioSkeleton = () => {
    const skeletonFields = Array(7).fill(null); // Número de campos en el formulario

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skeletonFields.map((_, index) => (
                    <div key={index} className="w-full">
                        <div className="h-4 skeleton rounded mb-2"></div>
                        <div className="h-10 skeleton rounded"></div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                <div className="h-10 w-24 skeleton rounded"></div>
                <div className="h-10 w-24 skeleton rounded"></div>
            </div>
        </div>
    );
};
