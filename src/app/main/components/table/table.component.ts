import { Component, ViewChild, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MaterialModule } from 'src/app/shared/material/material.module';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Report } from 'src/app/shared/interfaces/table.interface';
import {
  LoadingStoreService,
  ReportStoreService,
} from 'src/app/signals/signals.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableComponent {
  private loadingStore = inject(LoadingStoreService);
  private reportSignal = inject(ReportStoreService);
  readonly loading = this.loadingStore.stateBoolean.asReadonly();
  readonly reports = this.reportSignal.stateArray.asReadonly();

  hideTable: boolean = true;

  dataSource = new MatTableDataSource<Report>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  reportsEffect = effect(() => {
    let report = this.reports();
    report && this.setTable(report);
  });

  columnsToDisplay = [
    'payer_name',
    'amount_paid',
    'request_id',
    'available_at',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Report | null;

  setTable(reports: Report[]) {
    if (reports.length > 0) {
      this.dataSource = new MatTableDataSource<Report>(reports);
      this.dataSource.paginator = this.paginator!;
      this.hideTable = false;
    } else {
      this.hideTable = true;
    }
  }
}
