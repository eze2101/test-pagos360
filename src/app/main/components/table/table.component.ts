import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Datum, collection } from 'src/app/shared/interfaces/table.interface';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AppService } from 'src/app/services/app.service';

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
  @Input() collections!: collection;

  constructor(private appService: AppService) {}

  columnsToDisplay = [
    'payer_name',
    'amount_paid',
    'request_id',
    'available_at',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Datum | null;
  dataSource = new MatTableDataSource<Datum>();

  ngOnInit(): void {
    this.appService.collection.subscribe((resp) => {
      this.dataSource = new MatTableDataSource<Datum>(resp?.data);
    });
  }
}
