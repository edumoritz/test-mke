import React, { useCallback, useEffect, useState }  from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import formatValue from '../../utils/formatValue';
import api from '../../services/api';

import {
  Container,
  Toolbar,
  ProdutoList,
  Produto,
  Titulo,
  ProdutoNome,
  ProdutoPreco,
  ProdutoContainer,
  ProdutoCategoria,
  SearchContainer,
  ButtonStyles
} from './styles';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
}

const Search: React.FC = () => {


  const { navigate } = useNavigation();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [tudo, setTudo] = useState<Produto[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => {
    !!query 
      ? setProdutos(produtos.filter(item => item.nome.includes(query)))
      : setProdutos(tudo);
    
    setSearchQuery(query);
  }

  useEffect(() => {
    async function loadProdutos(): Promise<void> {
      const response = await api.get('/produtos');      
      setProdutos(response.data["produtos"]);
      setTudo(response.data["produtos"])
    }
    loadProdutos();    
  }, []); 


  const navigateToDashboard = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  return (
    <Container>

      <Toolbar>
          <ButtonStyles
            onPress={navigateToDashboard}
          >
            <FeatherIcon size={30} name="chevron-left" color="#312e38" />
          </ButtonStyles>
        <Titulo>Pesquisa de Produtos</Titulo>          
      </Toolbar>
           

      <SearchContainer>
        <Searchbar  
            accessibilityStates="selected"
            placeholder="Pesquisar produtos"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />  
      </SearchContainer>
      
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
            </Produto>
          )}
        />

      </ProdutoContainer>


    </Container>
  );
};

export default Search;