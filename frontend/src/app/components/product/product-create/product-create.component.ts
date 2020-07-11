import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  produto: Product;
  isUpdate: boolean;
  isLoading: boolean =  false;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isUpdate = !!this.route.snapshot.paramMap.get('id');
    this.createForm();
  }

  createForm(): void {

    this.formulario = this.formBuilder.group({
      nome: [
        this.route.snapshot.paramMap.get('nome'),
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      preco: [
        this.route.snapshot.paramMap.get('preco'),
        Validators.compose([Validators.required])
      ],
      categoria: [
        this.route.snapshot.paramMap.get('categoria'),
        Validators.compose([Validators.required])
      ],
    });
  }

  submit() {
    this.isLoading = true;
    const form = this.formulario.value;
    
    if (this.isUpdate) {
      const produto = new Product(
        form.nome,
        form.preco,
        form.categoria,
        this.route.snapshot.paramMap.get('id')
      )
      this.productService.update(produto).subscribe(() => {
        this.productService.showMessage('Operação Realizada');
        this.router.navigate(['/produtos'])
      });
    } else {
      const produto = new Product(
        form.nome,
        form.preco,
        form.categoria
      )
      this.productService.create(produto).subscribe(() => {
        this.productService.showMessage('Operação Realizada');
        this.router.navigate(['/produtos'])
      });
    }
    
    this.formulario.reset();
  };

  get nome(): FormControl { return <FormControl>this.formulario.get('nome'); }
  get preco(): FormControl { return <FormControl>this.formulario.get('preco'); }
  get categoria(): FormControl { return <FormControl>this.formulario.get('categoria'); }
  get f() { return this.formulario.controls; }

  cancel(): void {
    this.router.navigate(['/produtos'])
  };

  ngOnDestroy(): void {
    this.isLoading = false;
  }

}
