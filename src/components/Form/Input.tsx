import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';

type InputProps = ChakraInputProps & {
  name: string;
  label?: string;
};

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && (
        <FormLabel id={name} htmlFor={name}>
          {label}
        </FormLabel>
      )}

      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="pink.500"
        bg="gray.900"
        variant="filled"
        _hover={{ bgColor: 'gray.900' }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}
