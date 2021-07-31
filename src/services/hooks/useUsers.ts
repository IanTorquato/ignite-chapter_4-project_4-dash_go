import { useQuery } from 'react-query';
import { api } from 'src/services/api';

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

export async function getUsers(currentPage: number): Promise<GetUsersResponse> {
  const response = await api.get('/users', { params: { page: currentPage } });

  const totalCount = Number(response.headers['x-total-count']);

  const users = response.data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-br', { day: '2-digit', month: 'long', year: 'numeric' }),
  }));

  return { users, totalCount };
}

export function useUsers(currentPage: number) {
  return useQuery(['users', currentPage], () => getUsers(currentPage), {
    staleTime: 1000 * 8, // 8 seconds
  });
}
