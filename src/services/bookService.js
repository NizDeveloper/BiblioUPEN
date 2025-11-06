
const URL_API = 'http://localhost:3001/api/books';

export const bookService = {
    getAll: async () => {
        try {
            const response = await fetch(URL_API);
            return await response.json();
        } catch (error) {
            console.error('Error: ', error);
            return[]
        }
    },


  // Nuevo método delete
    delete: async (id) => {
        try {
            const response = await fetch(`${URL_API}/${id}`, {
                method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar el libro');
        }
        
        return await response.json();
        } catch (error) {
        console.error('Error: ', error);
        throw error;
        }
    }
};
