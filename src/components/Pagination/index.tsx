import { Box, Stack, Text } from '@chakra-ui/react';

import { PaginationItem } from './PaginationItem';

type PaginationProps = {
  totalRegisters: number;
  onPageChange: (page: number) => void;
  registersPerPage?: number;
  currentPage?: number;
};

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({ totalRegisters, registersPerPage = 10, currentPage = 1, onPageChange }: PaginationProps) {
  const lastPage = Math.floor(totalRegisters / registersPerPage);

  const previousPages = currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : [];

  const nextPages =
    currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : [];

  return (
    <Stack direction={['column', 'row']} spacing="6" mt="8" justify="space-between" align="center">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>80</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > siblingsCount + 1 && (
          <>
            <PaginationItem number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 && previousPages.map((page) => <PaginationItem number={page} key={page} />)}

        <PaginationItem number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map((page) => <PaginationItem number={page} key={page} />)}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
