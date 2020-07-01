import Categoria from './Categoria';
import { uuid } from 'uuidv4';

class Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: Categoria;

  constructor(nome: string, preco: number, categoria: Categoria) {
    this.id = uuid();
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
  }
}

export default Produto;