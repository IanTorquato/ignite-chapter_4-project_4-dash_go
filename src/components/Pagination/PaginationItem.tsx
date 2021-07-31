import { Button } from '@chakra-ui/react';

type PaginationItemProps = {
  number: number;
  onPageChange: (page: number) => void;
  isCurrent?: boolean;
};

export function PaginationItem({ number, onPageChange, isCurrent = false }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button size="sm" fontSize="xs" w="4" colorScheme="pink" disabled _disabled={{ bg: 'pink.500', cursor: 'default' }}>
        {number}
      </Button>
    );
  }

  return (
    <Button size="sm" fontSize="xs" w="4" bg="gray.700" _hover={{ bg: 'gray.600' }} onClick={() => onPageChange(number)}>
      {number}
    </Button>
  );
}
