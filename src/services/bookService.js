const URL_API = 'http://localhost:3001/api/books';

export const bookService = {
	getAll: async () => {
		try{
			const response = await fetch(URL_API);
			return await response.json();
		}catch (error) {
			console.error('Error:', error);
			return [];
		}
	},

	create: async (bookData) => {
		try{
			const response = await fetch(URL_API, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', 
				},
				body: JSON.stringify(bookData)
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || 'ERROR CREATING BOOK');
			}

			return await response.json();
		}catch (error) {
			console.error('Error:', error);
			throw error;
		}
	},

	delete: async (isbn) => {
		try{
			const response = await fetch(`${URL_API}/${isbn}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				}
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || 'ERROR DELETING THE BOOK');
			}

			return await response.json();
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	},

	update: async(isbn, bookData) => {
		try{
			const response = await fetch(`${URL_API}/${isbn}`,{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bookData)
			});

			if(!response.ok){
				const error = await response.json();
				throw new Error(error.error || 'ERROR UPDATING BOOK');
			}
			
			return await response.json();
		}catch(error){
			console.error('Error:', error);
			throw error;
		}
	}
};