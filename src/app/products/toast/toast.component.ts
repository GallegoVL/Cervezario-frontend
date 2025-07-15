import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ToastComponent implements OnInit{
  
  visible=false;
  message='';
  type: 'success' | 'error' | 'info' = 'info';
  toastClass = ''

  private sub!: Subscription;

  constructor(public toastService: ToastService) {}

  getClass(): string{
    return `eltoast eltoast-${this.toastClass}`;
  }

  ngOnInit(): void {
   this.sub= this.toastService.toastState$.subscribe(data =>{
    this.message = data.message;
    this.toastClass = data.type
    this.visible = true;
    
    timer(3000).subscribe(() => this.visible=false);
   });
  }

    ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
