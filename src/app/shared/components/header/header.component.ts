import { Component, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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
export class HeaderComponent {
  userData: User | undefined = undefined;
  paths!: string[];
  namePost: string = '';
  sections: string[] = [
    'cobranzas',
    'reversiones',
    'devoluciones',
    'rendición',
    'retenciones y percepciones',
  ];

  userEffect = effect(() => {
    let user = this.appService.userData();
    user && (this.userData = user);
  });

  constructor(private appService: AppService, private router: Router) {}

  go(section: string) {
    if (section == 'retenciones y percepciones') {
      section = 'retenciones-percepciones';
    }
    this.router.navigateByUrl(`/main/${section}`);
  }

  logOut(): void {
    this.appService.logOut();
  }
}
