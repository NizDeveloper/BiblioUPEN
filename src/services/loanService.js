const API_URL = 'http://localhost:3001/api/loans';

export const loanService = {
  getAll: async() => {
    try{
      const response = await fetch(API_URL);
      return await response.json();
    }catch(error){
      console.error('Error:', error);
      return [];
    }
  },

  getByStudent: async(enrollment) => {
    try{
      const response = await fetch(`${API_URL}/student/${enrollment}`);
      return await response.json();
    }catch(error){
      console.error('Error:', error);
      return [];
    }
  },

  getByBook: async(bookId) => {
    try{
      const response = await fetch(`${API_URL}/book/${bookId}`);
      return await response.json();
    }catch(error){
      console.error('Error:', error);
      return [];
    }
  },

  create: async(loanData) => {
    try{
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanData)
      });

      if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'Error creating loan');
      }

      return await response.json();
    }catch(error){
      console.error('Error:', error);
      throw error;
    }
  },

  returnBook: async(loanId) => {
    try{
      const response = await fetch(`${API_URL}/${loanId}/return`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'Error returning book');
      }

      return await response.json();
    }catch(error){
      console.error('Error:', error);
      throw error;
    }
  },

  extendDueDate: async(loanId, newDueDate) => {
    try{
      const response = await fetch(`${API_URL}/${loanId}/extend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({due_date: newDueDate})
      });

      if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'Error when extending deadline');
      }

      return await response.json();
    }catch(error){
      console.error('Error:', error);
      throw error;
    }
  },

  delete: async(loanId)=>{
    try{
      const response = await fetch(`${API_URL}/${loanId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'Error deleting loan');
      }

      return await response.json();
    }catch(error){
      console.error('Error:', error);
      throw error;
    }
  },
};