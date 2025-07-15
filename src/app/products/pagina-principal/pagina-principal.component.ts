import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Beer } from '../models/beer';
import { CommonModule } from '@angular/common';
import { BeerWithEtiquetas } from '../models/beer-with-etiquetas';
import { CountryWithNumber } from '../models/country-with-number';
import { BrewWithNumber } from '../models/brew-with-number';

@Component({
  selector: 'app-pagina-principal',
  imports: [CommonModule],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent implements OnInit{
  cantidad: number = 0;
  cantidadEtiquetas: number = 0;
  beerGraduation: Beer[]=[];
  beerEtiquetas: BeerWithEtiquetas[]=[];
  beer: Beer = new Beer;
  paises : CountryWithNumber[]=[];
  pais1 : String = "";
  brew : BrewWithNumber[]=[];
  brew1: String="";
  
 constructor(private service: ProductService, private userService: UserService){}


  obtenerCantidadCervezas(): void{
    this.userService.contarCervezas().subscribe((data)=>{
      console.log(data);
      this.cantidad = data;
    },
    (error)=>{
      console.error("Error al obtener la cantidad de cervezas",error)
    })
  }

  obtenerCantidadEtiquetas(): void{
    this.userService.contarEtiquetas().subscribe((data1)=>{
      console.log(data1);
      this.cantidadEtiquetas = data1;
    },
  (error)=>{
    console.error("Error al obtener las etiquetas",error);
  })
  }

  obtenerGraduacionCervezas(): void{
    this.userService.getCervezasGraduation().subscribe((data)=>{
      this.beerGraduation = data;
    })
  }
  obtenerEtiquetasCervezas(): void{
    this.userService.getCervezasEtiquetas().subscribe((data)=>{
      this.beerEtiquetas = data;
    })
  }
  obtenerCountryCervezas(): void{
    this.userService.getCervezasCountry().subscribe((data)=>{
      this.paises=data;
    })
  }
  obtenerCountry1Cervezas(): void{
    this.userService.getCervezasCountry1().subscribe({
      next: (data)=>{
      const nombre = data.country;
      console.log("Pais recibido", nombre);
      this.pais1=nombre;
    },
    error: (err) =>{
      console.error("Error al obtener el pais", err);
    }
    });
  }
  obtenerBrewCervezas():void{
    this.userService.getCervezasBrew().subscribe((data)=>{
      this.brew=data;
    })
  }
  obtenerBrew1Cervezas(): void{
    this.userService.getCervezasBrew1().subscribe({
      next: (data) =>{
        const nombre = data.brew;
        console.log("cervecera recibida", nombre);
        this.brew1=nombre;
      },
      error: (err) => {
        console.error("Error al recibir la cervecera", err);
      }
    });
  }

  getFlagUrl():string{
    if(!this.pais1)return '';
    const nombreNormalizado = this.pais1
      .toLowerCase()
      .replace(/\s+/g, '')
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n');
      const ruta =  `/assets/flags/${nombreNormalizado}.png`
      console.log("Ruta generada en getflag ",ruta);
      return ruta;

  }

  getBrewImg():string{
    if(!this.brew1) return '';
    const nombreNormalizadoBrew = this.brew1
      .toLowerCase()
      .replace(/\s+/g, '')
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9]/g, '');
      console.log("Dato recibido en getBrewImg",this.brew1);
      const ruta1 = `/assets/brew/${nombreNormalizadoBrew}.png`
      console.log("ruta brew", ruta1);
      return ruta1;
  }


   ngOnInit(): void {
    this.obtenerCantidadCervezas();
    this.obtenerCantidadEtiquetas();
    this.obtenerGraduacionCervezas();
    this.obtenerEtiquetasCervezas();
    this.obtenerCountryCervezas();
    this.obtenerBrewCervezas();
    this.obtenerCountry1Cervezas();
    this.obtenerBrew1Cervezas();
    this.getFlagUrl();
    this.getBrewImg();
  }
}
