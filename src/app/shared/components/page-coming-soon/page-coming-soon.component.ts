import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-page-coming-soon',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './page-coming-soon.component.html',
  styleUrls: ['./page-coming-soon.component.scss'],
})
export class PageComingSoonComponent {}
