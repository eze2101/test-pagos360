import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { TableComponent } from '../../components/table/table.component';
import { AppService } from 'src/app/services/app.service';
import { MaterialModule } from 'src/app/shared/material/material.module';

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
export class CollectionsComponent implements OnInit {
  dateSelect!: string;
  loadingData: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  selectDate(date: string) {
    this.dateSelect = date;
    this.appService.loadingData.next(true);

    this.appService.geCollections(this.dateSelect);
  }
}
