import React, { useCallback, useEffect, useState }  from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import { View } from 'react-native';
import {
  Container, 
  Toolbar, 
  Titulo, 
  Button, 
  CategoriaContainer,
  CategoriaList,
  Categoria
} from './styles';

interface Category {
  id: string;
  nome: string;
}

const Category: React.FC = () => {

  const { navigate } = useNavigation();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/produtos');
      
      console.log(response.data["categorias"])
      setCategories(response.data["categorias"]);
      // console.log(categories.length)
    }

    loadCategories();
    
  }, []); 


  const navigateToDashboard = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  return (
    <Container>

      <Toolbar>
          <Button
            onPress={navigateToDashboard}
          >
            <FeatherIcon size={30} name="chevron-left" color="#312e38" />
          </Button>

        <Titulo>Lista de Categorias</Titulo>          
      </Toolbar>  
      
      <CategoriaContainer>
        <CategoriaList
          data={categories}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
            <Categoria>              
              {item}
            </Categoria>
          )}
        />
        
      </CategoriaContainer>

    </Container>
  );
};

export default Category;