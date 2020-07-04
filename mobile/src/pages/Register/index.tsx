import React, { useRef, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { Container, Titulo, AddButton, TextButton } from './styles';

import api from '../../services/api';
import Input from '../../components/Input';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
}

const Register: React.FC = () => {
  const formRef = useRef(null);

  const { navigate } = useNavigation();

  async function handleSubmit(item: Produto, { reset }): Promise<void> {
    const response = await api.post('produtos', {
      nome: item.nome,
      preco: item.preco,
      categoria: item.categoria
    });    
    console.log(response);  
    reset();
    navigate('Dashboard');
  }

  return (
    <Container>
      <Titulo>Cadastro de Produto</Titulo>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="nome" label="Nome" />
        <Input name="preco" label="Preço" keyboardType="number-pad" />
        <Input name="categoria" label="Categoria" />
      </Form>
      <AddButton
        onPress={() => formRef.current.submitForm()}
      ><TextButton>Adiconar</TextButton>
      </AddButton>

    </Container>
  );

}
export default Register;