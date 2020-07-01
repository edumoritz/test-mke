import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = 'http://localhost:3333/produtos';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  errorHandler(err: any): Observable<any> {
    console.log(err.message)
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  };

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  };

  readById(id: string): Observable<Product> {
    const url = `${this.api}/${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.api}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: string): Observable<Product> {
    const url = `${this.api}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }


}
