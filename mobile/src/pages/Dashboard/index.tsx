import React, { useCallback, useEffect, useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import { View } from 'react-native';

import api from '../../services/api';

import {
  Container,
  ProdutoList,
  Produto,
  Titulo,
  ProdutoNome,
  ButtonContainer,
  ProdutoPreco,
  ProdutoButton,
  ProdutoContainer,
  ProdutoCategoria,
  ButtonAdd,
  TituloAdicionar
} from './styles';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
}

const Dashboard: React.FC = () => {

  const { navigate } = useNavigation();

  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('/produtos');

      setProdutos(response.data["produtos"]);
    }

    loadProducts();
  }, [produtos]); 

  function handleEdit(item: Produto): void {
  }

  function handleDelete(item: Produto): void {
    async function deleteProduto(id): Promise<void> {
      const response = await api.delete(`produtos/${id}`);      
      setProdutos(response.data["produtos"]);
    }
    deleteProduto(item.id);
  }

  const navigateToRegister = useCallback(() => {
    navigate('Register');
  }, [navigate]);

  return (
    <Container>
      <Titulo>Lista de Produtos</Titulo>
      <ProdutoContainer>
        <ProdutoList
          data={produtos}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
            <Produto>
              
              <ProdutoNome>{item.nome}</ProdutoNome>
              <ProdutoCategoria>{item.categoria}</ProdutoCategoria>
              <ProdutoPreco>{formatValue(item.preco)}</ProdutoPreco>
              <ButtonContainer>
                <ProdutoButton
                  onPress={() => {handleEdit(item)}}
                >
                  <FeatherIcon size={30} name="edit" color="#FF8C00" />
                </ProdutoButton>
                <ProdutoButton
                  onPress={() => {handleDelete(item)}}
                >
                  <FeatherIcon size={30} name="trash-2" color="#e83f5b" />
                </ProdutoButton>
              </ButtonContainer>
            </Produto>
          )}
        />
        
      </ProdutoContainer>
      <ButtonAdd
         onPress={navigateToRegister}
      >
         <TituloAdicionar>Adicionar</TituloAdicionar>
      </ButtonAdd>
    </Container>
  );
};

export default Dashboard;