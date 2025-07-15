import { ChangeDetectorRef, Component, Injectable, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Beer } from '../models/beer';
import { FormBeer } from '../beer-form/beer.form.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { BeerWithEtiquetas } from '../models/beer-with-etiquetas';
import { FormsModule, NgModel } from '@angular/forms';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})


export class ProductComponent implements OnInit{
  beer: Beer[]=[];
  beerWhitEtiquetas: BeerWithEtiquetas[]=[];
  beerSelected: Beer = new Beer();
  cantidad:number=0;
  cantidadEtiquetas:number=0;
  ordenarColumna: string="";
  ordenAscendente: boolean = true;
  editandoId: number | null = null;
  etiquetaEditada:{[id:number]: number}={};
  confirmDeleted: number | null = null;
  
  constructor(private service: ProductService, private cdr: ChangeDetectorRef, private router: Router, private userService: UserService, private toast:ToastService){

  }

  ngOnInit(): void{ //este metodo se va a ejectutar unicamente cuando se inicializa el componente
     this.userService.getMisCerevezas().subscribe((data)=>{
        console.log(data);
        this.beerWhitEtiquetas=data;
      },
    (error)=> {
      console.error("Error al obtener las cervezas",error);
    });
    
  }

  editarEtiquetaUser(beer: any){
    if(this.editandoId === beer.id){
      const nuevaEtiqueta = this.etiquetaEditada[beer.id];

      this.userService.updateEtiquetas(beer.id, nuevaEtiqueta).subscribe({
        next:() =>{
          beer.etiquetas = nuevaEtiqueta;
          this.editandoId = null;
        },
        error: (error) =>{
          console.error("Error al guardar etiqueta", error);
        }
       });
    }else{
      this.editandoId = beer.id;
      this.etiquetaEditada[beer.id]= beer.etiquetas;
    }
  }

  solicitarEliminar(id:number){
    this.confirmDeleted = id;
  }
  confirmarEliminar(){
    if(this.confirmDeleted !== null){
      this.userService.eliminarMisCervezas(this.confirmDeleted).subscribe({
        next: ()=>{
          this.toast.show("Cerveza eliminada con exito",'success');
          window.location.reload();
        },error:(err)=>{
          this.toast.show("Error al eliminar la cerveza",'error');
        }
      });
    }
    this.confirmDeleted=null;
  }

  cancelarEliminar(){
    this.confirmDeleted=null;
  }

  cerrarSesion(){
      localStorage.removeItem('token');
      this.router.navigate(['/'])
    }

    ordenarTabla(columna:keyof Beer):void{
      if(this.ordenarColumna === columna){
        this.ordenAscendente = !this.ordenAscendente;
      }else{
        this.ordenarColumna=columna;
        this.ordenAscendente= true;
      }
      this.beerWhitEtiquetas.sort((a,b)=>{
        let valorA = a[columna];
        let valorB = b[columna];

        if(columna === 'graduation'){
          valorA = Number(valorA);
          valorB = Number(valorB);
        }else{
          valorA = String(valorA).toLowerCase();
          valorB = String(valorB).toLowerCase();
        }

        if(valorA < valorB){
          return this.ordenAscendente? -1 : 1;
        }
        if(valorA > valorB){
          return this.ordenAscendente? 1: -1;
        }
        return 0;
      });
    }

}
