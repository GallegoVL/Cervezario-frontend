import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormsModule, NgModel } from '@angular/forms';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-user-contact',
  imports: [FormsModule],
  templateUrl: './user-contact.component.html',
  styleUrl: './user-contact.component.css'
})
export class UserContactComponent {

  selectedSubject: string = '';
  emailText : string ='';
  userEmail : string ='';
  userActual: User = new User();
  CompleteEmail : string = '';

  constructor(private toast:ToastService, private userService: UserService){}

  onSend(){
    if(!this.selectedSubject || !this.emailText.trim()){
      this.toast.show("Por favor rellena los campos para poder enviar el correo",'error');
      return;
    }
    this.userService.getUsuarioActual().subscribe({
      next:(data)=>{
        this.userActual=data;
        this.userEmail = this.userActual.email;
        this.CompleteEmail = this.userEmail + ' ' + this.emailText;
        this.userService.sendContactEmail(this.selectedSubject,this.CompleteEmail);

        this.emailText='';
      },
      error:(err)=>{
        this.toast.show("Error al obtener el usuario",'error');
      }


    })

   

    
  }
}
