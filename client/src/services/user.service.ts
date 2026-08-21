import type { UserData } from '../types/user.types';

class UserService {
  async updateUser(userData: UserData) {
    if (!userData.id) {
      throw new Error('Missing user Id');
    }

    const response = await fetch(
      `http://localhost:8080/api/users/${userData.id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Cannot update the user');
    }

    return response.json();
  }

  async getUser(id: UserData['id']) {
    if (!id) {
      throw new Error('Missing user Id');
    }

    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Cannot fetch the user');
    }

    const data = response.json();

    return data;
  }
}

export default new UserService();
