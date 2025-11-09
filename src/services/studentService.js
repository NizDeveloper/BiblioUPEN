const API_URL = 'http://localhost:3001/api/students';

export const studentService = {
  getAll: async () => {
    try {
      const response = await fetch(API_URL);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  },

  create: async (studentData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al crear estudiante');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

    delete: async (enrollment) => {
    try {
      const response = await fetch(`${API_URL}/${enrollment}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al eliminar estudiante');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  update: async(enrollment, studentData) => {
  try{
    const response = await fetch(`${API_URL}/${enrollment}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData)
    });
    
    if(!response.ok){
      const error = await response.json();
      throw new Error(error.error || 'Error al actualizar estudiante');
    }
    
    return await response.json();
  }catch(error){
    console.error('Error:', error);
    throw error;
  }
}
};
