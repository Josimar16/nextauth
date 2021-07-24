import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from "@chakra-ui/react";
import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ name, label, error = null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error} marginBottom={1}>
        {!!label && <FormLabel
          htmlFor={name}
        >
          {label} {name}
        </FormLabel>}

        <ChakraInput
          id={name}
          name={name}
          backgroundColor="gray.900"
          focusBorderColor="green.500"
          variant="filled"
          _hover={{
            backgroundColor: 'gray.900'
          }}
          size="lg"
          ref={ref}
          {...rest}
        />
        {!!error &&
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>}
      </FormControl>
    );
  }

export const Input = forwardRef(InputBase);