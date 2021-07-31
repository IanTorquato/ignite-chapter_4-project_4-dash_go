import { useQuery } from 'react-query';
import { api } from 'src/services/api';

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers(): Promise<User[]> {
  const response = await api.get('/users');

  const users = response.data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-br', { day: '2-digit', month: 'long', year: 'numeric' }),
  }));

  return users;
}

export function useUsers() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 8, // 8 seconds
  });
}
