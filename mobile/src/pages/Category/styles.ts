import styled from 'styled-components/native';
import { FlatList } from 'react-native';

interface Category {
  id: string;
  nome: string;
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
  padding-left: 50px;
  padding-right: 40px;
  font-family: 'Roboto-Medium';
`;

export const CategoriaList = styled(
  FlatList as new () => FlatList<Category>,
).attrs({
  numColumns: 1,
})`
  flex: 1;  
  padding: 0 10px;
`;

export const Categoria = styled.Text`  
  font-size: 30px;
  border-radius: 5px;
  margin-top: 20px;
  background: #fff;
  padding: 13px 100px;
`;

export const CategoriaContainer = styled.View`
  border-radius: 5px;
  margin-top: 20px;
  flex: 1;
  flex-direction: column;
`;


export const Button = styled.TouchableOpacity``;