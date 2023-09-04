import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigateByUrl('');
  }
}
