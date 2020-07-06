import React, { useRef, useState } from 'react';
import { useNavigation, useRoute  } from '@react-navigation/native';
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

  // const [nome, setNome] = useState('');
  const formRef = useRef(null);

  const routes = useRoute();
  const routeParams = routes.params as Produto;

  const { goBack } = useNavigation();

  async function handleSubmit(item: Produto, { reset }): Promise<void> {
    if(!!routeParams) {
      await api.put(`produtos/${routeParams.id}`, {
        nome: item.nome,
        preco: item.preco,
        categoria: item.categoria
      }); 
    } else {
      await api.post('produtos', {
        nome: item.nome,
        preco: item.preco,
        categoria: item.categoria
      }); 
    }
       
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
          // value={nome}
          // onChangeText={text => setNome(text)}
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