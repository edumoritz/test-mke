import { EMPTY } from 'rxjs';
import { ProductService } from './../product/product.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../product/product.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  produtos: Product[] = [];
  registers: string[] = [];

  valueInput: string;
  optionFilter: string = 'Produtos';

  valueOrder: string;
  message: string;
  isLoading = true;

  seasons: string[] = ['Produtos', 'Categorias'];
  displayedColumns: string[] = ['id', 'nome', 'preco', 'categoria'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  constructor(
    private service: ProductService
  ) { }

  ngOnInit() {
    this.loadAll();       
  }

  loadAll() {
    this.service.read().subscribe(prod => {
      this.produtos = prod["produtos"];
      this.aplicarFiltro('nome');
      this.notFound('Não existe produtos cadastrados.', this.dataSource.data.length);      
    });
    
    return this.dataSource.data
  }

  onSubmit() {
    this.valueOrder = '';
    var keyOrder = this.optionFilter === 'Produtos'
      ? 'nome' : 'categoria';
    this.aplicarFiltro(keyOrder);
  }

  notFound(msg: string, lenght: number) {
    if (lenght == 0) {
      this.isLoading = false;
      this.message = msg;
    }
  }

  aplicarFiltro(key, order = 'asc') {     
    var filterValue = '';
    if (this.valueInput) {
      filterValue = this.valueInput.trim().toLowerCase();
      const theSame = this.registers.findIndex(item => item === filterValue);
      if (theSame < 0) this.registers.push(filterValue);
    }     
    
    var typeFilter: Product[];
    if (this.optionFilter === 'Produtos') {
      typeFilter = this.produtos
      .filter(item => item.nome.includes(filterValue));
    } else {
      typeFilter = this.produtos
        .filter(item => item.categoria.includes(filterValue));
    }

    this.notFound('Ops... não conseguimos encontrar o que vc pediu :(', typeFilter.length);

    this.dataSource.data = typeFilter.sort(
      this.dynamicSorting(key, order)
    );       

  }

  applyOrder() {
    var keyOrder = this.optionFilter === 'Produtos'
      ? 'nome' : 'categoria';
    var typeOrder = 'asc';

    switch (this.valueOrder) {
      case 'alf_asc':
        break;
      case 'alf_desc':
        typeOrder = 'desc';
        break;
      case 'vlr_asc':
        keyOrder = 'preco';
        break;
      case 'vlr_desc':
        keyOrder = 'preco';
        typeOrder = 'desc';
        break;
      default: break;
    }

    this.aplicarFiltro(keyOrder, typeOrder);
  }

  dynamicSorting(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparation = 0;
      if (varA > varB) {
        comparation = 1;
      } else if (varA < varB) {
        comparation = -1;
      }
      return (
        (order === 'desc') ? (comparation * -1) : comparation
      );
    };
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.preco).reduce((acc, value) => acc + value, 0);
  }
}
