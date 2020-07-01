import { Router } from 'express';
import ProdutoService from '../service/ProdutoService';

const produtosRouter = Router();
const produtoService = new ProdutoService();

produtosRouter.get('/', (request, response) => {
  return response.json(produtoService.findAll());
});

produtosRouter.post('/', (request, response) => {
  const { nome, preco, categoria } = request.body;

  const produto = produtoService.execute({
    nome, preco, categoria
  });

  return response.json(produto);
});

produtosRouter.get('/:id', (request, response) => {
  const { id } = request.params;

  const produto = produtoService.findOne(id);

  return response.json(produto);
});

produtosRouter.put('/:id', (request, response) => {
  const { id } = request.params;
  const { nome, preco, categoria } = request.body;

  const produto = produtoService.update(id, {
    nome, preco, categoria
  });

  return response.status(200).json(produto);
});

produtosRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  produtoService.delete(id);

  return response.status(204).send();
});


export default produtosRouter;