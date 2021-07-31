import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';

import { SidebarNav } from '@dashgo/components/Sidebar/SidebarNav';
import { useSidebarDrawer } from '@dashgo/contexts/SidebarDrawerContext';

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({ base: true, lg: false });

  if (isDrawerSidebar) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />

            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}
