import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import {NavigationEnd, Router, RouterModule,  } from '@angular/router';
import { MenuPricipalComponent } from './menu-pricipal/menu-pricipal.component';
import { filter } from 'rxjs/operators';
import { MenuPrincipalService } from './products/services/menu-principal.service';
import { ToastComponent } from './products/toast/toast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule,CommonModule,MenuPricipalComponent,ToastComponent],
  standalone: true
})


export class AppComponent implements OnInit {
  mostrarMenu = true;
  

  constructor(private menuService: MenuPrincipalService, private router: Router){
    this.menuService.mostrarMenu$.subscribe(valor =>{
      this.mostrarMenu = valor;
    })
  }
  
  ngOnInit(): void{
   

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd)=>{
      const rutasOcultas = ['/','/register'];
      this.menuService.setMostrarMenu(!rutasOcultas.includes(event.urlAfterRedirects));
      
    });
  }
  }


