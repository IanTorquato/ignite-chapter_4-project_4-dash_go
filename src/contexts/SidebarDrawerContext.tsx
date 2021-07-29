import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, ReactNode, createContext, useEffect } from 'react';

type SidebarDrawerProviderProps = {
  children: ReactNode;
};

type SidebarDrawerContext = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContext);

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [disclosure, router.asPath]);

  return <SidebarDrawerContext.Provider value={disclosure}>{children}</SidebarDrawerContext.Provider>;
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
