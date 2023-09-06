import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/shared/material/material.module';
import Swal from 'sweetalert2';

import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { TableComponent } from '../../components/table/table.component';
import { AppService } from 'src/app/services/app.service';
import {
  LoadingStoreService,
  ReportStoreService,
} from 'src/app/signals/signals.service';

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
  private loadingStore = inject(LoadingStoreService);
  private reportSignal = inject(ReportStoreService);
  private appService = inject(AppService);

  dateSelect!: string;

  selectDate(date: string) {
    this.dateSelect = date;
    this.loadingStore.setStateBoolean(true);
    this.appService.getCollections(this.dateSelect).subscribe({
      next: (resp) => {
        this.reportSignal.setStateArray(resp.data);
        this.loadingStore.setStateBoolean(false);
      },
      error: (err) => {
        this.loadingStore.setStateBoolean(false);
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: err.error.message,
        });
      },
    });
  }
}
