import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Beer } from '../models/beer';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBeer } from '../beer-form/beer.form.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-create-beer',
  imports: [FormBeer, CommonModule],
  templateUrl: './create-beer.component.html',
  styleUrl: './create-beer.component.css'
})
export class CreateBeerComponent implements OnInit{
  beer: Beer[]=[];
  beerSelected: Beer = new Beer();
  ordenarColumna: string="";
  ordenAscendente: boolean = true;
  confirmDeleted: number | null = null;

  constructor(private toast:ToastService,private service: ProductService, private cdr: ChangeDetectorRef, private router: Router){

  }
  ngOnInit(): void {
    this.service.findAll().subscribe((data)=>{
        console.log(data);
        this.beer=data;
      },
    (error)=> {
      console.error("Error al obtener las cervezas",error);
    });
      
    }

  addBeer(beer: Beer): void{ //y este es el metodo en el padre para importar desde el hijo
    
      if(beer.id> 0){
        this.service.update(beer).subscribe((response) =>{
          console.log("Cerveza actualizada",response);
          this.toast.show("cerveza actualizada con exito",'success');
          this.beer = this.beer.map(b => b.id === beer.id ? { ...response } : b);
          this.cdr.detectChanges();
          
        },(error: any) => {
          console.error("Error al actualizar la cerveza", error);
          this.toast.show("Hubo un error al actualizar la cerveza",'error');
        }
        )}
        else {
        this.service.create(beer).subscribe((response)=>{
        console.log("Cerveza creada",response);
        this.toast.show("Cerveza creada con exito",'success');
        this.beer=[...this.beer,{...response}]
        
        this.cdr.detectChanges();
       },
      (error=>{
        console.error("Error al crear la cerveza", error);
        this.toast.show("Hubo un error al crear la cerveza",'error')
      }))
      }
      this.beerSelected=new Beer();
    }
    


  solicitarEliminar(id:number){
    this.confirmDeleted = id;
  }
  confirmarEliminar(){
    if(this.confirmDeleted !== null){
      this.service.remove(this.confirmDeleted).subscribe({
        next: (response)=>{
          console.log('cerveza eliminada',response);
          this.beer = this.beer.filter(beer => beer.id !== this.confirmDeleted );
          this.toast.show("Cerveza eliminada con exito",'success');
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

  onUpdateBeer(beerRow: Beer):void{
      this.beerSelected = {... beerRow};//la llave con los ... y el espacio significa que estamos copiando el objeto
    }

    trackById(index: number, beer: Beer): number {
      return beer.id; // o cualquier campo único que identifique a tu producto
    }

    ordenarTabla(columna:keyof Beer):void{
      if(this.ordenarColumna === columna){
        this.ordenAscendente = !this.ordenAscendente;
      }else{
        this.ordenarColumna=columna;
        this.ordenAscendente= true;
      }
      this.beer.sort((a,b)=>{
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
