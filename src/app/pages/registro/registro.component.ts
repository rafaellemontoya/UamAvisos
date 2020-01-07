import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  constructor(private fb: FormBuilder) {
    
   }
  productForm: FormGroup;
  ngOnInit() {
    /* Initiate the form structure */
    this.productForm = this.fb.group({
      title: [],
      selling_points: this.fb.array([this.fb.group({
        nombre: '',
        apellido: '',
        empresa: '',
        puesto: '',
        email: ''})])
    })
  }
  get sellingPoints() {
    
    return this.productForm.get('selling_points') as FormArray;
  }

  
  addSellingPoint(numero: number) {
    
    for (let i=0; i<numero; i++){
      this.sellingPoints.push(this.fb.group({point:'',apellido: ''}));
    }
    
  }

  deleteSellingPoint(index) {
    this.sellingPoints.removeAt(index);
  }
}
