import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../interfaces/models';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  addProdFormGroup!: FormGroup;

  constructor(
    private prodServ: ProductService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.addProdFormGroup = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  createProduct() {
    
      const product: Product = {
        title: this.addProdFormGroup.get("title")?.value,
        name: this.addProdFormGroup.get("name")?.value,
        description: this.addProdFormGroup.get("description")?.value,
        price: parseFloat(this.addProdFormGroup.get("price")?.value),
        category: this.addProdFormGroup.get("category")?.value,
      };
      this.prodServ.addProduct(product).subscribe({
        next: (data) => {
          console.log('Product added!', data);
        },
        error: (error) => {
          console.error('Error adding product:', error);
          console.error('FastAPI validation details:', error.error);
        }
      });
  }
}
