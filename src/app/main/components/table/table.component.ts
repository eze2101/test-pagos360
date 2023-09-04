import { Component, OnInit, ViewChild, effect } from '@angular/core';
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
import { AppService } from 'src/app/services/app.service';
import { Report } from 'src/app/shared/interfaces/table.interface';

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
export class TableComponent implements OnInit {
  hideTable: boolean = true;
  dataSource = new MatTableDataSource<Report>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  loadingData = this.appService.loadingData();

  loadingEffect = effect(() => {
    this.loadingData = this.appService.loadingData();
  });

  reportsEffect = effect(
    () => {
      let reports = this.appService.reports();
      reports && this.writeData(reports);
    },
    {
      allowSignalWrites: true,
    }
  );

  columnsToDisplay = [
    'payer_name',
    'amount_paid',
    'request_id',
    'available_at',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Report | null;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  writeData(reports: Report[]) {
    if (reports.length > 0) {
      this.dataSource = new MatTableDataSource<Report>(reports);
      this.dataSource.paginator = this.paginator!;
      this.hideTable = false;
    } else {
      this.hideTable = true;
    }
    this.appService.loadingData.set(false);
  }
}
