export const formatDate = (date?: string): string => {
    const parsedDate = date ? new Date(date) : new Date();
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
