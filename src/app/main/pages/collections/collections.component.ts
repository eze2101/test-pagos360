import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFilterComponent],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  dateSelect!: string;

  selectDate(date: string) {
    this.dateSelect = date;
  }
}
