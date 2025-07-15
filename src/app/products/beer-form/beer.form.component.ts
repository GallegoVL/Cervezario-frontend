import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Beer } from '../models/beer';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './beer.form.component.html',
  styleUrl: './beer.form.component.css'
})


export class FormBeer {
  
 @Input() InpBeer: Beer = { //el input es por que ahora los datos vienen del padre
      id:0,
      name:"",
      country:"",
      brew:"",
      tipo:"",
      graduation:0,
      etiquetas:0
  };
  @Output() newBeerEvent = new EventEmitter(); //con esta linea vamos a emitir este objeto al padre, que es product.components.ts

  onSubmit(beerForm: NgForm) :void {
    if(beerForm.valid){
      this.newBeerEvent.emit(this.InpBeer);
      console.log(this.InpBeer);
    }
    beerForm.reset();
  }

   clean():void{
    this.InpBeer=new Beer();
   }

   
}
