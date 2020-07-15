import React, { useCallback, useEffect, useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Portal, FAB, Provider } from 'react-native-paper';

import formatValue from '../../utils/formatValue';
import dynamicSorting from '../../utils/dynamicSorting';
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
  const [state, setState] = React.useState({ open: false });
  const [option, setOption] = React.useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [tudo, setTudo] = useState<Produto[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => {
    query = query.replace(/[^a-zA-Zs]/g, "");

    !!query
      ? setProdutos(filterFor(query))
      : setProdutos(tudo);
    
    setSearchQuery(query);
  }

  function filterFor(query) {
    if (option === "Produto") {
      return produtos.filter(
        item => item.nome
          .normalize("NFD")
          .replace(/[^a-zA-Zs]/g, "")
          .toUpperCase()
          .includes(query.toUpperCase()))
    } else {
      return produtos.filter(
        item => item.categoria
          .normalize("NFD")
          .replace(/[^a-zA-Zs]/g, "")
          .toUpperCase()
          .includes(query.toUpperCase()))
    }
  }

  const onStateChange = ({ open }) => {
    setState({ open });
  }
  const { open } = state;

  useEffect(() => {
    async function loadProdutos(): Promise<void> {
      const response = await api.get('/produtos');
      const sort = response.data["produtos"].sort(dynamicSorting('nome', 'alf_asc'));
      setTudo(sort)
      setProdutos(sort);
    }
    loadProdutos();
    setOption('Produto');
  }, [])

  useEffect(() => {
    applyOrder('alf_asc');
  }, [option])

  function applyOrder(orderParam: string) {    
    var list: Produto[] = filterFor(searchQuery);
    var keyOrder = option === 'Produto'
      ? 'nome' : 'categoria';
    var typeOrder = 'asc';

    switch (orderParam) {
      case 'alf_asc':
        break;
      case 'alf_desc':
        typeOrder = 'desc';
        break;
      case 'vlr_asc':
        keyOrder = 'preco';
        break;
      case 'vlr_desc':
        keyOrder = 'preco';
        typeOrder = 'desc';
        break;
      default: break;
    }

    setProdutos(list.sort(dynamicSorting(keyOrder, typeOrder)))
  }


  const navigateToDashboard = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  return (
    <Container>
      <Provider>
        <Portal>

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


          <FAB.Group style={styles.fab}
            visible={true}
            open={open}
            icon={open ? 'clippy' : 'filter'}
            actions={[
              {
                icon: 'folder-move',
                label: `Filtrar por ${option === 'Produto' ? 'Categoria' : 'Produto'}`,
                onPress: () => {
                  if (option === "Categoria") setOption("Produto");
                  else setOption("Categoria")                  
                },
              },
              {
                icon: 'order-alphabetical-ascending',
                label: 'A - Z',
                onPress: () => applyOrder('alf_asc'),
              },
              {
                icon: 'order-alphabetical-descending',
                label: 'Z - A',
                onPress: () => applyOrder('alf_desc'),
              },
              {
                icon: 'order-numeric-descending',
                label: 'Maior valor',
                onPress: () => applyOrder('vlr_desc'),
              },
              {
                icon: 'order-numeric-ascending',
                label: 'Menor valor',
                onPress: () => applyOrder('vlr_asc'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // console.log(state)
              } else {
                // console.log(option)
              }
            }}
          />
        </Portal>
      </Provider>
    </Container>

  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 0,
    fontSize: 10,
  },
  icon: {

  },
  container: {
    top: 0,
    bottom: 0,
    margin: 0,
  }
})

export default Search;