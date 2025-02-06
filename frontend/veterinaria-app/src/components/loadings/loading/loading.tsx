export const Loading = ({ texto }: { texto: string }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-50">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-green-500 border-gray-200 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-700 font-medium">{texto}...</p>
            </div>
        </div>



    );
};
