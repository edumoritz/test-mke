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
  ProdutoTitulo,
  ProdutoNome,
  PrecoContainer,
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
      <ProdutoTitulo>Lista de Produtos</ProdutoTitulo>
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
              <PrecoContainer>
                <ProdutoPreco>{formatValue(item.preco)}</ProdutoPreco>
                <ProdutoButton
                  onPress={() => {handleDelete(item)}}
                >
                  <FeatherIcon size={30} name="trash-2" color="#e83f5b" />
                </ProdutoButton>
              </PrecoContainer>
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