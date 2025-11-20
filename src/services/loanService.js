const API_URL = 'http://localhost:3001/api/loans';

export const loanService = {
  getAll: async()=>{
    try{
      const response = await fetch(API_URL);
      return await response.json();
    }catch(error){
      console.error('Error:', error);
      return [];
    }
  },

  getByStudent: async(enrollment)=>{
    try{
      const response = await fetch(`${API_URL}/student/${enrollment}`);
      return await response.json();
    }catch(error){
      console.error('Error:', error);
      return [];
    }
  },

  create: async(loanData)=>{
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
        throw new Error(error.error || 'Error al crear préstamo');
      }

      return await response.json();
    }catch(error){
      console.error('Error:', error);
      throw error;
    }
  },

  returnBook: async(loanId)=>{
    try{
      const response = await fetch(`${API_URL}/${loanId}/return`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'Error al devolver libro');
      }

      return await response.json();
    }catch(error){
      console.error('Error:', error);
      throw error;
    }
  }
};