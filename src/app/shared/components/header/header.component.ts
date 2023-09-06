import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material/material.module';

import { AppService } from 'src/app/services/app.service';
import { Routes } from '../../enums/routes.enum';
import { UserStoreService } from 'src/app/signals/signals.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  paths!: string[];
  namePost: string = '';
  sections: string[] = [
    'cobranzas',
    'reversiones',
    'devoluciones',
    'rendición',
    'retenciones y percepciones',
  ];
  private userSignal = inject(UserStoreService);
  readonly user = this.userSignal.stateObjet.asReadonly();

  getRouteMain() {
    return Routes.MAIN;
  }

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
