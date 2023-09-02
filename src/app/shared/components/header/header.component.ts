import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userData!: User;
  paths!: string[];
  namePost: string = '';
  subcriptions: Subscription[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

  getUserData() {
    const sub = this.appService.userData.subscribe({
      next: (resp) => {
        resp && (this.userData = resp);
      },
      error: (err) => {
        console.log(err);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Usuario no encontrado',
        // });
      },
    });
    this.subcriptions.push(sub);
  }

  logOut(): void {
    this.appService.logOut();
  }
}
