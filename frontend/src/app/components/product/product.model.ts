export class Product {
  constructor(nome: string, preco: number, categoria: string, id?: string) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
  }

  id: string;
  nome: string;
  preco: number;
  categoria: string;
}