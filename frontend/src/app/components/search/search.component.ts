import { HeaderService } from './../template/header/header.service';
import { ProductService } from './../product/product.service';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../product/product.model';
import { MatRadioChange } from '@angular/material/radio';

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
    private service: ProductService, 
    private headerService: HeaderService
  ) { 
    headerService.HeaderData = {
      title: 'Pesquisa de Produtos',
      icon: 'search',
      routeUrl: '/search'
    }
  }

  ngOnInit() {
    this.loadAll();      
  }

  loadAll() {
    this.valueInput = '';
    this.service.read().subscribe(prod => {
      this.produtos = prod["produtos"];
      this.aplicarFiltro('nome');
      this.notFound('Não existe produtos cadastrados.', this.dataSource.data.length);      
    });
    
    return this.dataSource.data
  }

  onSubmit() {
    var keyOrder = this.optionFilter === 'Produtos'
      ? 'nome' : 'categoria';
    this.aplicarFiltro(keyOrder, this.valueOrder);
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
      filterValue = this.valueInput.trim().replace(/[^a-zA-Zs]/g, "");
      const theSame = this.registers.findIndex(item => item === filterValue);
      if (theSame < 0) this.registers.push(filterValue);
    }     
    
    var typeFilter: Product[];
    if (key === 'nome') {
      typeFilter = this.produtos
      .filter(item => 
        item.nome        
        .normalize("NFD").replace(/[^a-zA-Zs]/g, "")
        .toUpperCase()
        .includes(filterValue.toUpperCase())
      );
    } else {
      typeFilter = this.produtos
        .filter(item => 
          item.categoria
          .normalize("NFD").replace(/[^a-zA-Zs]/g, "")
          .toUpperCase()
          .includes(filterValue.toUpperCase())
        );
    }

    this.notFound('Ops... não conseguimos encontrar o que vc pediu :(', typeFilter.length);


    this.dataSource.data = typeFilter.sort(
      this.dynamicSorting(key, order)
    ); 
    this.applyOrder();     

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

    this.dataSource.data = this.dataSource.data.sort(
      this.dynamicSorting(keyOrder, typeOrder)
    );   
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

  onChange(mrChange: MatRadioChange) {
    this.applyOrder();
  }
}
