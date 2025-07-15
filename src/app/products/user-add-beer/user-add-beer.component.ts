import { Component } from '@angular/core';
import { FormControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BeerWithEtiquetas } from '../models/beer-with-etiquetas';
import { debounceTime, distinctUntilChanged, filter, forkJoin, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Beer } from '../models/beer';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-user-add-beer',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-add-beer.component.html',
  styleUrl: './user-add-beer.component.css'
})
export class UserAddBeerComponent {
  private destroy$ = new Subject<void>();
  
  searchControl = new FormControl('');
  searchCountryControl = new FormControl('');
  results: BeerWithEtiquetas[]=[];
  query = this.searchControl.value?? '';
  userList: BeerWithEtiquetas[]=[];
  beerSelected: BeerWithEtiquetas = new Beer();
  etiquetasControl = new FormControl(1);
  isLoading = false;


  constructor(private toast:ToastService,private beerService:ProductService,private userService:UserService){}

  addBeerToColection(beerRow: BeerWithEtiquetas):void{
    const etiquetasValue= Math.max(1, this.etiquetasControl.value ?? 1) ;

    this.userService.getMisCerevezas().subscribe((data) =>{
      this.userList=data;
      
      this.beerSelected={
        ...beerRow,
        etiquetas: etiquetasValue
      };

      console.log(this.userList);
      console.log(this.beerSelected);
      
      const index = this.userList.findIndex(
        (cerveza)=> cerveza.id === this.beerSelected.id
      );

      if(index !== -1){
       this.toast.show("Esta cerveza ya está en tu colección",'error');
      }else{
        this.userList.push(this.beerSelected);
      
       this.toast.show("Cerveza añadida a tu colección",'success')

      this.userService.guardarMisCervezas(this.userList).subscribe(
        () => {
          console.log("Lista actualizada correctamente ne la BBDD");
        },
        (error) => {
          console.error("Error al actualizar la lista en la BBDD", error);
        }
      )
    }
    },
    (error) =>{
      console.error("Error al obtener las cervezas",error);
    });
  }

 

  ngOnInit(){
    this.searchControl.setValue('', { emitEvent: false });
    this.searchCountryControl.setValue('', { emitEvent: false });

    this.searchCountryControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      switchMap(value =>{
        if(value){
          this.isLoading = true;
          this.searchCountryControl.setValue('',{emitEvent:false});
          return  this.beerService.searchCountryBeers(value.trim());
        }else{
        return of ([]);
        }
      })
    ).subscribe(data =>{
      this.results = data;
      this.isLoading = false;
     });
  
    

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
       takeUntil(this.destroy$),
      switchMap(value =>{
        if(value){
          this.isLoading = true;
          this.searchControl.setValue('',{emitEvent:false});
          return  this.beerService.searchBeers(value.trim());
        }else{
        return of ([]);
        }
      })
    ).subscribe(data =>{
      this.results = data;
      this.isLoading = false;
     });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.searchControl.reset();
    this.searchCountryControl.reset();
    this.etiquetasControl.reset(1);
    this.results = [];
  }


}
