import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

type ProfileProps = {
  showProfileData?: boolean;
};

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text> Ian Torquato </Text>
          <Text color="gray.300" fontSize="small">
            iantorquato2@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Ian Torquato" src="https://github.com/iantorquato.png" />
    </Flex>
  );
}
