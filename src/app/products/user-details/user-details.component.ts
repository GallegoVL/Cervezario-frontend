import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule,RouterModule],
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{
  
  userActive: User = new User();
  

  constructor(private service: UserService, private router: Router){

  }

  
  ngOnInit(): void {
    this.service.getUsuarioActual().subscribe({
      next: (data)=>{
        this.userActive = data;

        if(this.userActive?.date){
          this.userActive.date = new Date(this.userActive.date).toISOString();
        }
      },
      error:(error)=>{
        console.error("Error al obtener el usuario", error);
      }
    })
  }

  
}
