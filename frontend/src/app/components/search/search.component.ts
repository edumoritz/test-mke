import { MatSelectModule } from '@angular/material/select';
import { ProductService } from './../product/product.service';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
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
  filtro: Product[] = [];
  registerInput: string[] = [];  

  isLoading: Boolean = false;
  selectedCategoria: string;
  valueInput: string;
  optionFilter: string;

  valueOrder: string;
  optionSelected = false;

  seasons: string[] = ['Produtos', 'Categorias'];
  displayedColumns: string[] = ['id', 'nome', 'preco', 'categoria'];
  dataSource = new MatTableDataSource(this.produtos);

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.loadAll();   
  }

  loadAll() {
    this.service.read().subscribe(prod => {
      this.produtos = prod["produtos"];
    });
  }

  onSubmit() {       
    this.isLoading = true;
    this.registerInput.push(this.valueInput); 

    this.filtro = this.aplicarFiltro(this.optionFilter);

    this.dataSource = new MatTableDataSource(
      this.filtro.sort(
        this.dynamicSorting('nome')
      )
    );
  }  

  aplicarFiltro(option: string) {      
    if(option === 'Produtos'){
      return this.produtos
        .filter(item => item.nome.includes(this.valueInput))
    } else {
      return this.produtos
        .filter(item => item.categoria.includes(this.valueInput))
    }    
  }  

  applyOrder() {   
    var keyOrder = this.optionFilter === 'Produtos'
      ? 'nome' : 'categoria';
    var typeOrder = 'asc';

    switch(this.valueOrder) {
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
      default:break;
    }

    this.dataSource = new MatTableDataSource(
      this.filtro.sort(
        this.dynamicSorting(keyOrder, typeOrder)
      )
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


}
