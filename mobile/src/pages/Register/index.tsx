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

  const { goBack } = useNavigation();

  async function handleSubmit(item: Produto, { reset }): Promise<void> {
    const response = await api.post('produtos', {
      nome: item.nome,
      preco: item.preco,
      categoria: item.categoria
    });    
    reset();
    goBack();
  }

  return (
    <Container>
      <Titulo>Cadastro de Produto</Titulo>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input 
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="default"
          name="nome"
          icon="person-outline"
          placeholder="Nome"
          returnKeyType="next"
        />
        <Input 
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="numbers-and-punctuation"
          name="preco"
          icon="cash-outline"
          placeholder="Preço"
          returnKeyType="next" 
        />
        <Input 
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="default"
          name="categoria"
          icon="grid-outline"
          placeholder="Categoria"
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />
      </Form>
      <AddButton
        onPress={() => formRef.current.submitForm()}
      ><TextButton>Adiconar</TextButton>
      </AddButton>

    </Container>
  );

}
export default Register;