import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Report, collection } from 'src/app/shared/interfaces/table.interface';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AppService } from 'src/app/services/app.service';
import { MatPaginator } from '@angular/material/paginator';

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
  loadingData: boolean = false;

  columnsToDisplay = [
    'payer_name',
    'amount_paid',
    'request_id',
    'available_at',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Report | null;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // this.appService.loadingData.subscribe((loading) => {
    //   this.loadingData = loading;
    // });

    this.loadingData = this.appService.loadingData();
    console.log(this.loadingData);

    this.appService.collection.subscribe((resp) => {
      console.log(this.loadingData);
      if (resp?.data?.length! > 0) {
        this.dataSource = new MatTableDataSource<Report>(resp?.data);
        this.dataSource.paginator = this.paginator!;
        this.loadingData = false;
        this.hideTable = false;
      } else {
        this.hideTable = true;
        this.loadingData = false;
      }
    });
  }
}
