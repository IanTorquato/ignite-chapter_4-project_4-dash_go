import { Flex } from '@chakra-ui/react';

import { Header } from '@dashgo/components/Header';
import { Sidebar } from '@dashgo/components/Sidebar';

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1400} mx="auto" px="6">
        <Sidebar />
      </Flex>
    </Flex>
  );
}
