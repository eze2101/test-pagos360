import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/shared/material/material.module';
import Swal from 'sweetalert2';

import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { TableComponent } from '../../components/table/table.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DateFilterComponent,
    TableComponent,
    MaterialModule,
  ],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  dateSelect!: string;
  loadingData: boolean = false;
  constructor(private appService: AppService) {}

  selectDate(date: string) {
    this.dateSelect = date;
    this.appService.loadingData.set(true);
    this.appService.getCollections(this.dateSelect).subscribe({
      next: (resp) => {
        this.appService.reports.set(resp.data);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: err.error.message,
        });
      },
    });
  }
}
