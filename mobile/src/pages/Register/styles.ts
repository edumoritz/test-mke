import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;
export const Titulo = styled.Text`
  margin-top: 20px;
  font-weight: bold;
  font-size: 30px;
  color: #312e38;
  font-family: 'Roboto-Medium';
`;

export const Form = styled.View`
  margin-top: 50px;
  width: 80%;
`;

export const Input = styled.TextInput`
  margin-bottom: 8px;
  font-size: 25px;
  padding: 15px;
  border: 3px solid #312e38;
  border-radius: 10px;
`;

export const AddButton = styled.TouchableOpacity`
  flex: 1;
  margin-top: 20px;
`;
export const TextButton = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 20px;
  margin-bottom: 20px;
  background-color: #312e38;
  padding: 16px 40px
  border-radius: 13px;
`
