import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get('produtos').then(response => {
      setProdutos(response.data["produtos"]);
    });
  }, []);

  async function addProduto() {
    const response = await api.post('produtos', {
      nome: `Novo produto ${Date.now()}`,
      preco: 20.00,
      categoria: 'Radical'
    });

    const produto = response.data;

    setProdutos([...produtos, produto]);
  }

  async function editProduto(id) {
    const produtoIndex = produtos.findIndex(p => p.id === id);

    const response = await api.put(`produtos/${id}`, {
      nome: `Novo produto ${Date.now()}`,
      preco: 20.00,
      categoria: 'Radical'
    });

    produtos[produtoIndex] = response.data;

    setProdutos([...produtos]);
  }

  async function deleteProduto(id) {
    const produtoIndex = produtos.findIndex(p => p.id === id);
    produtos.splice(produtoIndex, 1);
    setProdutos([...produtos]);
    await api.delete(`produtos/${id}`);
  }


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <SafeAreaView style={styles.container}>

        <FlatList
          data={produtos}
          keyExtractor={produto => produto.id}
          renderItem={({ item: produto }) => (
            <View style={styles.produtoContainer}>
              <Text style={styles.nome}>Nome: {produto.nome}</Text>
              <Text style={styles.preco}>Preço: {produto.preco}</Text>
              <Text style={styles.categoria}>Categoria: {produto.categoria}</Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  style={styles.edit}
                  onPress={() => editProduto(produto.id)}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteProduto(produto.id)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={addProduto}
        >
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#A9A9A9',

  },
  produtoContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    padding: 20,
    backgroundColor: '#DCDCDC'
  },
  actionContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around",

  },
  edit: {
    marginRight: 20,
  },
  nome: {
    color: '#FFF',
    fontSize: 20,
  },
  preco: {
    color: '#FFF',
    fontSize: 13,
  },
  categoria: {
    color: '#FFF',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
})
