import styled from 'styled-components/native';
import { FlatList } from 'react-native';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
}


export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Toolbar = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;  
  margin-top: 20px;
`;

export const Titulo = styled.Text`  
  font-weight: bold;
  font-size: 30px;
  color: #312e38;
  padding-left: 20px;
  padding-right: 40px;
  margin-bottom: 5px;
  font-family: 'Roboto-Medium';
`;

export const ProdutoContainer = styled.View`
  border-radius: 5px;
  flex: 1;
  flex-direction: row;
`;

export const ProdutoList = styled(
  FlatList as new () => FlatList<Produto>,
).attrs({
  numColumns: 2,
})`
  flex: 1;
  padding: 0 10px;
`;

export const Produto = styled.View`
  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;
  flex: 1;
`;
export const ProdutoNome = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  font-family: 'Roboto-Medium';
`;

export const ProdutoPreco = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #228B22;
`;

export const ProdutoCategoria = styled.Text`  
  font-size: 16px;
`;

export const SearchContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 8px;
  border-radius: 5px;
  width: 80%;
`;

export const ButtonStyles = styled.TouchableOpacity``;


