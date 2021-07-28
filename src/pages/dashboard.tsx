import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import { Header } from '@dashgo/components/Header';
import { Sidebar } from '@dashgo/components/Sidebar';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: { enabled: false },
    foreColor: theme.colors.gray[500],
  },
  grid: { show: false },
  dataLabels: { enabled: false },
  tooltip: { enabled: false },
  xaxis: {
    type: 'datetime',
    axisBorder: { color: theme.colors.gray[600] },
    axisTicks: { color: theme.colors.gray[600] },
    categories: [
      '2021-07-27T13:13:00.000Z',
      '2021-07-28T13:13:00.000Z',
      '2021-07-29T13:13:00.000Z',
      '2021-07-30T13:13:00.000Z',
      '2021-07-31T13:13:00.000Z',
      '2021-08-01T13:13:00.000Z',
      '2021-08-02T13:13:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series1 = [{ name: 'seires1', data: [30, 120, 40, 26, 61, 18, 126] }];
const series2 = [{ name: 'seires1', data: [62, 46, 60, 50, 26, 85, 110] }];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1400} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>

            <Chart type="area" height={160} options={options} series={series1} />
          </Box>

          <Box p="8" bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>

            <Chart type="area" height={160} options={options} series={series2} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
