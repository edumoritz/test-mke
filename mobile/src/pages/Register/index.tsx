import React, { useRef } from 'react';

import {Form} from '@unform/mobile';

import {Container, Titulo, AddButton, TextButton} from './styles';
import Input from '../../components/Input';

const Register: React.FC = () => {
  const formRef = useRef(null);

  function handleSubmit(data, { reset }) {
    console.log(data);
    console.log(formRef.current);
    reset();
  }

  return (
    <Container>
      <Titulo>Cadastro de Produto</Titulo>
      <Form ref={formRef} onSubmit={handleSubmit}>

        <Input 
        name="name" label="Nome"  />

        <Input 
        name="preco" label="Preço" keyboardType="number-pad" />

        <Input 
        name="categoria" label="Categoria"  />

        <AddButton
          onPress={() => formRef.current.submitForm()}
        ><TextButton>Adicionar</TextButton>
        </AddButton>
      </Form>
      
    </Container>
  );

}
export default Register;