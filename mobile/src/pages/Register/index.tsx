import React, { useRef, useCallback } from 'react';
import { useNavigation, useRoute  } from '@react-navigation/native';

import { Container, Titulo, AddButton, TextButton } from './styles';

import { Alert } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';

interface Produto {
  id?: string;
  nome: string;
  preco: number;
  categoria: string;
}

const Register: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const routes = useRoute();
  const routeParams = routes.params as Produto;

  const handleSubmitValidate = useCallback(
    async (data: Produto) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome Obrigatório'),
          preco: Yup.number().required('Preço obrigatório'),
          categoria: Yup.string().required('Categoria obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if(!!routeParams) {
          await api.put(`produtos/${routeParams.id}`, {            
            nome: data.nome,
            preco: data.preco,
            categoria: data.categoria
          });
          console.log(data)
        } else {
          await api.post('produtos', {
            nome: data.nome,
            preco: data.preco,
            categoria: data.categoria
          });
        }     

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você pode visualizar o item na lista.',
        );
        navigation.goBack();
        
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao cadastrar o produto.',
        );
      }
    }, [navigation],
  );

  return (
    <Container>
      <Titulo>Cadastro de Produto</Titulo>
      <Form ref={formRef} onSubmit={handleSubmitValidate}>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="default"
          name="nome"
          icon="person-outline"
          placeholder="Nome"
          returnKeyType="next"
        />
        <InputMask 
          type={'money'}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Preço"
          name="preco" 
          keyboardType="numeric" 
          icon="cash-outline"
          returnKeyType="next"
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: ''
          }}
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