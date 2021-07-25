import Head from 'next/head';
import { Flex, Button } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../hooks/Auth';
import { Input } from '../components/Form/Input';
import { redirect } from 'next/dist/next-server/server/api-utils';
import { withSSRGuest } from '../utils/withSSRGuest';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatório').min(6, 'No mínimo 6 caracteres')
})

export default function Home() {
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Login | NextAuth</title>
        <meta name="description" content="Tela de login do app" />
      </Head>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          backgroundColor="gray.800"
          padding="8"
          borderRadius={8}
          flexDirection="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={formState.errors.email}
            {...register('email')}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            error={formState.errors.password}
            {...register('password')}
          />
          <Button
            type="submit"
            marginTop="6"
            colorScheme="green"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async (context: GetServerSidePropsContext) => {
  return {
    props: {}
  }
});