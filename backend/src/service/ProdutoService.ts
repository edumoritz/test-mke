import AppError from '../errors/AppError';

import Produto from '../models/Produto';
import Categoria from '../models/Categoria';

const produtos: Produto[] = [];
const categorias: Categoria[] = [];

interface Request {
  nome: string;
  preco: number;
  categoria: Categoria;
}

class ProdutoService {
  public execute({
    nome,
    preco,
    categoria
  }: Request) {

    if (nome === '' || preco === null)
      throw new AppError('Deve conter nome e preço.');

    if(typeof preco !== 'number') 
      throw new AppError('Preço deve ser numérico.');

    const findCategoria = categorias.filter(c => c === categoria);

    if (findCategoria.length <= 0) {
      categorias.push(categoria);
    }
    const produto = new Produto(nome, preco, categoria);

    produtos.push(produto);

    return produto;
  };

  public findAll() {
    return { produtos, categorias };
  }

  public findOne(id: string) {

    const prodIndex = produtos.findIndex(p => p.id === id);

    return produtos[prodIndex];
  }

  public update(id: string, {
    nome,
    preco,
    categoria
  }: Request) {

    const findCategoria = categorias.filter(c => c === categoria);

    if (findCategoria.length <= 0) {
      categorias.push(categoria);
    }

    const prodIndex = produtos.findIndex(p => p.id === id);
    if (prodIndex < 0)
      throw new AppError('Produto não existe.');

    const produto = {
      id, nome, preco, categoria
    }

    produtos[prodIndex] = produto;

    return produto;
  }

  public delete(id: string) {
    const produtoIndex = produtos.findIndex(p => p.id === id);

    if (produtoIndex < 0) {
      throw new AppError('Produto não existe.');
    }

    produtos.splice(produtoIndex, 1);
  }

}

export default ProdutoService;