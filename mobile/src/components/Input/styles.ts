// import { FeatherIcon } from 'react-native-vector-icons/Feather';
import styled, { css } from 'styled-components/native';
import Icone from 'react-native-vector-icons/Ionicons';

// Icone.loadFont();

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 90%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #232129;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #fff;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 20px;
  font-family: 'Roboto-Regular';
`;

export const Icon = styled(Icone)`
  margin-right: 16px;
`;
