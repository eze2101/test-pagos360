import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateFilterComponent } from '../../components/date-filter/date-filter.component';
import { TableComponent } from '../../components/table/table.component';
import { AppService } from 'src/app/services/app.service';
import { collection } from 'src/app/shared/interfaces/table.interface';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterModule, DateFilterComponent, TableComponent],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  dateSelect!: string;
  collections!: collection;

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  selectDate(date: string) {
    this.dateSelect = date;
    this.appService.geCollections(this.dateSelect);
    // .subscribe((resp) => {
    //   console.log(resp);
    //   this.collections = resp;
    // });
  }
}
