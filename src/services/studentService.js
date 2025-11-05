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
  }
};
