/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useState } from 'react';
import { RiAddBoxLine } from 'react-icons/ri';

import { Header } from '@dashgo/components/Header';
import { Pagination } from '@dashgo/components/Pagination';
import { Sidebar } from '@dashgo/components/Sidebar';
import { api } from '@dashgo/services/api';
import { getUsers, useUsers } from '@dashgo/services/hooks/useUsers';
import { queryClient } from '@dashgo/services/queryClient';

// eslint-disable-next-line react/prop-types
export default function UserList({ users }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(currentPage, { initialData: users });

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 8, // 8 minutes
      },
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px={['4', '4', '6']}>
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddBoxLine} fontSize="20" />}>
                Criar novo usuário
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários!</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>

                    <Th>Usuário</Th>

                    {isWideVersion && <Th>Data de cadastro</Th>}

                    <Th w="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>

                      <Td>
                        <Box>
                          <Link color="purple.400">
                            <Text fontWeight="bold" onMouseEnter={() => handlePrefetchUser(user.id)}>
                              {user.name}
                            </Text>
                          </Link>

                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>

                      {isWideVersion && <Td>{user.createdAt}</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination totalRegisters={data.totalCount} currentPage={currentPage} onPageChange={setCurrentPage} />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users } = await getUsers(1);

  return {
    props: { users },
  };
};
