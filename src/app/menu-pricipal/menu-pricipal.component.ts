import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/services/product.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../products/services/user.service';

@Component({
  selector: 'app-menu-pricipal',
  imports: [RouterModule],
  templateUrl: './menu-pricipal.component.html',
  styleUrl: './menu-pricipal.component.css'
})
export class MenuPricipalComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private service: ProductService, private router: Router, private userService: UserService){

  }
  
  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
  }

  

  cerrarSesion(){
      localStorage.removeItem('token');
      this.router.navigate(['/'])
    }
}
